// Extrae imagenes embebidas de los catalogos PDF a /originals/pdf-extracted/<catalog>/
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'public', 'catalogos');
const DEST_ROOT = path.resolve(__dirname, '..', 'originals', 'pdf-extracted');

// Slug map para nombres legibles
const slugMap = {
  'BENZ CATALOGUE.pdf': 'mb',
  'BMW CATALOGUE 2017-10-12.pdf': 'bmw',
  'Catalogue for MB Sprinter 901-906 spare parts update on 12th,JAN,2018.pdf': 'sprinter-jan',
  'Catalogue for MB Sprinter 901-906 spare parts update on 12th.pdf': 'sprinter-base',
};

const MIN_SIZE = 240; // px minimo en lado mayor (descarta logos/iconos chicos)
const MIN_BYTES_AFTER_WEBP = 3000; // descarta thumbnails minusculos
const MAX_PAGES = 200; // limite seguro

async function extractFromPdf(pdfPath, slug) {
  const destDir = path.join(DEST_ROOT, slug);
  await mkdir(destDir, { recursive: true });

  const data = new Uint8Array(await readFile(pdfPath));
  const loadingTask = pdfjsLib.getDocument({
    data,
    disableFontFace: true,
    isEvalSupported: false,
    useSystemFonts: false,
  });
  const pdf = await loadingTask.promise;
  const pageCount = Math.min(pdf.numPages, MAX_PAGES);

  let saved = 0;
  let seen = 0;
  const hashes = new Set();

  for (let p = 1; p <= pageCount; p++) {
    let page;
    try {
      page = await pdf.getPage(p);
    } catch (e) {
      console.warn(`  pagina ${p}: error ${e.message}`);
      continue;
    }
    const ops = await page.getOperatorList();
    const OPS = pdfjsLib.OPS;

    for (let i = 0; i < ops.fnArray.length; i++) {
      const op = ops.fnArray[i];
      if (op !== OPS.paintImageXObject && op !== OPS.paintInlineImageXObject) continue;

      const args = ops.argsArray[i];
      const name = args[0];
      let img;
      try {
        if (op === OPS.paintImageXObject) {
          img = await new Promise((resolve, reject) => {
            try {
              page.objs.get(name, (obj) => {
                if (!obj) reject(new Error('no image obj'));
                else resolve(obj);
              });
            } catch (e) {
              reject(e);
            }
          });
        } else {
          // inline image - args[0] is the image dict
          img = args[0];
        }
      } catch {
        continue;
      }

      if (!img || !img.width || !img.height) continue;
      seen++;
      if (Math.max(img.width, img.height) < MIN_SIZE) continue;

      // Build PNG buffer from pixel data
      const buf = await imageToPng(img);
      if (!buf) continue;

      // Convert to WebP, get size
      const webp = await sharp(buf).webp({ quality: 80, effort: 5 }).toBuffer();
      if (webp.byteLength < MIN_BYTES_AFTER_WEBP) continue;

      // De-dupe by content hash (first 64 bytes)
      const sig = Buffer.from(webp.slice(0, 64)).toString('hex');
      if (hashes.has(sig)) continue;
      hashes.add(sig);

      saved++;
      const outName = `p${String(p).padStart(3, '0')}-${String(saved).padStart(3, '0')}-${img.width}x${img.height}.webp`;
      await sharp(buf).webp({ quality: 80, effort: 5 }).toFile(path.join(destDir, outName));
    }

    if (p % 10 === 0) process.stdout.write('.');
  }
  console.log(`\n  ${slug}: ${saved} imagenes guardadas (de ${seen} encontradas)`);
}

async function imageToPng(img) {
  const { width, height, data, kind } = img;
  // pdfjs ImageKind: GRAYSCALE_1BPP=1, RGB_24BPP=2, RGBA_32BPP=3
  let raw, channels;
  if (kind === 3 /* RGBA */) {
    raw = Buffer.from(data);
    channels = 4;
  } else if (kind === 2 /* RGB */) {
    raw = Buffer.from(data);
    channels = 3;
  } else {
    // Grayscale or unknown — try as RGB if size matches
    const rgbExpected = width * height * 3;
    const rgbaExpected = width * height * 4;
    if (data.length === rgbaExpected) {
      raw = Buffer.from(data);
      channels = 4;
    } else if (data.length === rgbExpected) {
      raw = Buffer.from(data);
      channels = 3;
    } else {
      return null;
    }
  }

  try {
    return await sharp(raw, { raw: { width, height, channels } })
      .png()
      .toBuffer();
  } catch {
    return null;
  }
}

async function main() {
  await mkdir(DEST_ROOT, { recursive: true });
  console.log(`Extrayendo imagenes de PDFs en ${SRC}\n`);
  for (const [file, slug] of Object.entries(slugMap)) {
    const pdfPath = path.join(SRC, file);
    console.log(`▶ ${file}`);
    try {
      await extractFromPdf(pdfPath, slug);
    } catch (e) {
      console.error(`  ! error: ${e.message}`);
    }
  }
  console.log('\n[extract-pdf-images] listo. Revisa originals/pdf-extracted/');
}

main().catch((e) => { console.error(e); process.exit(1); });
