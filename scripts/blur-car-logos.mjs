// Aplica blur sobre la region del logo en cada auto
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, '..', 'public', 'cars');

// Regiones generosas para asegurar cobertura completa del emblema
const LOGO_REGIONS = {
  'mercedes.webp': { x: 0.22, y: 0.42, w: 0.26, h: 0.30 },
  'bmw.webp':      { x: 0.13, y: 0.38, w: 0.26, h: 0.28 },
  'landrover.webp':{ x: 0.18, y: 0.34, w: 0.26, h: 0.24 },
  'sprinter.webp': { x: 0.16, y: 0.30, w: 0.28, h: 0.28 },
};

const BLUR_SIGMA = 60; // mucho mas fuerte para que el emblema no sea reconocible

for (const [file, region] of Object.entries(LOGO_REGIONS)) {
  const src = path.join(DIR, file);
  const buf = await readFile(src);

  const meta = await sharp(buf).metadata();
  const W = meta.width, H = meta.height;

  const left = Math.max(0, Math.round(W * region.x));
  const top = Math.max(0, Math.round(H * region.y));
  const width = Math.min(W - left, Math.round(W * region.w));
  const height = Math.min(H - top, Math.round(H * region.h));

  const blurredRegion = await sharp(buf)
    .extract({ left, top, width, height })
    .blur(BLUR_SIGMA)
    .toBuffer();

  const outBuf = await sharp(buf)
    .composite([{ input: blurredRegion, left, top, blend: 'over' }])
    .webp({ quality: 90, alphaQuality: 95, effort: 6 })
    .toBuffer();

  await writeFile(src, outBuf);

  console.log(`  ${file}: blur en (${left},${top})  ${width}x${height}`);
}

console.log('\nlisto');
