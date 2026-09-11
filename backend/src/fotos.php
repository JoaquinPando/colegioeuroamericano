<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/helpers.php';

const ANCHO_MINIATURA = 600;

/**
 * Tipos que aceptamos, con la extensión que les damos al guardarlos.
 */
function tipos_permitidos(): array
{
    return [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
    ];
}

/**
 * $_FILES con varios archivos llega como arrays paralelos; esto lo convierte
 * en una lista de archivos sueltos, que es mucho más cómoda de recorrer.
 */
function archivos_normalizar(?array $entrada): array
{
    if (!$entrada || !isset($entrada['name']) || !is_array($entrada['name'])) {
        return [];
    }

    $archivos = [];

    foreach (array_keys($entrada['name']) as $indice) {
        if (($entrada['error'][$indice] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
            continue;
        }

        $archivos[] = [
            'nombre' => (string) $entrada['name'][$indice],
            'temporal' => (string) $entrada['tmp_name'][$indice],
            'error' => (int) $entrada['error'][$indice],
            'peso' => (int) $entrada['size'][$indice],
        ];
    }

    return $archivos;
}

/**
 * Detecta el caso en que el navegador mandó más datos de los que PHP acepta:
 * ahí $_POST y $_FILES llegan vacíos y el formulario parece no haber hecho nada.
 */
function subida_excedio_limite(): bool
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        return false;
    }

    return empty($_POST) && empty($_FILES) && (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 0;
}

function mensaje_error_subida(int $codigo): string
{
    return match ($codigo) {
        UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'pesa más de lo permitido',
        UPLOAD_ERR_PARTIAL => 'se subió a medias, probá de nuevo',
        UPLOAD_ERR_NO_TMP_DIR, UPLOAD_ERR_CANT_WRITE => 'no se pudo guardar en el servidor',
        default => 'no se pudo subir',
    };
}

/**
 * Abre una imagen con GD según su tipo real.
 */
function imagen_abrir(string $ruta, string $mime): GdImage
{
    $imagen = match ($mime) {
        'image/jpeg' => @imagecreatefromjpeg($ruta),
        'image/png' => @imagecreatefrompng($ruta),
        'image/webp' => @imagecreatefromwebp($ruta),
        default => false,
    };

    if (!$imagen instanceof GdImage) {
        throw new RuntimeException('no se pudo leer la imagen');
    }

    // Sin esto, los PNG y WEBP con transparencia salen con el fondo negro
    // al rotarlos o redimensionarlos.
    if ($mime !== 'image/jpeg') {
        imagealphablending($imagen, false);
        imagesavealpha($imagen, true);
    }

    return $imagen;
}

function imagen_guardar(GdImage $imagen, string $destino, string $mime): void
{
    $ok = match ($mime) {
        'image/jpeg' => imagejpeg($imagen, $destino, 85),
        'image/png' => imagepng($imagen, $destino, 6),
        'image/webp' => imagewebp($imagen, $destino, 85),
        default => false,
    };

    if (!$ok) {
        throw new RuntimeException('no se pudo guardar la imagen');
    }
}

/**
 * Las fotos de celular vienen derechas pero con una marca EXIF que dice cómo
 * rotarlas. Al redimensionar esa marca se pierde, así que la aplicamos ahora.
 */
function imagen_enderezar(GdImage $imagen, string $ruta, string $mime): GdImage
{
    if ($mime !== 'image/jpeg' || !function_exists('exif_read_data')) {
        return $imagen;
    }

    $exif = @exif_read_data($ruta);
    $orientacion = (int) ($exif['Orientation'] ?? 1);

    $grados = match ($orientacion) {
        3 => 180,
        6 => -90,
        8 => 90,
        default => 0,
    };

    if ($grados === 0) {
        return $imagen;
    }

    $rotada = imagerotate($imagen, $grados, 0);

    if (!$rotada instanceof GdImage) {
        return $imagen;
    }

    imagedestroy($imagen);

    return $rotada;
}

