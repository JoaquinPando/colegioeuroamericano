<?php /** @var string $contenido */ ?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($titulo ?? 'Panel') ?> · Colegio Euroamericano</title>
    <link rel="stylesheet" href="/assets/panel.css">
</head>
<body>
<?php if (empty($sinMenu)): ?>
    <header class="barra">
        <a class="marca" href="/panel">Colegio Euroamericano</a>
        <form method="post" action="/panel/salir">
            <?= csrf_campo() ?>
            <button type="submit" class="boton-texto">Cerrar sesión</button>
        </form>
    </header>
<?php endif; ?>

<main class="contenido">
    <?php $aviso = aviso_pendiente(); ?>
    <?php if ($aviso): ?>
        <p class="aviso aviso--<?= e($aviso['tipo']) ?>"><?= e($aviso['mensaje']) ?></p>
    <?php endif; ?>

    <?php require $contenido; ?>
</main>
</body>
</html>
