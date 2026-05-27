// Acepta argumento: nombre del PDF en public/catalogos
// Uso: node scripts/extract-pdf-images-single.mjs "BMW CATALOGUE 2017-10-12.pdf" bmw
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'public', 'catalogos');
const DEST_ROOT = path.resolve(__dirname, '..', 'originals', 'pdf-extracted');

const pdfFile = process.argv[2];
const slug = process.argv[3] || path.parse(pdfFile).name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
if (!pdfFile) {
  console.error('Uso: node scripts/extract-pdf-images-single.mjs "<pdf>" <slug>');
  process.exit(1);
}

const MIN_SIZE = 240;
const MIN_BYTES_AFTER_WEBP = 3000;
const MAX_PAGES = 400;

const destDir = path.join(DEST_ROOT, slug);
await mkdir(destDir, { recursive: true });
const pdfPath = path.join(SRC, pdfFile);
console.log(`Leyendo ${pdfPath}`);

const data = new Uint8Array(await readFile(pdfPath));
const pdf = await pdfjsLib.getDocument({
  data,
  disableFontFace: true,
  isEvalSupported: false,
  useSystemFonts: false,
}).promise;
const pageCount = Math.min(pdf.numPages, MAX_PAGES);
console.log(`Paginas: ${pageCount}`);

let saved = 0;
let seen = 0;
const hashes = new Set();

for (let p = 1; p <= pageCount; p++) {
  let page;
  try {
    page = await pdf.getPage(p);
  } catch (e) {
    console.warn(`  pag ${p}: error ${e.message}`);
    continue;
  }
  let ops;
  try {
    ops = await page.getOperatorList();
  } catch (e) {
    console.warn(`  pag ${p}: opList ${e.message}`);
    continue;
  }
  const OPS = pdfjsLib.OPS;

  for (let i = 0; i < ops.fnArray.length; i++) {
    const op = ops.fnArray[i];
    if (op !== OPS.paintImageXObject && op !== OPS.paintInlineImageXObject) continue;
    const args = ops.argsArray[i];
    let img;
    try {
      if (op === OPS.paintImageXObject) {
        const name = args[0];
        img = await new Promise((resolve) => {
          try { page.objs.get(name, (obj) => resolve(obj)); } catch { resolve(null); }
        });
      } else {
        img = args[0];
      }
    } catch { continue; }
    if (!img || !img.width || !img.height) continue;
    seen++;
    if (Math.max(img.width, img.height) < MIN_SIZE) continue;
    const buf = await imageToPng(img);
    if (!buf) continue;
    let webp;
    try { webp = await sharp(buf).webp({ quality: 80, effort: 5 }).toBuffer(); } catch { continue; }
    if (webp.byteLength < MIN_BYTES_AFTER_WEBP) continue;
    const sig = Buffer.from(webp.slice(0, 64)).toString('hex');
    if (hashes.has(sig)) continue;
    hashes.add(sig);
    saved++;
    const outName = `p${String(p).padStart(3, '0')}-${String(saved).padStart(3, '0')}-${img.width}x${img.height}.webp`;
    await sharp(buf).webp({ quality: 80, effort: 5 }).toFile(path.join(destDir, outName));
  }
  if (p % 10 === 0) process.stdout.write('.');
}
console.log(`\n${slug}: ${saved} imagenes guardadas (de ${seen} encontradas)`);

async function imageToPng(img) {
  const { width, height, data, kind } = img;
  let channels;
  if (kind === 3) channels = 4;
  else if (kind === 2) channels = 3;
  else {
    if (data.length === width * height * 4) channels = 4;
    else if (data.length === width * height * 3) channels = 3;
    else if (data.length === width * height) channels = 1;
    else return null;
  }
  try {
    return await sharp(Buffer.from(data), { raw: { width, height, channels } }).png().toBuffer();
  } catch { return null; }
}
