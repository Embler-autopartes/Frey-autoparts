// Busca y descarga UNA foto representativa por cada sistema desde Wikimedia Commons
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEST = path.resolve(__dirname, '..', 'public', 'systems');
await mkdir(DEST, { recursive: true });

// Query map: system -> search term y restricciones
const SYSTEMS = [
  { id: 'brakes',       q: 'brake disc rotor',          minSide: 700 },
  { id: 'engine',       q: 'BMW engine block close',    minSide: 700 },
  { id: 'suspension',   q: 'shock absorber automotive', minSide: 500 },
  { id: 'transmission', q: 'manual gearbox transmission', minSide: 500 },
  { id: 'electric',     q: 'mass air flow sensor',      minSide: 400 },
  { id: 'filtration',   q: 'engine oil filter cutaway', minSide: 400 },
  { id: 'cooling',      q: 'aluminum radiator core',    minSide: 600 },
  { id: 'body',         q: 'car wing mirror chrome',    minSide: 500 },
];

const HEADERS = {
  'User-Agent': 'FreyAutopartsBuild/1.0 (build-time asset fetch)',
};

async function searchWikimedia(query, minSide) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query + ' filetype:bitmap')}&gsrlimit=15&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1600&format=json&origin=*`;
  const r = await fetch(url, { headers: HEADERS });
  if (!r.ok) throw new Error(`wikimedia search ${r.status}`);
  const data = await r.json();
  const pages = Object.values(data.query?.pages || {});
  // Sort by index from search ranking (gsrindex)
  pages.sort((a, b) => (a.index || 0) - (b.index || 0));
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (!info) continue;
    if (!/image\/(jpeg|png|webp)/.test(info.mime || '')) continue;
    const w = info.width || 0, h = info.height || 0;
    if (Math.max(w, h) < minSide) continue;
    // Prefer landscape-ish or square (avoid portrait artwork)
    return { url: info.thumburl || info.url, title: p.title, page: `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title)}`, w, h };
  }
  return null;
}

async function downloadAndSave(url, id) {
  const r = await fetch(url, { headers: HEADERS });
  if (!r.ok) throw new Error(`download ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  const dest = path.join(DEST, `${id}.webp`);
  await sharp(buf)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(dest);
  return dest;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = {};
for (const sys of SYSTEMS) {
  process.stdout.write(`▶ ${sys.id.padEnd(13)} `);
  let attempts = 0;
  let ok = false;
  while (attempts < 3 && !ok) {
    try {
      const found = await searchWikimedia(sys.q, sys.minSide);
      if (!found) { console.log('no match'); results[sys.id] = null; ok = true; break; }
      await sleep(1200);
      await downloadAndSave(found.url, sys.id);
      console.log(`-> ${path.basename(found.title)} (${found.w}x${found.h})`);
      results[sys.id] = { title: found.title, page: found.page };
      ok = true;
    } catch (e) {
      attempts++;
      if (attempts < 3) {
        process.stdout.write(`(retry ${attempts} after ${e.message}) `);
        await sleep(2500 * attempts);
      } else {
        console.log(`! ${e.message}`);
        results[sys.id] = null;
      }
    }
  }
  await sleep(1800);
}

await writeFile(
  path.join(DEST, '_credits.json'),
  JSON.stringify(results, null, 2),
);
console.log('\nlisto: public/systems/ + _credits.json');
