<?php /** @var array $actividad */ ?>
<div class="tarjeta tarjeta--angosta">
    <h1>¿Eliminar esta actividad?</h1>
    <p>
        Se va a borrar <strong><?= e($actividad['titulo']) ?></strong>
        del <?= e(date('d/m/Y', strtotime($actividad['fecha']))) ?>
        <?php if ($actividad['fotos']): ?>
            junto con sus <?= count($actividad['fotos']) ?> foto<?= count($actividad['fotos']) === 1 ? '' : 's' ?>
        <?php endif; ?>.
        Esta acción no se puede deshacer.
    </p>

    <form method="post" action="/panel/eliminar" class="acciones">
        <?= csrf_campo() ?>
        <input type="hidden" name="id" value="<?= (int) $actividad['id'] ?>">
        <a class="boton boton--claro" href="/panel">No, volver</a>
        <button type="submit" class="boton boton--peligro">Sí, eliminar</button>
    </form>
</div>
