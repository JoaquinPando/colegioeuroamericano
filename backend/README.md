# Backend de actividades — Colegio Euroamericano

Backend chico en PHP que reemplaza el Google Sheet + las carpetas de Drive.
La secretaría entra a una pantalla, escribe título, fecha y descripción,
arrastra las fotos y listo: la actividad aparece en la página del colegio.

- **Panel**: http://localhost:8000/panel
- **API que consume el sitio Next.js**: http://localhost:8000/api/actividades

Requiere PHP 8.4 (con `pdo_mysql`, `gd`, `exif` y `fileinfo`) y MySQL 8.
No usa Composer ni ninguna dependencia externa.

## Puesta en marcha

### 1. Configuración

```bash
cp .env.example .env
```

Editá `.env` y completá los datos de MySQL (`DB_USUARIO`, `DB_CLAVE`).
Si la contraseña tiene espacios o caracteres raros, ponela entre comillas.

### 2. Contraseña del panel

```bash
php bin/generar-clave.php "la-contraseña-que-quieras"
```

Copiá la línea `PANEL_CLAVE_HASH="..."` que imprime y pegala en `.env`.
En `PANEL_USUARIO` va el nombre de usuario (por defecto `admin`).

### 3. Base de datos

```bash
php bin/instalar.php
```

Crea la base, las tablas `actividades` y `fotos`, y las carpetas de fotos.
Se puede volver a correr sin romper nada.

### 4. Levantar el servidor

```bash
php -d upload_max_filesize=10M -d post_max_size=120M -S localhost:8000 -t public public/index.php
```

Los dos `-d` son importantes: el servidor embebido de PHP acepta 2 MB por
archivo por defecto, muy poco para subir varias fotos de celular a la vez.

> En Windows con Laravel Herd, `php` no siempre está en el PATH. Si no lo
> encuentra, usá la ruta completa: `"C:\Users\<usuario>\.config\herd\bin\php.bat"`.

### 5. Conectar el sitio Next.js

En `mi-pagina/.env.local`:

```
BACKEND_URL=http://localhost:8000
```

Con el backend corriendo, `npm run dev` en `mi-pagina/` ya muestra las
actividades en `/actividades` y en el carrusel del home.

## Cómo está organizado

```
bin/instalar.php        crea base, tablas y carpetas
bin/generar-clave.php   genera el hash de la contraseña del panel
public/index.php        único punto de entrada (API + panel)
public/uploads/         fotos originales
public/uploads/miniaturas/  versiones de 600 px para la galería
src/config.php          lectura de .env y rutas
src/db.php              conexión PDO
src/auth.php            login, sesión y CSRF
src/actividades.php     alta, edición y borrado de actividades
src/fotos.php           validación, orientación EXIF y miniaturas
src/vistas/             pantallas del panel
```

## La API

`GET /api/actividades` — todas las actividades, de la más reciente a la más antigua.
`GET /api/actividades?limit=12` — solo las más recientes.

```json
[
  {
    "titulo": "Día del logro",
    "fecha": "2026-08-14",
    "descripcion": "Los alumnos presentaron sus proyectos.",
    "fotos": [
      {
        "url": "http://localhost:8000/uploads/20260814-a1b2c3.jpg",
        "miniatura": "http://localhost:8000/uploads/miniaturas/20260814-a1b2c3.jpg"
      }
    ]
  }
]
```

Es de solo lectura y sin autenticación: es el mismo contenido que ya se ve
público en la web.

## Notas

- Las fotos se guardan en disco con un nombre generado por el servidor; en la
  base solo queda el nombre del archivo.
- Se valida el tipo real del archivo (no la extensión) y se aplica la
  orientación EXIF, así las fotos de celular no salen acostadas.
- Al borrar una actividad se borran también sus fotos, del disco y de la base.
- Para respaldar todo alcanza con copiar `public/uploads/` y hacer un dump de
  la base.
