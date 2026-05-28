// Descarga una foto de Range Rover desde Wikimedia
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEST = path.resolve(__dirname, '..', 'public', 'cars');
await mkdir(DEST, { recursive: true });

const HEADERS = { 'User-Agent': 'FreyAutopartsBuild/1.0' };
const queries = ['Range Rover Sport SUV', 'Land Rover Discovery silver', 'Range Rover Evoque white'];

async function searchAndSave() {
  for (const q of queries) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(q + ' filetype:bitmap')}&gsrlimit=10&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1600&format=json&origin=*`;
    const r = await fetch(url, { headers: HEADERS });
    if (!r.ok) { console.log(`search ${r.status}`); continue; }
    const data = await r.json();
    const pages = Object.values(data.query?.pages || {}).sort((a, b) => (a.index || 0) - (b.index || 0));
    for (const p of pages) {
      const info = p.imageinfo?.[0];
      if (!info || !/image\/(jpeg|png)/.test(info.mime || '')) continue;
      const w = info.width || 0, h = info.height || 0;
      const ratio = w / h;
      if (Math.max(w, h) < 600 || ratio < 1.1 || ratio > 2.4) continue;
      await new Promise((r) => setTimeout(r, 1500));
      const dl = await fetch(info.thumburl || info.url, { headers: HEADERS });
      if (!dl.ok) continue;
      const buf = Buffer.from(await dl.arrayBuffer());
      await sharp(buf)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .resize({ width: 1400, withoutEnlargement: true })
        .webp({ quality: 88, effort: 5 })
        .toFile(path.join(DEST, 'landrover.webp'));
      console.log(`saved from ${p.title} (${w}x${h})`);
      return true;
    }
  }
  return false;
}

const ok = await searchAndSave();
if (!ok) console.log('no encontrado, fallback necesario');
