import sharp from 'sharp';
import path from 'node:path';
import { stat } from 'node:fs/promises';

const SRCDIR = 'C:/Users/Autom/OneDrive/Desktop/Pagina Frey/cede frey';
const DEST = path.resolve('public', 'images');

const jobs = [
  { src: 'FREY-NEW (3).png', slug: 'frey-hq-facade' },
  { src: 'FREY-NEW (5).png', slug: 'frey-hq-aerial' },
];

async function optimize(src, destBase, { maxWidth = 2400, quality = 80 } = {}) {
  const meta = await sharp(src).metadata();
  const targetWidth = Math.min(meta.width || maxWidth, maxWidth);
  const full = `${destBase}.webp`;
  const thumb = `${destBase}-thumb.webp`;
  await sharp(src).rotate().resize({ width: targetWidth, withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(full);
  await sharp(src).rotate().resize({ width: 800, withoutEnlargement: true }).webp({ quality: 72, effort: 6 }).toFile(thumb);
  const fs = await stat(full); const ts = await stat(thumb);
  return { fullKB: Math.round(fs.size/1024), thumbKB: Math.round(ts.size/1024) };
}

for (const j of jobs) {
  const { fullKB, thumbKB } = await optimize(path.join(SRCDIR, j.src), path.join(DEST, j.slug));
  console.log(`  ${j.src.padEnd(20)} -> ${j.slug}.webp (${fullKB}KB) + thumb (${thumbKB}KB)`);
}
console.log('done');
