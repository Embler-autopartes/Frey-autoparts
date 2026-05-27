// Genera un mosaico de todas las fotos extraidas para inspeccion visual
import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'public', 'products');

const TILE = 240;
const COLS = 6;
const PAD = 8;

const files = (await readdir(SRC))
  .filter((f) => f.endsWith('.webp'))
  .sort();

const rows = Math.ceil(files.length / COLS);
const W = COLS * (TILE + PAD) + PAD;
const H = rows * (TILE + PAD + 20) + PAD;

console.log(`mosaico ${COLS}x${rows} = ${files.length} thumbs (${W}x${H})`);

const composites = [];
for (let i = 0; i < files.length; i++) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = PAD + col * (TILE + PAD);
  const y = PAD + row * (TILE + PAD + 20);
  const img = await sharp(path.join(SRC, files[i]))
    .flatten({ background: { r: 240, g: 240, b: 240 } })
    .resize(TILE, TILE, { fit: 'contain', background: { r: 240, g: 240, b: 240 } })
    .png()
    .toBuffer();
  composites.push({ input: img, top: y, left: x });

  // Label (filename) below
  const label = files[i].replace('.webp', '');
  const labelSvg = `<svg width="${TILE}" height="20"><text x="${TILE / 2}" y="14" font-family="monospace" font-size="11" fill="#111" text-anchor="middle">${label}</text></svg>`;
  composites.push({ input: Buffer.from(labelSvg), top: y + TILE, left: x });
}

await sharp({
  create: { width: W, height: H, channels: 3, background: { r: 255, g: 255, b: 255 } },
})
  .composite(composites)
  .png()
  .toFile(path.resolve(__dirname, '..', 'shots', 'products-mosaic.png'));

console.log('listo: shots/products-mosaic.png');
