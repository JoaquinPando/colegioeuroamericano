<?php /** @var ?string $error */ ?>
<div class="tarjeta tarjeta--angosta">
    <h1>Panel de actividades</h1>
    <p class="ayuda">Ingresá para publicar las actividades del colegio.</p>

    <?php if ($error): ?>
        <p class="aviso aviso--error"><?= e($error) ?></p>
    <?php endif; ?>

    <form method="post" action="/panel/login" class="formulario">
        <?= csrf_campo() ?>

        <label for="usuario">Usuario</label>
        <input type="text" id="usuario" name="usuario" required autofocus autocomplete="username">

        <label for="clave">Contraseña</label>
        <input type="password" id="clave" name="clave" required autocomplete="current-password">

        <button type="submit" class="boton">Ingresar</button>
    </form>
</div>
