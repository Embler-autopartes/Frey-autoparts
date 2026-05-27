// Retry para sistemas que fallaron o quedaron con foto poco representativa
import { writeFile, readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEST = path.resolve(__dirname, '..', 'public', 'systems');
await mkdir(DEST, { recursive: true });

const SYSTEMS = [
  { id: 'cooling',     q: 'car radiator vehicle cooling component', minSide: 400 },
  { id: 'suspension',  q: 'coil spring suspension car', minSide: 400 },
  { id: 'transmission', q: 'flywheel clutch car', minSide: 400 },
];

const HEADERS = { 'User-Agent': 'FreyAutopartsBuild/1.0' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function searchAndDownload(sys) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(sys.q + ' filetype:bitmap')}&gsrlimit=15&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1600&format=json&origin=*`;
  const r = await fetch(url, { headers: HEADERS });
  if (!r.ok) throw new Error(`search ${r.status}`);
  const data = await r.json();
  const pages = Object.values(data.query?.pages || {}).sort((a, b) => (a.index || 0) - (b.index || 0));
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (!info || !/image\/(jpeg|png|webp)/.test(info.mime || '')) continue;
    const w = info.width || 0, h = info.height || 0;
    if (Math.max(w, h) < sys.minSide) continue;
    const ratio = w / h;
    if (ratio < 0.35 || ratio > 3) continue;
    await sleep(2000);
    const dl = await fetch(info.thumburl || info.url, { headers: HEADERS });
    if (!dl.ok) {
      if (dl.status === 429) { await sleep(4000); continue; }
      throw new Error(`dl ${dl.status}`);
    }
    const buf = Buffer.from(await dl.arrayBuffer());
    await sharp(buf)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(path.join(DEST, `${sys.id}.webp`));
    return { title: p.title, page: `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title)}`, w, h };
  }
  return null;
}

let credits = {};
try { credits = JSON.parse(await readFile(path.join(DEST, '_credits.json'), 'utf8')); } catch {}

for (const sys of SYSTEMS) {
  process.stdout.write(`▶ ${sys.id.padEnd(12)} `);
  try {
    const res = await searchAndDownload(sys);
    if (res) {
      console.log(`-> ${path.basename(res.title)} (${res.w}x${res.h})`);
      credits[sys.id] = { title: res.title, page: res.page };
    } else {
      console.log('no candidate');
    }
  } catch (e) {
    console.log(`! ${e.message}`);
  }
  await sleep(3500);
}

await writeFile(path.join(DEST, '_credits.json'), JSON.stringify(credits, null, 2));
console.log('listo');
