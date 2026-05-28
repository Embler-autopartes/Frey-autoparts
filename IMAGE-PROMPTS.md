# FREY Auto Parts — Prompts para generación de imágenes con IA

> Guía completa de prompts para regenerar todos los assets visuales de la web FREY
> con AI (Gemini Imagen 3 / Imagen 4, ChatGPT Image, Midjourney, etc.).
>
> **Sistema de diseño global** — incluir SIEMPRE estos lineamientos al inicio de cada prompt o como contexto del proyecto:
>
> - Marca: **FREY Auto Parts**, fabricante premium B2B de refacciones para vehículos europeos (Mercedes-Benz, BMW, Land Rover, MB Sprinter)
> - Paleta: **platino claro #e9e7e7**, blanco roto, gris cálido, verde forestal profundo **#003F2A** como acento
> - Mood: **industrial-premium europeo**, estilo Brembo / Bilstein / Mahle, dealer Mercedes
> - Iluminación: cinematográfica suave, sin saturación, contraste sutil
> - Composición: editorial, espacio negativo, simetría no forzada
> - Resolución sugerida: **2400×1600** (hero) · **1600×1600** (cuadradas) · **1200×900** (cards)
> - Salida: **JPG/PNG** alta calidad, sin marca de agua, sin texto, sin logos visibles

---

## ⚠️ REGLA UNIVERSAL — NO LOGOS / NO TEXTO

> **Pega este bloque al final de TODOS los prompts** (cada vez que generes una imagen):
>
> ```
> NEGATIVE PROMPT: text, typography, lettering, watermark, signature,
> brand logo, manufacturer badge, FREY logo, trademarks, license plate,
> billboards, signage, captions, subtitles, written words, numbers.
> Strictly clean, completely logo-free composition.
> ```
>
> **Excepción autorizada** — solo para las 4 *brand cards* (sección 2.x):
> el badge propio de la marca en la parrilla del auto (estrella Mercedes,
> riñones BMW, óvalo Land Rover, estrella Mercedes en Sprinter) **sí está
> permitido** porque forma parte de la identidad del vehículo. Cualquier
> otro logo en fondo, placas, vidrios o accesorios debe excluirse.

---

## 1. HERO PRINCIPAL

### 1.1 `/hero/hero-main.webp` — Hero del Home

**Uso:** fondo a sangre del Hero. Detrás de "Präzision para tu europeo".
**Aspect ratio:** 16:9 horizontal (2400×1350 px)

**Prompt:**
```
Cinematic side profile of a dark forest-green BMW M5 sedan
parked in a minimalist concrete showroom, photographed during
golden hour with soft directional light hitting the front quarter
panel. Polished concrete floor, blurred industrial background,
shallow depth of field. Premium automotive editorial style,
Stuttgart luxury dealership aesthetic. Cool platinum gray tones
with deep forest-green car body that matches color #003F2A.
NO people, NO text, NO third-party logos, NO watermarks, NO
license plate, NO dealer stickers, NO billboards in the background.
The factory BMW roundel on hood and wheel hubs IS allowed (belongs
to the car). 35mm lens, slightly low angle for dramatic perspective.
Photorealistic, high detail on chrome trim and headlight housing.
Aspect ratio 16:9. Resolution 2400x1350.
```

### 1.2 `/hero/engine-macro.webp` — Hero alterno / macro técnico

**Uso:** posible reemplazo del Featured Part o sección técnica
**Aspect ratio:** 1:1 cuadrado (1600×1600)

**Prompt:**
```
Hyper-detailed macro photograph of a polished aluminum BMW engine
cylinder head with visible cam covers and CNC-machined bolt pattern.
Photographed on matte black studio backdrop with dramatic side
rim-lighting at 45 degrees creating subtle metallic reflections.
German engineering precision aesthetic, similar to Bilstein /
Brembo product catalog photography. Cool tones, sharp focus on
machined edges, soft gradient falloff into shadow. No background
clutter. No text or watermarks. Studio still-life style.
Aspect ratio 1:1. Resolution 1600x1600.
```

---

## 2. BRAND CARDS (4 marcas)

> Las 4 fotos deben tener **el mismo ángulo, el mismo fondo blanco/transparente, y la misma iluminación** para coherencia visual en la sección "Soporte completo para tu flota europea".

