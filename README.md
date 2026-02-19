# Voltaje Layout Portal (React + Netlify)

Frontend moderno para visualizar los layouts (planta baja / primer piso) en un sitio estático.

## Cómo funciona (sin tocar Python)

- Los layouts se generan con tus scripts Python en `layout/` (Bokeh).
- Este portal **no ejecuta Python**: copia los HTML ya generados desde `layout/assets/` hacia `voltaje_layout_portal/public/layouts/`.
- Luego React los muestra embebidos en un `iframe`.

## Modo 100% autónomo (sin depender de `layout/`)

Si querés que el portal quede independiente, copiá/pegá estos archivos dentro del portal:

- `layout/assets/planta_baja.html` → `public/layouts/planta_baja.html`
- `layout/assets/primer_piso.html` → `public/layouts/primer_piso.html`
- `layout/assets/category_plan.json` → `public/layouts/category_plan.json`

(Opcional, solo referencia)

- `layout/assets/deposito_planta_baja.png` → `public/assets/deposito_planta_baja.png`
- `layout/assets/deposito_primer_piso.png` → `public/assets/deposito_primer_piso.png`

## Desarrollo local

1) (Opcional) Regenerar los HTML con Python:

```bash
python layout/layout_planta_baja.py
python layout/layout_primer_piso.py
```

2) Instalar y correr el portal:

```bash
cd voltaje_layout_portal
npm install
npm run dev
```

El comando `build` copia automáticamente:
- `../layout/assets/planta_baja.html` → `public/layouts/planta_baja.html`
- `../layout/assets/primer_piso.html` → `public/layouts/primer_piso.html`

## Deploy en Netlify

En Netlify configurá:
- **Base directory**: `voltaje_layout_portal`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

