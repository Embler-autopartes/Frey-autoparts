// Selecciona las mejores fotos de producto (ratio cuadrado-ish, tamano grande)
// de originals/pdf-extracted/* y las copia a public/products/ con nombres simples
import { readdir, mkdir, copyFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'originals', 'pdf-extracted');
const DEST = path.resolve(__dirname, '..', 'public', 'products');

const MIN_SIDE = 300;          // descarta menores
const MAX_RATIO = 1.9;         // ratio max ancho/alto (descarta panoramicas/headers)
const MIN_RATIO = 0.5;         // descarta verticales muy raras
const PER_BRAND = 12;          // copia top N por marca

await mkdir(DEST, { recursive: true });

async function pickFromDir(slug) {
  const dir = path.join(SRC, slug);
  let files;
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }
  const candidates = [];
  for (const f of files) {
    const m = f.match(/^p(\d+)-(\d+)-(\d+)x(\d+)\.webp$/);
    if (!m) continue;
    const w = Number(m[3]);
    const h = Number(m[4]);
    const ratio = w / h;
    if (Math.max(w, h) < MIN_SIDE) continue;
    if (ratio > MAX_RATIO || ratio < MIN_RATIO) continue;
    const s = await stat(path.join(dir, f));
    candidates.push({ f, w, h, area: w * h, bytes: s.size });
  }
  // Sort by area descending, then size descending
  candidates.sort((a, b) => b.area - a.area || b.bytes - a.bytes);
  return candidates;
}

const brandMap = { mb: 'mb', bmw: 'bmw', sprinter: 'sprinter', 'sprinter-b': 'sprinter' };
const taken = { mb: 0, bmw: 0, sprinter: 0 };

for (const [srcSlug, brand] of Object.entries(brandMap)) {
  const list = await pickFromDir(srcSlug);
  const allowed = PER_BRAND - taken[brand];
  if (allowed <= 0) continue;
  const top = list.slice(0, allowed);
  console.log(`\n${srcSlug} (${list.length} candidatas): tomando top ${top.length}`);
  for (const c of top) {
    const idx = taken[brand] + 1;
    const outName = `${brand}-${String(idx).padStart(2, '0')}.webp`;
    // Re-encode con limite de tamano y fondo blanco si tiene transparencia
    await sharp(path.join(SRC, srcSlug, c.f))
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 86, effort: 5 })
      .toFile(path.join(DEST, outName));
    taken[brand]++;
    console.log(`  ${c.f.padEnd(35)} -> ${outName}  (${c.w}x${c.h})`);
  }
}

console.log('\n[pick-product-photos] listo');
console.log(JSON.stringify(taken, null, 2));