### 2.1 `/cars/mercedes.webp` — Mercedes-Benz C-Class

**Aspect ratio:** 3:2 (1500×1000)

**Prompt:**
```
Three-quarter front studio photograph of a silver Mercedes-Benz
C-Class W205 sedan on pure white seamless background. Soft top-down
studio lighting eliminates harsh shadows. Subtle ground reflection
under the wheels. Wheels turned slightly toward camera (Geneva show
angle). Color: brushed silver / iridium silver metallic. The
factory Mercedes-Benz three-pointed star on the grille IS allowed
(it belongs to the car). NO license plate, NO dealer decals, NO
watermarks, NO third-party logos, NO text or signature of any
kind. Professional automotive catalog photography, Mercedes-Benz
official press kit style. Photorealistic, high detail on grille,
headlights, side mirrors.
Aspect ratio 3:2. Resolution 1500x1000.
```

### 2.2 `/cars/bmw.webp` — BMW 4 Series Coupé

**Aspect ratio:** 3:2 (1500×1000)

**Prompt:**
```
Three-quarter front studio photograph of a silver BMW 4 Series
Coupé F32 on pure white seamless background. Same angle and lighting
as the Mercedes-Benz reference: top-down soft studio light, no harsh
shadows, subtle ground reflection. Wheels slightly turned toward
camera. Color: alpine white or brushed silver, must complement the
silver Mercedes in the same lineup. The factory BMW roundel on
hood and wheel hubs IS allowed (it belongs to the car). NO license
plate, NO dealer stickers, NO watermarks, NO third-party logos, NO
text or signature visible. BMW official press kit photography style.
Aspect ratio 3:2. Resolution 1500x1000.
```

### 2.3 `/cars/landrover.webp` — Range Rover Sport

**Aspect ratio:** 3:2 (1500×1000)

**Prompt:**
```
Three-quarter front studio photograph of a silver Range Rover Sport
L494 SUV on pure white seamless background. Same angle and lighting
as the Mercedes-Benz and BMW reference shots in this lineup.
Top-down soft studio light, no harsh shadows, subtle ground
reflection under the wheels. Wheels slightly turned toward camera.
Color: silver or fuji white, must visually match the lineup. The
factory Land Rover oval emblem on the grille IS allowed (it belongs
to the car). NO license plate, NO dealer stickers, NO watermarks,
NO third-party logos, NO text or signature visible. Land Rover
official press kit photography style.
Aspect ratio 3:2. Resolution 1500x1000.
```

### 2.4 `/cars/sprinter.webp` — MB Sprinter LCV

**Aspect ratio:** 3:2 (1500×1000)

**Prompt:**
```
Three-quarter front studio photograph of a white Mercedes-Benz
Sprinter 906 panel van on pure white seamless background. Same
lighting setup as the C-Class, 4-Series and Range Rover in the
lineup. Top-down soft studio light, no harsh shadows, subtle
ground reflection under wheels. Wheels slightly turned toward
camera. Long-wheelbase configuration, high-roof. Color: arctic
white. The factory Mercedes-Benz three-pointed star on the
grille IS allowed (it belongs to the vehicle). NO license plate,
NO fleet decals, NO company logos on the side panels, NO
watermarks, NO third-party branding, NO text or signature.
Mercedes-Benz commercial vehicle catalog photography.
Aspect ratio 3:2. Resolution 1500x1000.
```

---

## 3. FACILITY / LOGISTICS HUB · GUANGZHOU

### 3.1 `/images/warehouse-corridor.webp` — Pasillo principal

**Uso:** fondo a sangre de la sección "Logistics hub · Guangzhou"
**Aspect ratio:** 16:9 (2400×1350)

**Prompt:**
```
Wide cinematic photograph of an ultra-clean modern automotive
parts warehouse corridor, polished concrete floor, tall steel
selective racking with bright fluorescent linear lighting.
Boxes neatly stacked, branded labels turned away from camera.
Vanishing point perspective looking down the aisle. Cool
platinum gray and steel-blue tones, no warm yellows. No people
in frame, no visible signage, no text, no logos, no
manufacturer branding on boxes or walls. Architectural
photography style, Hasselblad medium-format aesthetic. Premium
German logistics center feeling (DHL Innovation Center vibe).
Aspect ratio 16:9. Resolution 2400x1350.
```

