<?php

declare(strict_types=1);

// Separadores de ruta que recortamos al armar rutas (Windows acepta los dos).
const SEPARADORES = '/' . DIRECTORY_SEPARATOR;

/**
 * Devuelve una ruta absoluta a partir de la raíz de backend/.
 */
function ruta_base(string $relativa = ''): string
{
    $raiz = dirname(__DIR__);

    return $relativa === '' ? $raiz : $raiz . DIRECTORY_SEPARATOR . ltrim($relativa, SEPARADORES);
}

/**
 * Parser mínimo de .env. No usamos parse_ini_file porque rechaza los
 * comentarios con "#" y se complica con valores que traen símbolos, algo
 * habitual en un hash de contraseña.
 */
function leer_env(string $archivo): array
{
    $valores = [];
    $lineas = file($archivo, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];

    foreach ($lineas as $linea) {
        $linea = trim($linea);

        if ($linea === '' || str_starts_with($linea, '#') || !str_contains($linea, '=')) {
            continue;
        }

        [$clave, $valor] = explode('=', $linea, 2);
        $valor = trim($valor);

        // Un valor entre comillas se toma tal cual, sin interpretar nada.
        $comilla = $valor[0] ?? '';

        if (strlen($valor) >= 2 && ($comilla === '"' || $comilla === "'") && str_ends_with($valor, $comilla)) {
            $valor = substr($valor, 1, -1);
        }

        $valores[trim($clave)] = $valor;
    }

    return $valores;
}

/**
 * Lee un valor del archivo .env.
 */
function config(string $clave, string $porDefecto = ''): string
{
    static $valores = null;

    if ($valores === null) {
        $archivo = ruta_base('.env');

        if (!is_file($archivo)) {
            throw new RuntimeException(
                'Falta el archivo backend/.env. Copiá .env.example como .env y completá tus datos.'
            );
        }

        $valores = leer_env($archivo);
    }

    if (!isset($valores[$clave]) || trim($valores[$clave]) === '') {
        return $porDefecto;
    }

    return trim($valores[$clave]);
}

/**
 * Carpeta absoluta donde se guardan las fotos originales.
 */
function ruta_uploads(string $relativa = ''): string
{
    $base = ruta_base(config('UPLOADS_DIR', 'public/uploads'));

    return $relativa === '' ? $base : $base . DIRECTORY_SEPARATOR . ltrim($relativa, SEPARADORES);
}

/**
 * Carpeta absoluta de las miniaturas.
 */
function ruta_miniaturas(string $relativa = ''): string
{
    return ruta_uploads('miniaturas' . ($relativa === '' ? '' : DIRECTORY_SEPARATOR . ltrim($relativa, SEPARADORES)));
}

/**
 * URL pública de una foto guardada.
 */
function url_foto(string $archivo, bool $miniatura = false): string
{
    $base = rtrim(config('APP_URL', 'http://localhost:8000'), '/');

    return $base . '/uploads/' . ($miniatura ? 'miniaturas/' : '') . rawurlencode($archivo);
}
