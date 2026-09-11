<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';

const OPCIONES_PDO = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

/**
 * Conexión a la base de datos del proyecto.
 */
function db(): PDO
{
    static $pdo = null;

    if ($pdo === null) {
        $dsn = sprintf(
            'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
            config('DB_HOST', '127.0.0.1'),
            config('DB_PORT', '3306'),
            config('DB_NOMBRE', 'euroamericano')
        );

        $pdo = new PDO($dsn, config('DB_USUARIO', 'root'), config('DB_CLAVE'), OPCIONES_PDO);
    }

    return $pdo;
}

/**
 * Conexión sin base seleccionada. Solo la usa el instalador, que todavía
 * tiene que crearla.
 */
function db_servidor(): PDO
{
    $dsn = sprintf(
        'mysql:host=%s;port=%s;charset=utf8mb4',
        config('DB_HOST', '127.0.0.1'),
        config('DB_PORT', '3306')
    );

    return new PDO($dsn, config('DB_USUARIO', 'root'), config('DB_CLAVE'), OPCIONES_PDO);
}