### 3.2 `/images/warehouse-overview.webp` — Vista panorámica

**Uso:** About / Acerca de
**Aspect ratio:** 16:9 (2400×1350)

**Prompt:**
```
High-angle wide-shot photograph of an immaculate automotive
parts distribution center, showing multiple parallel aisles of
high-rise selective racking under daylight skylights and
fluorescent linear LED. Polished epoxy floor reflecting subtle
overhead light. Cool monochromatic platinum tones. No human
figures, no readable signage, no text, no logos, no
manufacturer branding visible anywhere. Architectural
documentary photography. Inspired by Mercedes-Benz Parts Center
or BMW Logistics Center in Munich.
Aspect ratio 16:9. Resolution 2400x1350.
```

### 3.3 `/images/warehouse-aisle-wide.webp` — Pasillo con racks

**Aspect ratio:** 4:3 (1600×1200)

**Prompt:**
```
Three-quarter view of an automotive aftermarket warehouse aisle,
six-level selective racking with neatly stacked unlabeled boxes,
polished concrete floor, cool overhead LED illumination. Soft
geometric shadows. No people, no text, no logos, no brand
labels on boxes or walls. Industrial editorial photography,
Bilstein / Mahle catalog aesthetic.
Aspect ratio 4:3. Resolution 1600x1200.
```

### 3.4 `/images/warehouse-forklift.webp` — Operación logística

**Aspect ratio:** 16:9 (2400×1350)

**Prompt:**
```
Wide industrial photograph of a high-rise warehouse aisle with
a modern electric reach truck idle in the corridor. Polished
concrete floor, tall steel racking with unbranded boxes,
fluorescent linear lighting overhead. Operator NOT visible
(empty cab or framed without the driver). Cool monochromatic
platinum gray and steel-blue palette. No readable text, no
logos, no signage anywhere — neither on boxes, walls nor
forklift. Cinematic depth.
Aspect ratio 16:9. Resolution 2400x1350.
```

### 3.5 `/images/warehouse-racks-wide.webp` — Detalle racks

**Aspect ratio:** 3:2 (1800×1200)

**Prompt:**
```
Symmetrical low-angle photograph looking up between two high
warehouse racks holding neatly stacked unbranded automotive
parts boxes. Vanishing geometry, perfect grid composition.
Cool platinum tones, soft ambient lighting. No people, no
readable text, no logos, no brand markings of any kind.
Editorial industrial style.
Aspect ratio 3:2. Resolution 1800x1200.
```

### 3.6 `/images/warehouse-aerial.webp` — Aérea

**Uso:** opcional, sección manufactura
**Aspect ratio:** 16:9 (2400×1350)

**Prompt:**
```
High aerial photograph of a modern industrial logistics campus
at golden hour, taken from a drone perspective. Multiple white
warehouse buildings with cool grey rooftops, organized truck
loading bays, geometric pattern of parking. Surrounding by
neat landscaping. No identifiable branding, no logos, no text
visible on buildings, trucks or signage. Editorial architecture
photography, similar to Mercedes-Benz Wörth plant overview.
Aspect ratio 16:9. Resolution 2400x1350.
```

---

## 4. FEATURED PRODUCT (sección "Solenoide de control VVT")

### 4.1 `/images/product-hand-pump.webp` — Pieza destacada en macro

**Uso:** sección Featured Part en Home (fondo negro, estilo Brembo)
**Aspect ratio:** 1:1 cuadrado (1600×1600)

**Prompt:**
```
Hyper-detailed macro studio photograph of a precision-machined
aluminum VVT (variable valve timing) solenoid valve for German
luxury cars, isolated on pure deep black background. Single
dramatic side rim-light at 45 degrees, creating subtle metallic
specular highlights along machined surfaces. Black FKM rubber
seals visible on copper-colored coil terminals. Brushed aluminum
body with one-millimeter chamfer details. Subtle reflections of
green ambient light (#003F2A tint) on metal. Brembo / Bilstein
product catalog photography aesthetic. Razor sharp focus,
documentary engineering style. NO text, NO logos, NO brand
markings, NO part numbers stamped, NO watermarks, NO people.
Centered composition with breathing room.
Aspect ratio 1:1. Resolution 1600x1600.
```

