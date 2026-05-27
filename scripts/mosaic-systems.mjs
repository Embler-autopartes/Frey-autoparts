import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'public', 'systems');
const files = (await readdir(SRC)).filter((f) => f.endsWith('.webp')).sort();
const TILE = 360; const COLS = 4; const PAD = 8;
const rows = Math.ceil(files.length / COLS);
const W = COLS * (TILE + PAD) + PAD;
const H = rows * (TILE + PAD + 24) + PAD;
const composites = [];
for (let i = 0; i < files.length; i++) {
  const col = i % COLS, row = Math.floor(i / COLS);
  const x = PAD + col * (TILE + PAD);
  const y = PAD + row * (TILE + PAD + 24);
  const img = await sharp(path.join(SRC, files[i]))
    .flatten({ background: { r: 240, g: 240, b: 240 } })
    .resize(TILE, TILE, { fit: 'cover' })
    .png().toBuffer();
  composites.push({ input: img, top: y, left: x });
  const label = files[i].replace('.webp', '');
  const svg = `<svg width="${TILE}" height="22"><text x="${TILE/2}" y="16" font-family="monospace" font-size="13" fill="#000" text-anchor="middle">${label}</text></svg>`;
  composites.push({ input: Buffer.from(svg), top: y + TILE + 2, left: x });
}
await sharp({ create: { width: W, height: H, channels: 3, background: { r: 255, g: 255, b: 255 } } })
  .composite(composites).png().toFile(path.resolve(__dirname, '..', 'shots', 'systems-mosaic.png'));
console.log('listo');
