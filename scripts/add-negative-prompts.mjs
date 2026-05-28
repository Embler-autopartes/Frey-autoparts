// Hace cada prompt del IMAGE-PROMPTS.md autocontenido agregando
// el NEGATIVE PROMPT block al final de cada bloque ``` que termina
// con "Aspect ratio X. Resolution Y."
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.resolve(__dirname, '..', 'IMAGE-PROMPTS.md');

const NEGATIVE_BLOCK = `
NEGATIVE PROMPT: text, typography, lettering, watermark, signature,
brand logo, manufacturer badge, FREY logo, trademarks, license plate,
billboards, signage, captions, subtitles, written words, numbers.
Strictly clean, completely logo-free composition.`;

let content = await readFile(FILE, 'utf8');

// Patron: linea que comienza con "Aspect ratio" seguida de fin de prompt block (```)
// Solo inserta si el NEGATIVE PROMPT no esta ya presente en el bloque inmediato
const lines = content.split(/\r?\n/);
const result = [];
let inCodeBlock = false;
let codeBlockBuffer = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line === '```' && !inCodeBlock) {
    // Inicio de bloque
    inCodeBlock = true;
    codeBlockBuffer = [line];
  } else if (line === '```' && inCodeBlock) {
    // Fin de bloque - revisar si necesita inyectar NEGATIVE PROMPT
    const blockText = codeBlockBuffer.join('\n');
    const hasAspectRatio = /Aspect ratio\s+\S+/i.test(blockText);
    const alreadyHasNegative = /NEGATIVE PROMPT/i.test(blockText);

    if (hasAspectRatio && !alreadyHasNegative) {
      // Push existing buffer + negative block + close
      result.push(...codeBlockBuffer);
      result.push(NEGATIVE_BLOCK.trim());
    } else {
      // No tocar, ya tiene o no aplica
      result.push(...codeBlockBuffer);
    }
    result.push(line);
    inCodeBlock = false;
    codeBlockBuffer = [];
  } else if (inCodeBlock) {
    codeBlockBuffer.push(line);
  } else {
    result.push(line);
  }
}

await writeFile(FILE, result.join('\n'));
console.log('listo: ' + FILE);
