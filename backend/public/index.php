<?php

declare(strict_types=1);

// Con el servidor embebido de PHP (php -S), los archivos que existen en
// public/ los sirve el propio servidor; el resto entra por acá.
if (PHP_SAPI === 'cli-server') {
    $archivo = __DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    if (is_file($archivo)) {
        return false;
    }
}

require_once __DIR__ . '/../src/actividades.php';
require_once __DIR__ . '/../src/auth.php';
require_once __DIR__ . '/../src/sitio.php';

$metodo = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$ruta = rtrim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/', '/') ?: '/';

try {
    // --- API pública (la consume el sitio Next.js) -------------------------
    if ($ruta === '/api/actividades' && $metodo === 'GET') {
        $limite = isset($_GET['limit']) && ctype_digit((string) $_GET['limit'])
            ? (int) $_GET['limit']
            : null;

        responder_json(array_map('actividad_para_api', actividades_listar($limite)));
    }

    // --- Panel ------------------------------------------------------------
    sesion_iniciar();

    if ($ruta === '/') {
        redirigir(hay_sesion() ? '/panel' : '/panel/login');
    }

    // El navegador mandó más datos de los que PHP acepta: sin esto, el
    // formulario volvería vacío y sin ninguna explicación.
    if (subida_excedio_limite()) {
        avisar(
            'Las fotos que elegiste superan el límite de subida del servidor. '
            . 'Probá con menos fotos por vez.',
            'error'
        );
        redirigir($_SERVER['REQUEST_URI']);
    }

    if ($ruta === '/panel/login') {
        if (hay_sesion()) {
            redirigir('/panel');
        }

        $error = null;

        if ($metodo === 'POST') {
            csrf_verificar();

            if (intentar_login((string) ($_POST['usuario'] ?? ''), (string) ($_POST['clave'] ?? ''))) {
                redirigir('/panel');
            }

            $error = 'Usuario o contraseña incorrectos.';
        }

        vista('login', ['error' => $error, 'sinMenu' => true, 'titulo' => 'Ingresar']);
        exit;
    }

    requiere_sesion();

    if ($ruta === '/panel/salir' && $metodo === 'POST') {
        csrf_verificar();
        cerrar_sesion();
        redirigir('/panel/login');
    }

    if ($ruta === '/panel') {
        vista('lista', [
            'actividades' => actividades_listar(),
            'titulo' => 'Actividades',
        ]);
        exit;
    }

    if ($ruta === '/panel/nueva') {
        $datos = ['titulo' => '', 'fecha' => date('Y-m-d'), 'descripcion' => ''];
        $errores = [];

        if ($metodo === 'POST') {
            csrf_verificar();
            [$datos, $errores] = actividad_validar($_POST);

            if ($errores === []) {
                $id = actividad_crear($datos['titulo'], $datos['fecha'], $datos['descripcion']);
                $fallidas = fotos_subir($id, $_FILES['fotos'] ?? null);
                avisar_al_sitio();

                avisar(
                    $fallidas === []
                        ? 'Se publicó la actividad «' . $datos['titulo'] . '».'
                        : 'Se publicó la actividad, pero algunas fotos no se pudieron subir: '
                            . implode(' ', $fallidas),
                    $fallidas === [] ? 'exito' : 'error'
                );

                redirigir('/panel/editar?id=' . $id);
            }
        }

        vista('formulario', [
            'actividad' => $datos + ['id' => null, 'fotos' => []],
            'errores' => $errores,
            'titulo' => 'Nueva actividad',
        ]);
        exit;
    }

    if ($ruta === '/panel/editar') {
        $id = (int) ($_REQUEST['id'] ?? 0);
        $actividad = actividad_obtener($id);

        if (!$actividad) {
            http_response_code(404);
            exit('No encontramos esa actividad.');
        }

        $errores = [];

        if ($metodo === 'POST') {
            csrf_verificar();
            [$datos, $errores] = actividad_validar($_POST);

            if ($errores === []) {
                actividad_actualizar($id, $datos['titulo'], $datos['fecha'], $datos['descripcion']);
                $fallidas = fotos_subir($id, $_FILES['fotos'] ?? null);
                avisar_al_sitio();

                avisar(
                    $fallidas === []
                        ? 'Se guardaron los cambios.'
                        : 'Se guardaron los cambios, pero algunas fotos no se pudieron subir: '
                            . implode(' ', $fallidas),
                    $fallidas === [] ? 'exito' : 'error'
                );

                redirigir('/panel/editar?id=' . $id);
            }

            $actividad = $datos + ['id' => $id, 'fotos' => fotos_de($id)];
        }

        vista('formulario', [
            'actividad' => $actividad,
            'errores' => $errores,
            'titulo' => 'Editar actividad',
        ]);
        exit;
    }

    if ($ruta === '/panel/eliminar') {
        $id = (int) ($_REQUEST['id'] ?? 0);
        $actividad = actividad_obtener($id);

        if (!$actividad) {
            redirigir('/panel');
        }

        if ($metodo === 'POST') {
            csrf_verificar();
            actividad_eliminar($id);
            avisar_al_sitio();
            avisar('Se eliminó la actividad «' . $actividad['titulo'] . '».');
            redirigir('/panel');
        }

        vista('eliminar', ['actividad' => $actividad, 'titulo' => 'Eliminar actividad']);
        exit;
    }

    if ($ruta === '/panel/foto/eliminar' && $metodo === 'POST') {
        csrf_verificar();
        $actividadId = foto_eliminar((int) ($_POST['id'] ?? 0));

        if ($actividadId === null) {
            redirigir('/panel');
        }

        avisar_al_sitio();
        avisar('Se eliminó la foto.');
        redirigir('/panel/editar?id=' . $actividadId);
    }

    http_response_code(404);
    exit('Página no encontrada.');
} catch (Throwable $e) {
    error_log((string) $e);
    http_response_code(500);

    if (str_starts_with($ruta, '/api/')) {
        header('Content-Type: application/json; charset=utf-8');
        exit(json_encode(['error' => $e->getMessage()], JSON_UNESCAPED_UNICODE));
    }

    exit('Hubo un problema: ' . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8'));
}
