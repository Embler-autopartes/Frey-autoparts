// Quita el fondo blanco/gris claro de las fotos de auto con chroma key por luminancia.
// Conserva la sombra sutil bajo el auto.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.resolve(ROOT, '..', 'fotos frey landing');
const DEST = path.resolve(ROOT, 'public', 'cars');

const MAP = {
  'Mercedes-Benz C-Class.png': 'mercedes.webp',
  'BMW 4 Series Coupé.png':    'bmw.webp',
  'Range Rover Sport.png':     'landrover.webp',
  'MB Sprinter LCV.png':       'sprinter.webp',
};

// Background neutro claro (RGB ~ 235, saturacion baja) -> transparente
// Pixels saturados o oscuros (auto + sombra) -> opacos
// Transicion suave para evitar halo
const UPPER = 220;   // por encima de esto -> totalmente transparente (si neutro)
const LOWER = 195;   // por debajo de esto -> completamente opaco
const MAX_SAT = 14;  // diferencia max entre R G B para considerar neutro

async function deKey(srcPath, destPath) {
  const img = sharp(srcPath).ensureAlpha();
  const { data, info } = await img
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = info.width * info.height;
  let kept = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    const isNeutral = sat <= MAX_SAT;

    if (isNeutral && lum >= UPPER) {
      data[i + 3] = 0;
    } else if (isNeutral && lum > LOWER) {
      // Transicion suave
      const t = (UPPER - lum) / (UPPER - LOWER);
      data[i + 3] = Math.round(255 * t);
    } else {
      // Opaco
      kept++;
    }
  }

  // Aplica un leve feather morphologic + redimensiona
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 95, effort: 6 })
    .toFile(destPath);

  return { kept, total: px };
}

await mkdir(DEST, { recursive: true });

for (const [srcName, destName] of Object.entries(MAP)) {
  const srcPath = path.join(SRC, srcName);
  const destPath = path.join(DEST, destName);
  const { kept, total } = await deKey(srcPath, destPath);
  console.log(`  ${srcName.padEnd(28)} -> ${destName.padEnd(18)} (${Math.round((kept/total)*100)}% opaco)`);
}
console.log('listo');
