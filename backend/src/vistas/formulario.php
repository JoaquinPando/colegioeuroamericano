<?php
/** @var array $actividad */
/** @var array $errores */
$esNueva = empty($actividad['id']);
$accion = $esNueva ? '/panel/nueva' : '/panel/editar?id=' . (int) $actividad['id'];
?>
<div class="encabezado">
    <div>
        <h1><?= $esNueva ? 'Nueva actividad' : 'Editar actividad' ?></h1>
        <p class="ayuda">Completá los datos y arrastrá las fotos. Nada más.</p>
    </div>
    <a class="boton-texto" href="/panel">Volver</a>
</div>

<form method="post" action="<?= e($accion) ?>" enctype="multipart/form-data" class="tarjeta formulario">
    <?= csrf_campo() ?>

    <label for="titulo">Título</label>
    <input type="text" id="titulo" name="titulo" maxlength="200" required
           value="<?= e($actividad['titulo']) ?>" placeholder="Ej: Día del logro 2026">
    <?php if (isset($errores['titulo'])): ?>
        <span class="error"><?= e($errores['titulo']) ?></span>
    <?php endif; ?>

    <label for="fecha">Fecha</label>
    <input type="date" id="fecha" name="fecha" required value="<?= e($actividad['fecha']) ?>">
    <?php if (isset($errores['fecha'])): ?>
        <span class="error"><?= e($errores['fecha']) ?></span>
    <?php endif; ?>

    <label for="descripcion">Descripción <span class="ayuda">(opcional)</span></label>
    <textarea id="descripcion" name="descripcion" rows="4"
              placeholder="Contá brevemente de qué se trató."><?= e($actividad['descripcion']) ?></textarea>

    <label for="fotos">Fotos</label>
    <div class="soltar" id="soltar">
        <input type="file" id="fotos" name="fotos[]" accept="image/jpeg,image/png,image/webp" multiple hidden>
        <p class="soltar__texto">
            Arrastrá las fotos acá o <button type="button" class="boton-texto" id="elegir">elegilas desde tu computadora</button>
        </p>
        <p class="ayuda">JPG, PNG o WEBP · hasta <?= e(formato_peso(limite_foto())) ?> por foto</p>
    </div>
    <ul class="previsualizacion" id="previsualizacion"></ul>

    <button type="submit" class="boton">
        <?= $esNueva ? 'Publicar actividad' : 'Guardar cambios' ?>
    </button>
</form>

<?php if (!$esNueva && $actividad['fotos']): ?>
    <section class="tarjeta">
        <h2>Fotos cargadas</h2>
        <p class="ayuda">Se muestran en la página en este orden.</p>

        <ul class="galeria">
            <?php foreach ($actividad['fotos'] as $foto): ?>
                <li>
                    <img src="<?= e(url_foto($foto['archivo'], true)) ?>" alt="" loading="lazy">
                    <form method="post" action="/panel/foto/eliminar">
                        <?= csrf_campo() ?>
                        <input type="hidden" name="id" value="<?= (int) $foto['id'] ?>">
                        <button type="submit" class="quitar" aria-label="Eliminar esta foto">&times;</button>
                    </form>
                </li>
            <?php endforeach; ?>
        </ul>
    </section>
<?php endif; ?>

<script src="/assets/panel.js" defer></script>
