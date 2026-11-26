# Frente Digital · Izquierda Unida

Landing page de **Frente Digital**, el espacio digital de Izquierda Unida.
Construida con [Astro](https://astro.build) y publicada en GitHub Pages.

- Producción: <https://frentedigital.iunida.org>
- Repositorio: <https://github.com/izquierdaunida/frentedigital>

## Estado

Versión inicial (*hello world*). La landing definitiva —texto, imagen y
formulario— se incorporará en la siguiente iteración.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/
```

## Estructura

```text
src/pages/index.astro      Página principal
public/CNAME               Dominio personalizado de GitHub Pages
public/favicon.svg         Icono
.github/workflows/deploy.yml  Despliegue automático a GitHub Pages
```

## Git y autoría

Los commits deben aparecer como **@izquierdaunida**. La identidad local del
repositorio ya está configurada con el correo *noreply* de la cuenta:

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

El remoto se llama `origin` y apunta a
`git@github-iu:izquierdaunida/frentedigital.git`.

## Publicación

Cada push a `main` lanza el workflow **Deploy to GitHub Pages**. El sitio se
publica desde el artefacto de Actions, no desde una rama.

### DNS en OVH

Para que `frentedigital.iunida.org` apunte a GitHub Pages, crea este registro
en la zona DNS de `iunida.org`:

| Tipo  | Nombre          | Destino                    | TTL  |
| ----- | --------------- | -------------------------- | ---- |
| CNAME | `frentedigital` | `izquierdaunida.github.io` | 3600 |

Después, en **GitHub → Settings → Pages**, confirma que el dominio
personalizado es `frentedigital.iunida.org` y activa **Enforce HTTPS** cuando
GitHub haya emitido el certificado.

## Seguridad

- No subir nunca `.ssh/`, `.tmp/`, `.env` ni tokens.
- La clave privada vive fuera del repositorio, en `~/.ssh/`.
- El token del flujo de dispositivo se usa solo para la configuración inicial
  y puede revocarse en <https://github.com/settings/applications>.
