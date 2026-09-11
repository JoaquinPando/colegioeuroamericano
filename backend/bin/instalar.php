<?php

declare(strict_types=1);

/**
 * Crea la base de datos, las tablas y las carpetas de fotos.
 * Uso:  php bin/instalar.php
 */

require_once __DIR__ . '/../src/db.php';

if (PHP_SAPI !== 'cli') {
    exit('Este script se ejecuta desde la consola.');
}

$base = config('DB_NOMBRE', 'euroamericano');

try {
    $pdo = db_servidor();
} catch (PDOException $e) {
    fwrite(STDERR, "No se pudo conectar a MySQL: {$e->getMessage()}\n");
    fwrite(STDERR, "Revisá DB_HOST, DB_USUARIO y DB_CLAVE en backend/.env.\n");
    exit(1);
}

$pdo->exec(
    "CREATE DATABASE IF NOT EXISTS `$base` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
);
$pdo->exec("USE `$base`");
echo "Base de datos «{$base}» lista.\n";

$pdo->exec(<<<SQL
    CREATE TABLE IF NOT EXISTS actividades (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        titulo VARCHAR(200) NOT NULL,
        fecha DATE NOT NULL,
        descripcion TEXT NOT NULL,
        creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_actividades_fecha (fecha)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
SQL);
echo "Tabla «actividades» lista.\n";

$pdo->exec(<<<SQL
    CREATE TABLE IF NOT EXISTS fotos (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        actividad_id INT UNSIGNED NOT NULL,
        archivo VARCHAR(120) NOT NULL,
        orden INT UNSIGNED NOT NULL DEFAULT 0,
        PRIMARY KEY (id),
        KEY idx_fotos_actividad (actividad_id, orden),
        CONSTRAINT fk_fotos_actividad FOREIGN KEY (actividad_id)
            REFERENCES actividades (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
SQL);
echo "Tabla «fotos» lista.\n";

foreach ([ruta_uploads(), ruta_miniaturas()] as $carpeta) {
    if (!is_dir($carpeta) && !mkdir($carpeta, 0775, true) && !is_dir($carpeta)) {
        fwrite(STDERR, "No se pudo crear la carpeta $carpeta\n");
        exit(1);
    }
}
echo "Carpetas de fotos listas.\n";

if (config('PANEL_CLAVE_HASH') === '') {
    echo "\nFalta la contraseña del panel. Generá el hash con:\n";
    echo "  php bin/generar-clave.php \"tu-contraseña\"\n";
    echo "y pegalo en PANEL_CLAVE_HASH dentro de backend/.env\n";
}

echo "\nInstalación completa.\n";
