<?php

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/fotos.php';

/**
 * Lista de actividades, de la más reciente a la más antigua, con sus fotos.
 */
function actividades_listar(?int $limite = null): array
{
    $sql = 'SELECT id, titulo, fecha, descripcion FROM actividades ORDER BY fecha DESC, id DESC';

    if ($limite !== null) {
        $sql .= ' LIMIT ' . max(1, $limite);
    }

    $actividades = db()->query($sql)->fetchAll();

    foreach ($actividades as &$actividad) {
        $actividad['fotos'] = fotos_de((int) $actividad['id']);
    }

    return $actividades;
}

function actividad_obtener(int $id): ?array
{
    $consulta = db()->prepare(
        'SELECT id, titulo, fecha, descripcion FROM actividades WHERE id = ?'
    );
    $consulta->execute([$id]);
    $actividad = $consulta->fetch();

    if (!$actividad) {
        return null;
    }

    $actividad['fotos'] = fotos_de($id);

    return $actividad;
}

function actividad_crear(string $titulo, string $fecha, string $descripcion): int
{
    db()->prepare(
        'INSERT INTO actividades (titulo, fecha, descripcion) VALUES (?, ?, ?)'
    )->execute([$titulo, $fecha, $descripcion]);

    return (int) db()->lastInsertId();
}

function actividad_actualizar(int $id, string $titulo, string $fecha, string $descripcion): void
{
    db()->prepare(
        'UPDATE actividades SET titulo = ?, fecha = ?, descripcion = ? WHERE id = ?'
    )->execute([$titulo, $fecha, $descripcion, $id]);
}

/**
 * Borra la actividad y, con ella, sus fotos (la FK las elimina en cascada;
 * los archivos de disco hay que borrarlos a mano).
 */
function actividad_eliminar(int $id): void
{
    foreach (fotos_de($id) as $foto) {
        archivos_borrar($foto['archivo']);
    }

    db()->prepare('DELETE FROM actividades WHERE id = ?')->execute([$id]);
}

/**
 * Valida lo que llega del formulario. Devuelve [datos, errores].
 */
function actividad_validar(array $entrada): array
{
    $titulo = trim((string) ($entrada['titulo'] ?? ''));
    $fecha = trim((string) ($entrada['fecha'] ?? ''));
    $descripcion = trim((string) ($entrada['descripcion'] ?? ''));
    $errores = [];

    if ($titulo === '') {
        $errores['titulo'] = 'Escribí un título para la actividad.';
    } elseif (mb_strlen($titulo) > 200) {
        $errores['titulo'] = 'El título no puede superar los 200 caracteres.';
    }

    $fechaValida = DateTimeImmutable::createFromFormat('Y-m-d', $fecha);

    if (!$fechaValida || $fechaValida->format('Y-m-d') !== $fecha) {
        $errores['fecha'] = 'Elegí una fecha válida.';
    }

    return [
        ['titulo' => $titulo, 'fecha' => $fecha, 'descripcion' => $descripcion],
        $errores,
    ];
}

/**
 * Forma en la que el sitio Next.js consume cada actividad.
 */
function actividad_para_api(array $actividad): array
{
    return [
        'titulo' => $actividad['titulo'],
        'fecha' => $actividad['fecha'],
        'descripcion' => $actividad['descripcion'],
        'fotos' => array_map(
            static fn (array $foto): array => [
                'url' => url_foto($foto['archivo']),
                'miniatura' => url_foto($foto['archivo'], true),
            ],
            $actividad['fotos']
        ),
    ];
}
