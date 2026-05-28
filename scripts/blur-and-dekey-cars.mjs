// Reproceso completo: blur del logo + chroma key del fondo
// Trabaja sobre los PNG originales (con fondo blanco) para que el
// blur quede limpio y luego se hace transparente el resto.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'originals', 'landing');
const DEST = path.resolve(__dirname, '..', 'public', 'cars');

const MAP = {
  'Mercedes-Benz C-Class.png': { out: 'mercedes.webp', logo: { x: 0.22, y: 0.42, w: 0.26, h: 0.30 } },
  'BMW 4 Series Coupé.png':    { out: 'bmw.webp',      logo: { x: 0.13, y: 0.38, w: 0.26, h: 0.28 } },
  'Range Rover Sport.png':     { out: 'landrover.webp',logo: { x: 0.18, y: 0.34, w: 0.26, h: 0.24 } },
  'MB Sprinter LCV.png':       { out: 'sprinter.webp', logo: { x: 0.16, y: 0.30, w: 0.28, h: 0.28 } },
};

const BLUR_SIGMA = 40;

// Chroma key thresholds (de dekey-cars.mjs)
const UPPER = 220;
const LOWER = 195;
const MAX_SAT = 14;

for (const [srcName, conf] of Object.entries(MAP)) {
  const srcPath = path.join(SRC, srcName);
  const buf = await readFile(srcPath);
  const meta = await sharp(buf).metadata();
  const W = meta.width, H = meta.height;

  // 1) Aplicar blur a region del logo (en imagen original con fondo blanco)
  const left = Math.max(0, Math.round(W * conf.logo.x));
  const top = Math.max(0, Math.round(H * conf.logo.y));
  const width = Math.min(W - left, Math.round(W * conf.logo.w));
  const height = Math.min(H - top, Math.round(H * conf.logo.h));

  const blurredRegion = await sharp(buf)
    .extract({ left, top, width, height })
    .blur(BLUR_SIGMA)
    .toBuffer();

  const blurredFull = await sharp(buf)
    .composite([{ input: blurredRegion, left, top, blend: 'over' }])
    .png()
    .toBuffer();

  // 2) Aplicar chroma key sobre el resultado del blur
  const { data, info } = await sharp(blurredFull)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    const isNeutral = sat <= MAX_SAT;

    if (isNeutral && lum >= UPPER) {
      data[i + 3] = 0;
    } else if (isNeutral && lum > LOWER) {
      const t = (UPPER - lum) / (UPPER - LOWER);
      data[i + 3] = Math.round(255 * t);
    }
  }

  // 3) Save como WebP
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 95, effort: 6 })
    .toFile(path.join(DEST, conf.out));

  console.log(`  ${srcName.padEnd(28)} -> ${conf.out}  blur(${left},${top} ${width}x${height})`);
}

console.log('\nlisto');
