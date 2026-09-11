<?php

declare(strict_types=1);

/**
 * Genera el hash de la contraseña del panel.
 * Uso:  php bin/generar-clave.php "mi-contraseña"
 */

if (PHP_SAPI !== 'cli') {
    exit('Este script se ejecuta desde la consola.');
}

$clave = $argv[1] ?? '';

if ($clave === '') {
    fwrite(STDERR, "Uso: php bin/generar-clave.php \"mi-contraseña\"\n");
    exit(1);
}

if (mb_strlen($clave) < 8) {
    fwrite(STDERR, "La contraseña tiene que tener al menos 8 caracteres.\n");
    exit(1);
}

echo "Pegá esta línea en backend/.env:\n\n";
echo 'PANEL_CLAVE_HASH="' . password_hash($clave, PASSWORD_DEFAULT) . '"' . "\n";