---

## 5. SISTEMAS / CATEGORÍAS (8 sistemas)

> Cada imagen debe sentirse parte del mismo lookbook visual:
> fondo neutro plata, pieza centrada, iluminación editorial,
> mismo nivel de detalle macro.

### 5.1 `/systems/brakes.webp` — Frenos

**Aspect ratio:** 4:3 (1600×1200)

**Prompt:**
```
Editorial product photograph of a high-performance ventilated
brake disc rotor, painted matte black with brushed silver
friction surface, isolated on muted platinum gray background
#e9e7e7. Dramatic top-down soft studio lighting with subtle
side rim-light. Visible cooling vanes and OEM-style stamped
texture. No caliper, no wheel. Composition centered with
breathing room. Brembo product catalog aesthetic. NO text,
NO logos, NO Brembo wording, NO brand markings, NO part
numbers, NO watermarks.
Aspect ratio 4:3. Resolution 1600x1200.
```

### 5.2 `/systems/engine.webp` — Motor

**Aspect ratio:** 4:3 (1600×1200)

**Prompt:**
```
Editorial product photograph of an aluminum V8 engine block
short-block, machined cylinder bores visible from above, on
muted platinum gray background. Top-down studio lighting with
subtle warm fill. Brushed aluminum finish with CNC-machined
mating surfaces. No engine cover, no hoses. Centered, breathing
room. AMG / M Sport press kit photography aesthetic.
No text or branding visible.
Aspect ratio 4:3. Resolution 1600x1200.
```

### 5.3 `/systems/suspension.webp` — Suspensión

**Aspect ratio:** 4:3 (1600×1200)

**Prompt:**
```
Editorial product photograph of a premium gas-pressurized shock
absorber strut with golden-yellow coilover spring assembly,
matte black damper body, polished chrome piston rod, isolated
on muted platinum gray background. Three-quarter angle. Cool
studio lighting from upper left. Bilstein product catalog
photography style. No text, no logos, no installation context.
Aspect ratio 4:3. Resolution 1600x1200.
```

### 5.4 `/systems/transmission.webp` — Transmisión

**Aspect ratio:** 4:3 (1600×1200)

**Prompt:**
```
Editorial product photograph of a dual-mass flywheel disc with
visible clutch friction surface, satin steel finish with copper
plating on inner hub, isolated on muted platinum gray background.
Three-quarter angle showing concentric machined rings and bolt
holes. Studio lighting with soft rim highlight. LUK / Sachs
product catalog aesthetic. No text or branding.
Aspect ratio 4:3. Resolution 1600x1200.
```

### 5.5 `/systems/electric.webp` — Eléctrico

**Aspect ratio:** 4:3 (1600×1200)

**Prompt:**
```
Editorial product photograph of a modern automotive Mass Air
Flow (MAF) sensor with black plastic housing and chrome-colored
sensing element, isolated on muted platinum gray background.
Three-quarter angle, integrated electrical connector visible.
Soft top-down studio lighting. Bosch / Hella product catalog
aesthetic. No text, no part numbers visible.
Aspect ratio 4:3. Resolution 1600x1200.
```

### 5.6 `/systems/filtration.webp` — Filtración

**Aspect ratio:** 4:3 (1600×1200)

**Prompt:**
```
Editorial product photograph of a premium engine oil filter
element cutaway showing pleated synthetic filter media inside
a matte black metal canister, isolated on muted platinum gray
background. Three-quarter angle revealing pleat detail. Soft
top-down studio lighting. Mann-Filter / Mahle product catalog
aesthetic. No text or branding.
Aspect ratio 4:3. Resolution 1600x1200.
```

### 5.7 `/systems/cooling.webp` — Refrigeración

**Aspect ratio:** 4:3 (1600×1200)

**Prompt:**
```
Editorial product photograph of an aluminum automotive radiator
core close-up showing precision-stacked cooling fins between
brazed flat tubes, three-quarter angle, isolated on muted
platinum gray background. Cool side-lighting emphasizes the
aluminum texture. Behr / Mahle product catalog aesthetic.
No text or branding.
Aspect ratio 4:3. Resolution 1600x1200.
```

