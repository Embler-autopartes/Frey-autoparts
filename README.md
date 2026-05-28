# FREY Auto Parts — Web corporativa

Sitio web premium B2B para **FREY Auto Parts** (fabricante alemán de refacciones europeas para Mercedes-Benz, BMW, Land Rover, MB Sprinter) con alianza estratégica en México vía **EMBLER Autopartes**.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4** + tokens custom (paleta platino + verde forestal)
- **next-intl** — i18n ES/EN
- **Fuentes**: Antonio (display industrial) + Cormorant Garamond (editorial italic) + Manrope (body) + JetBrains Mono (technical)
- **Sharp** para optimización de imágenes WebP
- Despliegue en **Vercel** con build estático (SSG)

## Estructura

```
src/
├── app/[locale]/         # Páginas i18n (es/en)
│   ├── page.tsx          # Home
│   ├── catalogo/         # Catálogo con filtros
│   ├── aplicacion/       # Selector por vehículo
│   ├── acerca/           # Empresa
│   ├── contacto/         # Form + mapas + canales
│   ├── politicas/        # Envíos, devoluciones, garantía, FAQ
│   └── descargas/        # 4 catálogos PDF
├── components/           # UI reutilizable por sección
├── messages/             # es.json + en.json
├── i18n/                 # Configuración next-intl
└── lib/                  # Datos del catálogo, metadata helpers

public/
├── cars/                 # 4 fotos de autos (chroma key)
├── images/               # Warehouse, banner, product hand
├── systems/              # 8 fotos de sistemas (Wikimedia + Frey)
├── products/             # 36 fotos extraídas de PDFs Frey
├── catalogos/            # 4 PDFs descargables
├── hero/                 # BMW M5 hero + macro V8
└── logos/                # Embler chroma-keyed
```

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # producción
npm run start      # servir build local
```

## Scripts útiles

```bash
node scripts/optimize-images.mjs       # WebP de originales/
node scripts/dekey-cars.mjs            # chroma key fotos auto
node scripts/extract-pdf-images.mjs    # imágenes de PDFs Frey
node scripts/fetch-system-photos.mjs   # Wikimedia Commons
```

## Deploy

El repo está conectado a Vercel para auto-deploy en cada `git push` a `main`.

URL producción: `https://frey-autoparts.vercel.app` (placeholder hasta dominio propio)

### Datos a reemplazar antes de público

- [ ] Teléfono Embler real (hoy `+52 55 0000 0000`)
- [ ] WhatsApp Embler real (mismo placeholder)
- [ ] Si quieres backend para el form de contacto: integrar Resend o Formspree (hoy abre `mailto:`)
- [ ] Analytics (GA4, Plausible o Vercel Analytics)
- [ ] Logo Embler en SVG vectorial (hoy es PNG 275×183 upscaled)
- [ ] Dominio propio en Vercel → Settings → Domains

## Páginas

| Ruta | Función |
|---|---|
| `/` | Home — hero, manifesto alemán, ticker, brand cards 4 marcas, facility, video corporativo, featured part, stats, quality partners, alianza Embler, CTA final |
| `/catalogo` | 30 piezas reales con filtros marca/sistema/búsqueda |
| `/aplicacion` | Selector cascada Marca → Modelo → Año → piezas compatibles |
| `/acerca` | Historia, timeline, valores, planta gallery, certificaciones, alianza |
| `/contacto` | 4 canales (WhatsApp/Mail/Tel/Distribuidor LATAM) + form + 2 mapas |
| `/politicas` | Envíos, devoluciones, garantía + FAQ accordion 7 preguntas |
| `/descargas` | 4 catálogos PDF Frey |
| `/sitemap.xml` | SEO sitemap dinámico (12 URLs, ES + EN) |
| `/robots.txt` | SEO robots |

## Licencias

- Código del sitio: propietario FREY/EMBLER
- Fotos sistema (`/public/systems/`): 6 de Wikimedia Commons (CC BY-SA — atribuciones en `public/systems/_credits.json`), 2 internas FREY
- Foto BMW M5 hero (`/hero/hero-main.webp`): Wikimedia CC BY-SA
- Catálogos PDF y fotos producto: propietario FREY
- Logo FREY: propietario FREY
- Logo EMBLER: propietario EMBLER Autopartes

---

*Construido con Claude Code · 2026*
