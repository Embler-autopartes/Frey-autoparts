// Extrae el logo Embler del fondo negro a transparente
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.resolve(ROOT, '..', 'fotos', 'logo embler.png');
const DEST_DIR = path.resolve(ROOT, 'public', 'logos');
await mkdir(DEST_DIR, { recursive: true });

// Upscale 3x + chroma key del fondo negro
const { data, info } = await sharp(SRC)
  .resize({ width: 825, kernel: 'lanczos3' }) // 3x upscale
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const THRESHOLD = 50; // pixel con lum<50 -> transparente
const FEATHER = 80;   // transicion suave entre 50 y 80

for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;

  if (lum < THRESHOLD) {
    data[i + 3] = 0;
  } else if (lum < FEATHER) {
    const t = (lum - THRESHOLD) / (FEATHER - THRESHOLD);
    data[i + 3] = Math.round(255 * t);
  }
}

// Variante 1: blanco sobre transparente (original con accent amarillo)
await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .webp({ quality: 95, alphaQuality: 100, effort: 6 })
  .toFile(path.join(DEST_DIR, 'embler.webp'));

// Variante 2: invertida en gris oscuro (para usar sobre fondos claros)
const inverted = Buffer.from(data);
for (let i = 0; i < inverted.length; i += 4) {
  // Si pixel es blanco, hacerlo gris oscuro. Si es amarillo, dejarlo.
  const r = inverted[i], g = inverted[i + 1], b = inverted[i + 2];
  const a = inverted[i + 3];
  if (a === 0) continue;
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  // Si es neutral (blanco), oscurecer a gris grafito
  if (sat < 30) {
    inverted[i] = 25; inverted[i + 1] = 28; inverted[i + 2] = 32;
  }
  // Amarillo se queda como acento
}
await sharp(inverted, { raw: { width: info.width, height: info.height, channels: 4 } })
  .webp({ quality: 95, alphaQuality: 100, effort: 6 })
  .toFile(path.join(DEST_DIR, 'embler-dark.webp'));

const fs = await import('node:fs/promises');
const s1 = await fs.stat(path.join(DEST_DIR, 'embler.webp'));
const s2 = await fs.stat(path.join(DEST_DIR, 'embler-dark.webp'));
console.log('embler.webp (claro sobre transparente):', Math.round(s1.size/1024) + 'KB');
console.log('embler-dark.webp (oscuro sobre transparente):', Math.round(s2.size/1024) + 'KB');