/**
 * Guarda una foto: la valida, la endereza, la copia a uploads/ y genera
 * la miniatura que usa la galería.
 */
function foto_guardar(int $actividadId, array $archivo, int $orden): void
{
    if ($archivo['error'] !== UPLOAD_ERR_OK) {
        throw new RuntimeException(mensaje_error_subida($archivo['error']));
    }

    if (!is_uploaded_file($archivo['temporal'])) {
        throw new RuntimeException('no llegó correctamente');
    }

    if ($archivo['peso'] > limite_foto()) {
        throw new RuntimeException('pesa más de ' . formato_peso(limite_foto()));
    }

    // El tipo real del contenido, no la extensión del nombre: un .jpg puede
    // contener cualquier cosa.
    $mime = (string) (new finfo(FILEINFO_MIME_TYPE))->file($archivo['temporal']);
    $extension = tipos_permitidos()[$mime] ?? null;

    if ($extension === null) {
        throw new RuntimeException('no es una imagen JPG, PNG o WEBP');
    }

    $nombre = date('Ymd') . '-' . bin2hex(random_bytes(8)) . '.' . $extension;
    $destino = ruta_uploads($nombre);

    $imagen = imagen_abrir($archivo['temporal'], $mime);

    try {
        $imagen = imagen_enderezar($imagen, $archivo['temporal'], $mime);
        imagen_guardar($imagen, $destino, $mime);

        $ancho = imagesx($imagen);
        $miniatura = $ancho > ANCHO_MINIATURA
            ? imagescale($imagen, ANCHO_MINIATURA)
            : $imagen;

        if ($miniatura instanceof GdImage) {
            imagen_guardar($miniatura, ruta_miniaturas($nombre), $mime);

            if ($miniatura !== $imagen) {
                imagedestroy($miniatura);
            }
        }
    } finally {
        imagedestroy($imagen);
    }

    db()->prepare(
        'INSERT INTO fotos (actividad_id, archivo, orden) VALUES (?, ?, ?)'
    )->execute([$actividadId, $nombre, $orden]);
}

/**
 * Sube todas las fotos de un formulario. Devuelve los mensajes de las que
 * fallaron, para avisar sin perder las que sí entraron.
 */
function fotos_subir(int $actividadId, ?array $entrada): array
{
    $archivos = archivos_normalizar($entrada);

    if ($archivos === []) {
        return [];
    }

    $siguiente = db()->prepare(
        'SELECT COALESCE(MAX(orden), -1) + 1 FROM fotos WHERE actividad_id = ?'
    );
    $siguiente->execute([$actividadId]);
    $orden = (int) $siguiente->fetchColumn();

    $errores = [];

    foreach ($archivos as $archivo) {
        try {
            foto_guardar($actividadId, $archivo, $orden);
            $orden++;
        } catch (RuntimeException $e) {
            $errores[] = sprintf('«%s»: %s.', $archivo['nombre'], $e->getMessage());
        }
    }

    return $errores;
}

function fotos_de(int $actividadId): array
{
    $consulta = db()->prepare(
        'SELECT id, archivo FROM fotos WHERE actividad_id = ? ORDER BY orden, id'
    );
    $consulta->execute([$actividadId]);

    return $consulta->fetchAll();
}

/**
 * Borra el archivo de disco (original y miniatura).
 */
function archivos_borrar(string $archivo): void
{
    foreach ([ruta_uploads($archivo), ruta_miniaturas($archivo)] as $ruta) {
        if (is_file($ruta)) {
            @unlink($ruta);
        }
    }
}

function foto_eliminar(int $id): ?int
{
    $consulta = db()->prepare('SELECT actividad_id, archivo FROM fotos WHERE id = ?');
    $consulta->execute([$id]);
    $foto = $consulta->fetch();

    if (!$foto) {
        return null;
    }

    db()->prepare('DELETE FROM fotos WHERE id = ?')->execute([$id]);
    archivos_borrar($foto['archivo']);

    return (int) $foto['actividad_id'];
}
