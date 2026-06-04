import sharp from 'sharp';
import path from 'node:path';
import { mkdir, stat } from 'node:fs/promises';

const SRCDIR = 'C:/Users/Autom/OneDrive/Desktop/Pagina Frey/cede frey';
const DEST = path.resolve('public', 'cede');

const jobs = [
  { src: 'FREY-NEW (3).png', slug: 'cede-01' },
  { src: 'FREY-NEW (5).png', slug: 'cede-02' },
  { src: 'FREY-NEW (4).png', slug: 'cede-03' },
  { src: 'FREY-NEW (2).jpg (1).jpeg', slug: 'cede-04' },
];

async function optimize(src, destBase, { maxWidth = 1600, quality = 80 } = {}) {
  const meta = await sharp(src).metadata();
  const targetWidth = Math.min(meta.width || maxWidth, maxWidth);
  const full = `${destBase}.webp`;
  await sharp(src)
    .rotate()
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(full);
  const fs = await stat(full);
  return { fullKB: Math.round(fs.size / 1024) };
}

await mkdir(DEST, { recursive: true });
for (const j of jobs) {
  const { fullKB } = await optimize(path.join(SRCDIR, j.src), path.join(DEST, j.slug));
  console.log(`  ${j.src.padEnd(28)} -> ${j.slug}.webp (${fullKB}KB)`);
}
console.log('done');
