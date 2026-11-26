# Frente Digital · Izquierda Unida

Landing page de **Frente Digital**, el espacio digital de Izquierda Unida.
Construida con [Astro](https://astro.build) y publicada en GitHub Pages.

- Producción: <https://frentedigital.iunida.org>
- Repositorio: <https://github.com/izquierdaunida/frentedigital>
- Formulario original: <https://actionnetwork.org/forms/frente-digital-iu>

## Qué incluye

- Página principal con el texto de presentación y el cartel del Frente Digital (1080 × 1440, optimizado en WebP responsive).
- Formulario con nombre, correo electrónico, código postal y consentimiento de privacidad.
- Envío directo a Action Network mediante su API v2, sin exponer ninguna API key.
- Página `/gracias` con llamadas a la Comunidad de WhatsApp y al canal de Telegram.
- Página `/privacidad` con el aviso legal y la política de privacidad, basada en el texto oficial de IU.
- Favicon oficial de izquierdaunida.org.
- Diseño responsive basado en la página original de Action Network.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/
```

## Estructura

```text
src/config.ts                 IDs y URLs de Action Network / redes
src/layouts/Base.astro        Cabecera, SEO y pie comunes
src/components/Header.astro   Logo blanco de IU sobre rojo
src/components/Footer.astro   Pie
src/pages/index.astro         Landing y formulario
src/pages/gracias.astro       Página de agradecimiento
src/pages/privacidad.astro    Aviso legal y privacidad
src/pages/404.astro           Página de error 404
src/styles/global.css         Estilos
src/assets/fdiu.jpg           Cartel del Frente Digital (original)
public/logo-iu-blanco.png     Logo de la cabecera
public/favicon-32x32.png      Favicon oficial de IU
public/favicon-192x192.png    Favicon oficial de IU
public/apple-touch-icon.png   Icono para iOS
public/og-frente-digital.png  Imagen de marca para JSON-LD (1200 × 630)
public/og-frente-digital-poster.jpg  Cartel para OG/Telegram (1080 × 1440, temporal)
public/robots.txt             Reglas de rastreo y sitemap
public/llms.txt               Resumen para motores generativos
public/site.webmanifest       Manifiesto de la web
public/CNAME                  Dominio personalizado de GitHub Pages
.github/workflows/deploy.yml  Despliegue automático a GitHub Pages
```

## SEO, GEO y previsualizaciones

- Título, meta description, canonical y `hreflang` (`es`, `es-ES`, `x-default`).
- `robots` con `max-image-preview:large` en la home; `noindex` en `/gracias`, `/privacidad` y `/404`.
- Sitemap generado con `@astrojs/sitemap` en `/sitemap-index.xml`; solo incluye la home.
- `public/robots.txt` apunta al sitemap.
- Datos estructurados JSON-LD: `PoliticalParty`, `WebSite` y `WebPage`, con dirección, área servida, perfiles sociales y `sameAs`.
- Señales geográficas (`geo.region`, `geo.placename`, `geo.position`) y dirección de Madrid en el JSON-LD.
- `public/llms.txt` con un resumen factual, enlaces oficiales y contacto para motores generativos.
- Open Graph completo (`og:title`, `og:description`, `og:image`, `og:image:type`, dimensiones y alt) y Twitter Card.
- Imagen de previsualización social: cartel real `og-frente-digital-poster.jpg` de 1080 × 1440, usado temporalmente hasta tener la imagen definitiva.
- La imagen de marca `og-frente-digital.png` (1200 × 630) se mantiene para el `logo` del JSON-LD.
- `site.webmanifest`, iconos y `theme-color`.

Telegram cachea las previsualizaciones por URL. Si después de publicar sigue mostrando una versión antigua, envía la URL a [@WebpageBot](https://t.me/WebpageBot) para forzar la actualización, o comparte un enlace con un parámetro de versión (`https://frentedigital.iunida.org/?v=2`) para ver la vista previa nueva.

## Action Network

Action Network distingue dos identificadores:

| Dato | Valor |
| --- | --- |
| ID interno del formulario | `870040` |
| UUID del recurso / API | `615a193b-d0c6-4791-9caa-8be711bf2727` |

La API v2 usa el **UUID**, no el ID numérico. El POST se hace contra:

```text
POST https://actionnetwork.org/api/v2/forms/615a193b-d0c6-4791-9caa-8be711bf2727/submissions
Content-Type: application/json
```

Es el mecanismo *blind POST* / record submission helper de Action Network:
no requiere `OSDI-API-Token` y está pensado para formularios propios en
JavaScript. La API devuelve `200 {}` si acepta el envío.

### Mapeo de campos

| Campo del formulario | Payload de la API |
| --- | --- |
| `first_name` | `person.given_name` |
| `email` | `person.email_addresses[0].address` (`status: subscribed`) |
| `zip_code` | `person.postal_addresses[0].postal_code` (`country: ES`) |
| `GDPR2` | `person.custom_fields.GDPR2 = "1"` |

El payload incluye además `triggers.autoresponse.enabled: true` para que
Action Network envíe la respuesta automática configurada en el formulario, y
`action_network:referrer_data.source = "frentedigital"`.

Los IDs y la URL están centralizados en `src/config.ts`. Si se cambia de
formulario en Action Network, hay que actualizar el UUID allí.

> No se debe enviar un formulario de prueba con datos inventados a producción:
> crearía un contacto real en Action Network. Para probar el flujo, usa un
> endpoint local simulado o desactiva la red en el navegador.

## Git y autoría

Los commits deben aparecer como **@izquierdaunida**. La identidad local del
repositorio está configurada con el correo *noreply* de la cuenta:

```bash
git config user.name "Izquierda Unida"
git config user.email "361639777+izquierdaunida@users.noreply.github.com"
```

La clave SSH dedicada está en `~/.ssh/iu_frentedigital` y el alias
`github-iu` está definido en `~/.ssh/config`:

```bash
ssh -T git@github-iu
# Hi izquierdaunida! You've successfully authenticated...
```

El remoto `origin` apunta a
`git@github-iu:izquierdaunida/frentedigital.git`.

## Publicación

Cada push a `main` lanza el workflow **Deploy to GitHub Pages**. El sitio se
publica desde el artefacto de Actions, no desde una rama.

### DNS en OVH

| Tipo  | Nombre          | Destino                    | TTL  |
| ----- | --------------- | -------------------------- | ---- |
| CNAME | `frentedigital` | `izquierdaunida.github.io` | 3600 |

Después, en **GitHub → Settings → Pages**, confirma el dominio
`frentedigital.iunida.org` y activa **Enforce HTTPS** cuando GitHub haya
emitido el certificado.

## Seguridad

- No subir nunca `.ssh/`, `.tmp/`, `.work/`, `.env` ni tokens.
- La clave privada vive fuera del repositorio, en `~/.ssh/`.
- El formulario no contiene API keys: usa el endpoint público de Action Network.
