<?php

declare(strict_types=1);

/**
 * Escapa texto para imprimirlo en HTML.
 */
function e(?string $texto): string
{
    return htmlspecialchars($texto ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/**
 * Redirige y corta la ejecución.
 */
function redirigir(string $ruta): never
{
    header('Location: ' . $ruta);
    exit;
}

/**
 * Responde con JSON.
 */
function responder_json(mixed $datos, int $codigo = 200): never
{
    http_response_code($codigo);
    header('Content-Type: application/json; charset=utf-8');
    // Contenido público de solo lectura: permitir que lo consuman otros orígenes
    // (por ejemplo el sitio Next.js corriendo en otro puerto).
    header('Access-Control-Allow-Origin: *');
    echo json_encode($datos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Guarda un mensaje para mostrarlo después de una redirección.
 */
function avisar(string $mensaje, string $tipo = 'exito'): void
{
    $_SESSION['aviso'] = ['mensaje' => $mensaje, 'tipo' => $tipo];
}

/**
 * Devuelve el aviso pendiente (y lo borra).
 */
function aviso_pendiente(): ?array
{
    $aviso = $_SESSION['aviso'] ?? null;
    unset($_SESSION['aviso']);

    return $aviso;
}

/**
 * Renderiza una vista dentro del layout del panel.
 */
function vista(string $nombre, array $datos = []): void
{
    extract($datos, EXTR_SKIP);
    $contenido = __DIR__ . '/vistas/' . $nombre . '.php';

    require __DIR__ . '/vistas/layout.php';
}

/**
 * Tamaño máximo por foto, en bytes.
 */
function limite_foto(): int
{
    return 8 * 1024 * 1024;
}

/**
 * Convierte bytes a un texto legible.
 */
function formato_peso(int $bytes): string
{
    if ($bytes >= 1024 * 1024) {
        return round($bytes / (1024 * 1024), 1) . ' MB';
    }

    return max(1, (int) round($bytes / 1024)) . ' KB';
}
