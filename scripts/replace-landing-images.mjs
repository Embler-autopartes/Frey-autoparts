// Reemplaza imagenes del landing con las nuevas fotos en fotos-frey-landing/
// Preserva originales en /originals/landing/
import sharp from 'sharp';
import { mkdir, copyFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.resolve(ROOT, '..', 'fotos frey landing');
const BACKUP = path.resolve(ROOT, 'originals', 'landing');
await mkdir(BACKUP, { recursive: true });

// Mapeo: filename -> [destino, target_width, quality]
const MAP = {
  'Hero del Home.png':           [['public/hero/hero-main.webp', 2400, 84]],
  'macro técnico.png':           [['public/hero/engine-macro.webp', 1600, 88]],
  'Mercedes-Benz C-Class.png':   [['public/cars/mercedes.webp', 1400, 90]],
  'BMW 4 Series Coupé.png':      [['public/cars/bmw.webp', 1400, 90]],
  'Range Rover Sport.png':       [['public/cars/landrover.webp', 1400, 90]],
  'MB Sprinter LCV.png':         [['public/cars/sprinter.webp', 1400, 90]],
  'Acerca de.png':               [['public/images/warehouse-overview.webp', 2400, 82]],
  'Operación logística.png':     [
    ['public/images/warehouse-corridor.webp', 2400, 82],
    ['public/images/warehouse-forklift.webp', 2400, 82],
  ],
  'Detalle racks.png':           [['public/images/warehouse-racks-wide.webp', 2000, 84]],
};

const files = await readdir(SRC);
console.log(`Procesando ${files.length} archivos en ${SRC}\n`);

for (const file of files) {
  const targets = MAP[file];
  if (!targets) {
    console.log(`  ⊘ ${file} (no mapeado)`);
    continue;
  }

  const srcPath = path.join(SRC, file);

  // Backup original
  await copyFile(srcPath, path.join(BACKUP, file));

  for (const [destRel, width, quality] of targets) {
    const dest = path.join(ROOT, destRel);
    await mkdir(path.dirname(dest), { recursive: true });
    await sharp(srcPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(dest);
    const stats = await sharp(dest).metadata();
    const fs = await import('node:fs/promises');
    const s = await fs.stat(dest);
    console.log(`  ✓ ${file.padEnd(32)} -> ${destRel.padEnd(45)} ${stats.width}x${stats.height} (${Math.round(s.size/1024)}KB)`);
  }
}

console.log('\nlisto');
