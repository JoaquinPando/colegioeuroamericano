// Zona para arrastrar fotos, con vista previa y posibilidad de sacar alguna
// antes de publicar. Sin librerías: el input file es el que manda, y acá solo
// le vamos armando la lista de archivos.
(function () {
    const zona = document.getElementById('soltar');
    const entrada = document.getElementById('fotos');
    const elegir = document.getElementById('elegir');
    const previsualizacion = document.getElementById('previsualizacion');

    if (!zona || !entrada || !previsualizacion) return;

    let seleccionadas = [];

    function sincronizar() {
        const datos = new DataTransfer();
        seleccionadas.forEach((archivo) => datos.items.add(archivo));
        entrada.files = datos.files;
        dibujar();
    }

    function dibujar() {
        previsualizacion.querySelectorAll('img').forEach((img) => URL.revokeObjectURL(img.src));
        previsualizacion.innerHTML = '';

        seleccionadas.forEach((archivo, indice) => {
            const item = document.createElement('li');

            const img = document.createElement('img');
            img.src = URL.createObjectURL(archivo);
            img.alt = archivo.name;

            const quitar = document.createElement('button');
            quitar.type = 'button';
            quitar.className = 'quitar';
            quitar.innerHTML = '&times;';
            quitar.setAttribute('aria-label', 'Quitar ' + archivo.name);
            quitar.addEventListener('click', () => {
                seleccionadas.splice(indice, 1);
                sincronizar();
            });

            item.append(img, quitar);
            previsualizacion.append(item);
        });
    }

    function agregar(archivos) {
        for (const archivo of archivos) {
            if (!archivo.type.startsWith('image/')) continue;

            const repetida = seleccionadas.some(
                (otra) => otra.name === archivo.name && otra.size === archivo.size
            );

            if (!repetida) seleccionadas.push(archivo);
        }

        sincronizar();
    }

    elegir?.addEventListener('click', () => entrada.click());
    zona.addEventListener('click', (evento) => {
        if (evento.target === zona) entrada.click();
    });

    entrada.addEventListener('change', () => agregar(entrada.files));

    ['dragenter', 'dragover'].forEach((evento) =>
        zona.addEventListener(evento, (e) => {
            e.preventDefault();
            zona.classList.add('soltar--activo');
        })
    );

    ['dragleave', 'drop'].forEach((evento) =>
        zona.addEventListener(evento, (e) => {
            e.preventDefault();
            zona.classList.remove('soltar--activo');
        })
    );

    zona.addEventListener('drop', (e) => agregar(e.dataTransfer.files));
})();
