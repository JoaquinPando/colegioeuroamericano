<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';

/**
 * Avisa al sitio Next.js que las actividades cambiaron, para que deje de
 * servir la copia en caché.
 *
 * Nunca interrumpe al panel: si el sitio está apagado o mal configurado, se
 * anota el problema y la carga sigue su curso. El sitio se pondrá al día solo
 * cuando venza su caché horaria.
 */
function avisar_al_sitio(): void
{
    $url = config('SITIO_URL');
    $token = config('SITIO_TOKEN');

    if ($url === '' || $token === '') {
        return;
    }

    $ch = curl_init(rtrim($url, '/') . '/api/revalidar');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => '',
        CURLOPT_HTTPHEADER => ['x-token: ' . $token],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 5,
        CURLOPT_CONNECTTIMEOUT => 2,
    ]);

    $respuesta = curl_exec($ch);
    $codigo = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($respuesta === false || $codigo !== 200) {
        error_log(sprintf(
            'No se pudo avisar al sitio (HTTP %d): %s',
            $codigo,
            $error !== '' ? $error : (string) $respuesta
        ));
    }
}
