// Optimiza fotos de autos en /originals/cars a /public/cars en WebP
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'originals', 'cars');
const DEST = path.resolve(__dirname, '..', 'public', 'cars');

await mkdir(DEST, { recursive: true });
const files = await readdir(SRC);
for (const file of files) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const slug = file.replace(/\.[^.]+$/, '').toLowerCase();
  const dest = path.join(DEST, `${slug}.webp`);
  await sharp(path.join(SRC, file))
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(dest);
  const s = await stat(dest);
  console.log(`  ${file.padEnd(25)} -> ${slug}.webp (${Math.round(s.size / 1024)}KB)`);
}
console.log('[optimize-cars] done');
