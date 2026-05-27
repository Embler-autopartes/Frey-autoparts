// Optimiza imagenes de /originals a /public/images en WebP <500KB
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'originals');
const DEST = path.resolve(__dirname, '..', 'public', 'images');

// Mapping de nombres originales a slugs legibles
const slugMap = {
  '1.png': 'warehouse-aerial',
  '2Q4A8240.jpg': 'product-hand-pump',
  '3-MAIN 主背景板5.4x2m.jpg': 'banner-frey-embler',
  'about frey company (2).png': 'about-warehouse-interior',
  'shanghai fair.jpg': 'shanghai-fair-booth',
  'warehouse1 (2).jpg': 'warehouse-corridor',
  'ZWY05608.jpg': 'warehouse-forklift',
  'ZWY05669.jpg': 'warehouse-racks-wide',
  'ZWY06098.jpg': 'warehouse-aisle-wide',
  'ZWY06138.jpg': 'warehouse-overview',
};

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function optimize(src, destBase, options = {}) {
  const { maxWidth = 2400, quality = 78 } = options;
  const meta = await sharp(src).metadata();
  const targetWidth = Math.min(meta.width || maxWidth, maxWidth);

  // Genera 2 versiones: full y thumb
  const full = `${destBase}.webp`;
  const thumb = `${destBase}-thumb.webp`;

  await sharp(src)
    .rotate()
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(full);

  await sharp(src)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(thumb);

  const fullStat = await stat(full);
  const thumbStat = await stat(thumb);
  return { full, thumb, fullKB: Math.round(fullStat.size / 1024), thumbKB: Math.round(thumbStat.size / 1024) };
}

async function main() {
  await ensureDir(DEST);
  const files = await readdir(SRC);
  console.log(`\n[optimize-images] ${files.length} archivos en ${SRC}\n`);

  for (const file of files) {
    if (!/\.(jpe?g|png)$/i.test(file)) continue;
    const slug = slugMap[file] || file.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const srcPath = path.join(SRC, file);
    const destBase = path.join(DEST, slug);
    try {
      const { fullKB, thumbKB } = await optimize(srcPath, destBase);
      console.log(`  ${file.padEnd(45)} -> ${slug}.webp (${fullKB}KB) + thumb (${thumbKB}KB)`);
    } catch (err) {
      console.error(`  ! ${file}: ${err.message}`);
    }
  }

  // Tambien optimiza el logo a SVG-like (mantener JPG original pero crear webp)
  const logoSrc = path.resolve(__dirname, '..', 'public', 'logo.jpg');
  try {
    await sharp(logoSrc)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 92, effort: 6 })
      .toFile(path.resolve(__dirname, '..', 'public', 'logo.webp'));
    console.log(`  logo.jpg                                      -> logo.webp`);
  } catch (err) {
    console.error(`  ! logo: ${err.message}`);
  }

  console.log('\n[optimize-images] listo\n');
}

main().catch((err) => { console.error(err); process.exit(1); });
