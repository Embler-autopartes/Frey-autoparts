// Mosaico de TODAS las imagenes extraidas (filtra por tamano minimo y ratio)
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'originals', 'pdf-extracted');

const TILE = 200;
const COLS = 8;
const PAD = 6;

// Recolecta candidatas
const cands = [];
for (const sub of await readdir(SRC)) {
  const dir = path.join(SRC, sub);
  let files;
  try { files = await readdir(dir); } catch { continue; }
  for (const f of files) {
    const m = f.match(/^p(\d+)-(\d+)-(\d+)x(\d+)\.webp$/);
    if (!m) continue;
    const w = Number(m[3]); const h = Number(m[4]);
    const ratio = w / h;
    if (Math.max(w, h) < 280) continue;
    if (ratio > 2 || ratio < 0.5) continue;
    cands.push({ sub, f, w, h, area: w * h });
  }
}

cands.sort((a, b) => b.area - a.area);
const top = cands.slice(0, 96); // top 96 = 12 rows de 8
console.log(`Mosaico: ${top.length} fotos`);

const rows = Math.ceil(top.length / COLS);
const W = COLS * (TILE + PAD) + PAD;
const H = rows * (TILE + PAD + 24) + PAD;

const composites = [];
for (let i = 0; i < top.length; i++) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = PAD + col * (TILE + PAD);
  const y = PAD + row * (TILE + PAD + 24);
  const c = top[i];
  const img = await sharp(path.join(SRC, c.sub, c.f))
    .flatten({ background: { r: 240, g: 240, b: 240 } })
    .resize(TILE, TILE, { fit: 'contain', background: { r: 240, g: 240, b: 240 } })
    .png()
    .toBuffer();
  composites.push({ input: img, top: y, left: x });

  const label = `${c.sub}/${c.f.replace('.webp','').slice(0,18)}`;
  const labelSvg = `<svg width="${TILE}" height="22"><text x="${TILE/2}" y="14" font-family="monospace" font-size="9" fill="#000" text-anchor="middle">${label}</text></svg>`;
  composites.push({ input: Buffer.from(labelSvg), top: y + TILE + 2, left: x });
}

await sharp({ create: { width: W, height: H, channels: 3, background: { r: 255, g: 255, b: 255 } } })
  .composite(composites)
  .png()
  .toFile(path.resolve(__dirname, '..', 'shots', 'all-extracted-mosaic.png'));

console.log('listo: shots/all-extracted-mosaic.png');
