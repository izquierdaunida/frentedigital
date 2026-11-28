# Guía para agentes de IA

## Contexto del proyecto

Frente Digital es la landing page del espacio digital de Izquierda Unida. Es un sitio estático construido con Astro y publicado en GitHub Pages bajo `https://frentedigital.iunida.org`. El contenido y la interfaz están en español.

## Desarrollo y validación

- Usa Node.js 22, como en el workflow de publicación.
- Instala dependencias con `npm ci`.
- `npm run dev`: inicia el servidor local en `http://localhost:4321`.
- `npm run build`: genera y valida el sitio estático en `dist/`.
- `npm run preview`: sirve localmente el build generado.
- No hay scripts de test ni de lint configurados en `package.json`; para cambios de código, ejecuta al menos `npm run build`.

## Estructura y convenciones

- `src/pages/`: páginas Astro y rutas del sitio (`index`, `gracias`, `privacidad` y `404`).
- `src/layouts/Base.astro`: estructura HTML común, metadatos, SEO, Open Graph y datos JSON-LD.
- `src/config.ts`: configuración centralizada del sitio, enlaces y Action Network. Reutiliza estos valores en lugar de duplicarlos.
- `src/styles/reset.css` y `src/styles/style.css`: reset y estilos generales compartidos.
- `src/pages/*.astro`: estilos específicos de cada página en bloques `<style>` scoped. Conserva la identidad visual de IU y los estados de foco y movimiento reducido.
- `src/assets/`: recursos procesados por Astro; usa `astro:assets` para imágenes importadas desde aquí.
- `public/`: archivos servidos tal cual, como favicon, imágenes sociales, `robots.txt`, `llms.txt` y `CNAME`.
- Mantén el modo estricto de TypeScript definido en `tsconfig.json` y sigue los patrones de componentes y frontmatter ya usados en las páginas.

## Skills del repositorio

Las guías de trabajo están en `.agents/skills/`. Lee y aplica la skill pertinente antes de empezar una tarea que encaje con ella:

- `astro-best-practices`: referencia general para implementar o revisar código Astro.
- `docs-lookup`: consultas que dependan de documentación o APIs actuales de Astro.
- `create-component`: creación de componentes, páginas, layouts o rutas.
- `add-integration`: incorporación o configuración de integraciones, adaptadores o frameworks.
- `content-collection`: cambios que realmente requieran colecciones de contenido estructurado.
- `migrate`: migraciones hacia Astro o actualizaciones entre versiones.

Combina la skill específica con `astro-best-practices` cuando esta lo indique. No añadas colecciones, integraciones ni frameworks solo porque exista una skill para ello; prioriza la solución más simple que encaje con el sitio.

## Formulario y datos

- El formulario de la portada se envía desde el navegador a la API pública de submissions de Action Network; este sitio no tiene backend propio.
- Mantén sincronizados los campos del formulario, su validación, el payload que construye `src/pages/index.astro` y el mapeo documentado en `README.md`.
- Los identificadores y las URL de Action Network están centralizados en `src/config.ts`.
- No envíes datos de prueba al endpoint de producción: un envío aceptado crea o actualiza un contacto real. Para probar, usa una simulación local o bloquea la petición de red.
- No añadas credenciales, tokens ni datos personales al repositorio. `.env`, `.ssh/`, `.tmp/` y `.work/` están excluidos por `.gitignore`.

## SEO y publicación

- El dominio canónico se define en `astro.config.mjs`; la integración de sitemap excluye las rutas privadas y de agradecimiento.
- Conserva `noindex` en las páginas que ya lo usan y actualiza los metadatos relacionados si cambias títulos, descripciones, rutas o imágenes sociales.
- La publicación se ejecuta mediante `.github/workflows/deploy.yml` en cada push a `main` y en ejecuciones manuales. El workflow instala con `npm ci`, construye con `npm run build` y publica `dist/` en GitHub Pages.
- `public/CNAME` y las URL absolutas de `src/config.ts`, `astro.config.mjs`, `public/robots.txt` y `public/llms.txt` deben seguir coherentes con el dominio de producción.