### 5.8 `/systems/body.webp` — Carrocería

**Aspect ratio:** 4:3 (1600×1200)

**Prompt:**
```
Editorial product photograph of a premium chrome-finished
side mirror assembly for German luxury sedan, isolated on
muted platinum gray background. Three-quarter angle showing
glass, housing curve, and folded indicator strip. Soft
overhead studio lighting with subtle reflection beneath. No
text, no branding, no mounting bracket visible.
Aspect ratio 4:3. Resolution 1600x1200.
```

---

## 6. PRODUCT CATALOG SHOTS (12 piezas individuales)

> Estilo unificado para reemplazar las fotos del catálogo (`/products/*.webp`).
> Misma iluminación, mismo fondo, mismo crop pattern.
>
> **Base prompt:** `Editorial three-quarter studio product photograph
> on pure neutral light gray background #e9e7e7, soft top-down
> studio lighting, subtle ground reflection, centered composition
> with breathing room, professional automotive parts catalog
> aesthetic, no text, no branding, no people. Aspect ratio 4:3.
> Resolution 1200x900.`

### 6.1 — Disco de freno ventilado (Mercedes/BMW/LR)
```
[base prompt] + Subject: Ventilated brake disc rotor with painted
black hub center and brushed silver friction surface, showing
internal cooling vanes from a three-quarter angle.
```

### 6.2 — Pastillas de freno (set de 4)
```
[base prompt] + Subject: Set of four premium ceramic brake pads
arranged in a fan-out pattern, matte gray friction material
visible, steel backing plates with anti-rattle clips.
```

### 6.3 — Sensor MAF
```
[base prompt] + Subject: Black plastic mass air flow sensor with
electrical connector and integrated air filter cone, three-quarter
angle, professional product shot.
```

### 6.4 — Bomba de agua eléctrica
```
[base prompt] + Subject: Aluminum electric water pump with black
plastic impeller housing and integrated rubber connector hose,
three-quarter angle.
```

### 6.5 — Amortiguador trasero
```
[base prompt] + Subject: Gas-charged automotive shock absorber
strut with matte black damper body and polished chrome piston
rod, vertical orientation, rubber bump-stop visible.
```

### 6.6 — Filtro de aire panel
```
[base prompt] + Subject: Rectangular panel air filter with
white pleated filter media inside black rubber frame,
three-quarter angle showing pleat depth.
```

### 6.7 — Brazo de control (control arm)
```
[base prompt] + Subject: Forged aluminum lower control arm with
integrated ball joint and pressed-in rubber bushings, polished
silver finish, three-quarter angle.
```

### 6.8 — Bujía / Solenoide VVT
```
[base prompt] + Subject: Precision aluminum VVT solenoid valve
with black FKM rubber seal and copper-colored electrical
terminals, three-quarter angle, machined surface detail visible.
```

### 6.9 — Termostato con carcasa
```
[base prompt] + Subject: Plastic thermostat housing assembly
with integrated rubber seal and metal wax-pellet thermostat
visible through aperture, three-quarter angle.
```

### 6.10 — Bomba de aceite
```
[base prompt] + Subject: Cast aluminum automotive oil pump
with visible gear teeth and bolt mounting flange, three-quarter
angle, brushed finish.
```

### 6.11 — Sensor ABS rueda
```
[base prompt] + Subject: ABS wheel speed sensor with black
plastic body, integrated wiring harness with white connector,
mounting bracket visible, three-quarter angle.
```

### 6.12 — Espejo lateral premium
```
[base prompt] + Subject: Modern luxury sedan side mirror
assembly with painted housing in silver, integrated turn signal
strip, mirror glass visible, three-quarter angle.
```

---

## 7. ALIANZA FREY × EMBLER

### 7.1 `/images/banner-frey-embler.webp` — Banner alianza

**Uso:** sección "FREY × EMBLER" en home y about
**Aspect ratio:** 21:9 ultra-wide (2400×1029)

