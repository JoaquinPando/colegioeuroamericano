# Colegio Euroamericano

Sitio web institucional del Colegio Euroamericano, con un backend propio para
que el personal del colegio publique las actividades del año sin depender de
nadie del área técnica.

El repositorio contiene **dos proyectos** que funcionan juntos:

```
Web/
├── mi-pagina/   Sitio público (Next.js 16 + React 19 + Tailwind v4)
└── backend/     Panel de carga y API de actividades (PHP 8.4 + MySQL)
```

Cada uno tiene su propio README con el detalle:
[mi-pagina/README.md](mi-pagina/README.md) · [backend/README.md](backend/README.md)

## Cómo se reparten el trabajo

El sitio es estático y rapidísimo: casi todo su contenido está escrito en el
código. La única parte que cambia seguido son las **actividades**, y de eso se
encarga el backend.

```
Secretaría                Backend PHP                     Sitio Next.js
─────────────────────────────────────────────────────────────────────────
Entra al panel      →   Guarda la actividad en MySQL
Escribe título,         y las fotos en disco
fecha y descripción     (original + miniatura de 600px)
Arrastra las fotos                    │
                                      ▼
                        GET /api/actividades  ──────→  /actividades
                                                        y carrusel del home
```

El sitio consulta la API cada hora (ISR). Si el backend está apagado, las
páginas se muestran sin actividades en lugar de romperse.

> Antes esto se resolvía con un Google Sheet y carpetas de Google Drive. Se
> reemplazó porque mantener ese esquema era demasiado complicado para quien
> carga el contenido.

## Requisitos

| Herramienta | Versión usada | Para qué |
|---|---|---|
| Node.js | 20+ | Sitio Next.js |
| PHP | 8.4 | Backend (extensiones `pdo_mysql`, `gd`, `exif`, `fileinfo`) |
| MySQL | 8.0 | Base de datos de actividades |

En Windows, si PHP se instaló con Laravel Herd puede no estar en el PATH. La
ruta completa es `C:\Users\<usuario>\.config\herd\bin\php.bat`.

## Puesta en marcha

### 1. Backend

```bash
cd backend
cp .env.example .env                              # completá los datos de MySQL
php bin/generar-clave.php "tu-contraseña"         # pegá el hash en .env
php bin/instalar.php                              # crea base, tablas y carpetas
```

### 2. Sitio

```bash
cd mi-pagina
npm install
cp .env.example .env.local                        # BACKEND_URL=http://localhost:8000
```

## Uso diario

Hacen falta **las dos terminales**, una por proyecto:

```bash
# Terminal 1 — backend en http://localhost:8000
cd backend
php -d upload_max_filesize=10M -d post_max_size=120M -S localhost:8000 -t public public/index.php

# Terminal 2 — sitio en http://localhost:3000
cd mi-pagina
npm run dev
```

Los dos `-d` no son opcionales: el servidor embebido de PHP acepta 2 MB por
archivo por defecto, muy poco para varias fotos de celular.

| URL | Qué es |
|---|---|
| http://localhost:3000 | Sitio público |
| http://localhost:8000/panel | Panel de carga de actividades |
| http://localhost:8000/api/actividades | API que consume el sitio |

## Secciones del sitio

| Ruta | Contenido | Origen de los datos |
|---|---|---|
| `/` | Hero con video, estadísticas y carrusel de actividades | Código + API |
| `/nosotros` | Misión y visión, historia, infraestructura | Código |
| `/servicios-educativos` | Primaria, secundaria, seminario y cursos de verano | `lib/servicios/data.ts` |
| `/actividades` | Galería con visor de fotos | API |
| `/admision` | Proceso, requisitos y formulario en dos pasos | Código |
| `/contacto` | Formulario, datos de contacto y mapa | Código |

## Variables de entorno

Ninguna se versiona: en el repo solo viajan los `.env.example`.

**`mi-pagina/.env.local`**

| Variable | Para qué |
|---|---|
| `BACKEND_URL` | URL del backend PHP. También la lee `next.config.ts` para autorizar las fotos en `next/image`. |

**`backend/.env`**

| Variable | Para qué |
|---|---|
| `DB_HOST`, `DB_PORT`, `DB_NOMBRE`, `DB_USUARIO`, `DB_CLAVE` | Conexión a MySQL |
| `PANEL_USUARIO`, `PANEL_CLAVE_HASH` | Acceso al panel (la contraseña se guarda hasheada) |
| `APP_URL` | Base con la que se arman las URLs públicas de las fotos |
| `UPLOADS_DIR` | Dónde se guardan las fotos |

## Estado actual

**Funcionando**

- Las seis secciones del sitio, con animaciones y diseño responsive
- Panel de actividades completo: alta, edición, borrado, y borrado de fotos sueltas
- Validación real del tipo de archivo, orientación EXIF y miniaturas automáticas
- Al borrar una actividad o una foto, los archivos se eliminan también del disco

**Pendiente**

- Los formularios de **contacto** y **admisión** validan y muestran "enviado",
  pero todavía no envían nada a ningún lado
- El proceso de admisión y la lista de requisitos tienen contenido de ejemplo,
  a la espera de que el colegio confirme los datos reales
- No hay una página propia de "Vida escolar": el enlace apunta a `/actividades`
- No hay tests configurados
- El deploy todavía no está resuelto: hoy todo corre en local

## Convenciones

**Commits** — [Conventional Commits](https://www.conventionalcommits.org/):
`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`.

**Paleta**

| Color | Hex | Uso |
|---|---|---|
| Verde institucional | `#1B4D3E` | Primario |
| Dorado | `#F5C518` | Acento |
| Blanco hueso | `#FAF7F0` | Fondo |
| Texto | `#2B2B2B` | Texto |

## Detalles que conviene saber

- **`next.config.ts` solo se relee al reiniciar.** Si cambiás `BACKEND_URL` o la
  configuración de imágenes, hay que parar y volver a levantar `npm run dev`.
- **Next 16 bloquea imágenes cuyo host resuelve a una IP privada**, como defensa
  contra SSRF, y `localhost` entra en esa categoría. Por eso `next.config.ts`
  activa `dangerouslyAllowLocalIP`, pero solo mientras el backend sea local:
  apuntando a un dominio real se desactiva solo.
- **Las fotos no se versionan.** `backend/public/uploads/` está en `.gitignore`.
  Para respaldar el contenido alcanza con copiar esa carpeta y hacer un dump de
  la base.
- **El proyecto usa Next.js 16**, bastante más nuevo que la mayoría de los
  tutoriales y ejemplos que se encuentran dando vueltas. Ante la duda, la
  documentación que vale es la que trae el propio paquete, en
  `mi-pagina/node_modules/next/dist/docs/`.
