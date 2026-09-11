<?php /** @var array $actividades */ ?>
<div class="encabezado">
    <div>
        <h1>Actividades</h1>
        <p class="ayuda">
            <?= count($actividades) === 1 ? '1 actividad publicada' : count($actividades) . ' actividades publicadas' ?>
            en la página del colegio.
        </p>
    </div>
    <a class="boton" href="/panel/nueva">+ Nueva actividad</a>
</div>

<?php if ($actividades === []): ?>
    <div class="tarjeta vacio">
        <p>Todavía no cargaste ninguna actividad.</p>
        <a class="boton" href="/panel/nueva">Cargar la primera</a>
    </div>
<?php else: ?>
    <ul class="lista">
        <?php foreach ($actividades as $actividad): ?>
            <li class="fila">
                <div class="fila__foto">
                    <?php if ($actividad['fotos']): ?>
                        <img src="<?= e(url_foto($actividad['fotos'][0]['archivo'], true)) ?>" alt="">
                    <?php else: ?>
                        <span class="sin-foto">Sin fotos</span>
                    <?php endif; ?>
                </div>

                <div class="fila__datos">
                    <strong><?= e($actividad['titulo']) ?></strong>
                    <span class="ayuda">
                        <?= e(date('d/m/Y', strtotime($actividad['fecha']))) ?>
                        · <?= count($actividad['fotos']) === 1 ? '1 foto' : count($actividad['fotos']) . ' fotos' ?>
                    </span>
                </div>

                <div class="fila__acciones">
                    <a class="boton boton--claro" href="/panel/editar?id=<?= (int) $actividad['id'] ?>">Editar</a>
                    <a class="boton-texto boton-texto--peligro" href="/panel/eliminar?id=<?= (int) $actividad['id'] ?>">Eliminar</a>
                </div>
            </li>
        <?php endforeach; ?>
    </ul>
<?php endif; ?>
