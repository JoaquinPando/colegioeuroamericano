<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/helpers.php';

/**
 * Arranca la sesión del panel una sola vez por request.
 */
function sesion_iniciar(): void
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start([
            'cookie_httponly' => true,
            'cookie_samesite' => 'Lax',
            'use_strict_mode' => true,
        ]);
    }
}

function hay_sesion(): bool
{
    return !empty($_SESSION['usuario']);
}

/**
 * Corta la ejecución si no hay sesión abierta.
 */
function requiere_sesion(): void
{
    if (!hay_sesion()) {
        redirigir('/panel/login');
    }
}

/**
 * Valida usuario y contraseña contra lo configurado en .env.
 */
function intentar_login(string $usuario, string $clave): bool
{
    $usuarioEsperado = config('PANEL_USUARIO');
    $hash = config('PANEL_CLAVE_HASH');

    if ($usuarioEsperado === '' || $hash === '') {
        throw new RuntimeException(
            'Falta configurar PANEL_USUARIO y PANEL_CLAVE_HASH en backend/.env. '
            . 'Generá el hash con: php bin/generar-clave.php "tu-contraseña"'
        );
    }

    // hash_equals evita filtrar el usuario correcto por tiempo de respuesta.
    $usuarioOk = hash_equals($usuarioEsperado, $usuario);
    $claveOk = password_verify($clave, $hash);

    if (!$usuarioOk || !$claveOk) {
        return false;
    }

    session_regenerate_id(true);
    $_SESSION['usuario'] = $usuarioEsperado;

    return true;
}

function cerrar_sesion(): void
{
    $_SESSION = [];
    session_destroy();
}

/**
 * Token CSRF de la sesión actual.
 */
function csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf'];
}

/**
 * Campo oculto listo para pegar en un formulario.
 */
function csrf_campo(): string
{
    return '<input type="hidden" name="csrf" value="' . e(csrf_token()) . '">';
}

/**
 * Corta la ejecución si el token no coincide.
 */
function csrf_verificar(): void
{
    $enviado = $_POST['csrf'] ?? '';

    if (!is_string($enviado) || !hash_equals($_SESSION['csrf'] ?? '', $enviado)) {
        http_response_code(419);
        exit('La sesión expiró. Volvé a cargar la página e intentá de nuevo.');
    }
}