**Prompt:**
```
Conceptual editorial photograph: split composition showing on
the left, a precision-machined automotive part (suspension
control arm or VVT solenoid) on a clean platinum gray
background; on the right, an aerial shot of Mexico City skyline
at twilight with subtle warm cool gradient. The two halves
connect through a thin vertical accent line in deep forest
green #003F2A. Editorial documentary style, premium B2B
business feel. No text, no logos.
Aspect ratio 21:9. Resolution 2400x1029.
```

---

## 8. PHOTO PRODUCTO HUMANO (opcional, para Acerca de)

### 8.1 `/images/product-in-hand.webp` — Pieza siendo inspeccionada

**Uso:** opcional, About / Quality section
**Aspect ratio:** 3:2 (1800×1200)

**Prompt:**
```
Macro editorial photograph of gloved hands holding a precision
aluminum automotive part (water pump or solenoid) up to soft
diffused studio light for quality inspection. White cotton
inspection gloves, blue work shirt blurred in background.
Razor sharp focus on the metallic part, soft bokeh background.
Cool platinum tones with subtle warm skin highlights. Quality
control aesthetic, BMW / Mercedes-Benz factory documentary
photography style. No text, no logos.
Aspect ratio 3:2. Resolution 1800x1200.
```

---

## 9. LOGO FREY

### 9.1 `/logo.webp` — Logo oficial

**No regenerar con IA** — usar el logo cromado oficial existente
(`logo.jpg`). Si necesitas SVG vectorial, pedir a un diseñador
para vectorizarlo correctamente preservando la tipografía exacta
de la marca.

---

## CHECKLIST RÁPIDO DE GENERACIÓN

| # | Archivo | Categoría | Prioridad |
|---|---------|-----------|-----------|
| 1 | hero/hero-main.webp | Hero | 🔴 alta |
| 2 | cars/mercedes.webp | Brand card | 🟡 media (ya tienes) |
| 3 | cars/bmw.webp | Brand card | 🟡 media (ya tienes) |
| 4 | cars/landrover.webp | Brand card | 🔴 alta (la actual no encaja) |
| 5 | cars/sprinter.webp | Brand card | 🟡 media (ya tienes) |
| 6 | images/warehouse-corridor.webp | Facility | 🔴 alta |
| 7 | images/warehouse-overview.webp | Facility | 🟡 media |
| 8 | images/warehouse-aisle-wide.webp | Facility | 🟢 baja |
| 9 | images/warehouse-forklift.webp | Facility | 🟢 baja |
| 10 | images/product-hand-pump.webp | Featured | 🔴 alta |
| 11 | systems/brakes.webp | Categoría | 🟡 media |
| 12 | systems/engine.webp | Categoría | 🟡 media |
| 13 | systems/suspension.webp | Categoría | 🟡 media |
| 14 | systems/transmission.webp | Categoría | 🟡 media |
| 15 | systems/electric.webp | Categoría | 🟡 media |
| 16 | systems/filtration.webp | Categoría | 🟡 media |
| 17 | systems/cooling.webp | Categoría | 🟡 media |
| 18 | systems/body.webp | Categoría | 🟡 media |
| 19 | images/banner-frey-embler.webp | Alianza | 🟢 baja |
| 20 | products/*.webp (12 piezas) | Catálogo | 🟢 baja |

---

## TIPS DE GENERACIÓN

1. **Gemini Imagen / ChatGPT Image**: pega el prompt tal cual, no agregues
   "make it photorealistic" — los modelos modernos ya lo son por defecto.
2. **Midjourney**: agrega `--ar 16:9 --style raw --v 7` al final del prompt
   para mejor resultado fotográfico.
3. **Si la primera imagen no convence**: agrega "shot on Hasselblad H6D
   medium format camera, 80mm lens, f/8" para forzar profesionalismo.
4. **Para evitar logos/texto fantasma**: añade `negative prompt: text,
   typography, watermark, logo, signature, brand name, license plate`.
5. **Coherencia entre las 4 cards de auto**: genera las 4 en la misma
   sesión, prompt-engineering en lote (`generate this same shot for
   Mercedes-Benz, BMW, Land Rover, Sprinter`).
6. **Convertir a WebP** después de generar:
   ```
   node scripts/optimize-images.mjs
   ```
   (ya está configurado para tomar PNG/JPG de `/originals/` y emitir
   WebP optimizado en `/public/images/`).

---

*Documento generado para FREY Auto Parts website project — 2026.*
