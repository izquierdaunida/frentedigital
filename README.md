# Frente Digital · Izquierda Unida

Landing page de **Frente Digital**, el espacio digital de Izquierda Unida.
Construida con [Astro](https://astro.build) y publicada en GitHub Pages.

- Producción: <https://frentedigital.iunida.org>
- Repositorio: <https://github.com/izquierdaunida/frentedigital>
- Formulario original: <https://actionnetwork.org/forms/frente-digital-iu>

## Qué incluye

- Página principal con el texto de presentación y un placeholder de imagen 1440 × 1080.
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
src/styles/global.css         Estilos
public/placeholder-1440x1080.svg  Placeholder de la imagen principal
public/logo-iu-blanco.png     Logo de la cabecera
public/favicon-32x32.png      Favicon oficial de IU
public/favicon-192x192.png    Favicon oficial de IU
public/apple-touch-icon.png   Icono para iOS
public/og.jpg                 Imagen para redes sociales
public/CNAME                  Dominio personalizado de GitHub Pages
.github/workflows/deploy.yml  Despliegue automático a GitHub Pages
```

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
