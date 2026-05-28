// Descarga 2 fotos atmosfericas para hero (auto europeo)
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEST = path.resolve(__dirname, '..', 'public', 'hero');
await mkdir(DEST, { recursive: true });

const HEADERS = { 'User-Agent': 'FreyAutopartsBuild/1.0' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TARGETS = [
  { name: 'hero-main', queries: ['BMW M5 F90 front', 'Mercedes-AMG GT silver', 'Mercedes E-Class W213 dark'] },
  { name: 'engine-macro', queries: ['BMW S55 engine bay', 'Mercedes-AMG engine M156', 'BMW N63 V8 engine'] },
];

async function searchAndSave(target) {
  for (const q of target.queries) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(q + ' filetype:bitmap')}&gsrlimit=15&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=2400&format=json&origin=*`;
    const r = await fetch(url, { headers: HEADERS });
    if (!r.ok) { console.log(`  search ${r.status}`); continue; }
    const data = await r.json();
    const pages = Object.values(data.query?.pages || {}).sort((a, b) => (a.index || 0) - (b.index || 0));
    for (const p of pages) {
      const info = p.imageinfo?.[0];
      if (!info || !/image\/(jpeg|png)/.test(info.mime || '')) continue;
      const w = info.width || 0, h = info.height || 0;
      const ratio = w / h;
      if (Math.max(w, h) < 1400) continue;
      if (ratio < 1.3 || ratio > 2.5) continue;  // panoramic-ish, no portraits
      await sleep(2000);
      const dl = await fetch(info.thumburl || info.url, { headers: HEADERS });
      if (!dl.ok) { console.log(`  dl ${dl.status}`); continue; }
      const buf = Buffer.from(await dl.arrayBuffer());
      await sharp(buf)
        .resize({ width: 2400, withoutEnlargement: true })
        .webp({ quality: 80, effort: 5 })
        .toFile(path.join(DEST, `${target.name}.webp`));
      console.log(`  ${target.name} saved from ${p.title} (${w}x${h})`);
      return true;
    }
  }
  return false;
}

for (const t of TARGETS) {
  process.stdout.write(`▶ ${t.name}\n`);
  await searchAndSave(t);
  await sleep(2000);
}
console.log('listo');
