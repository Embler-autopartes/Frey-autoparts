import puppeteer from 'puppeteer';

const pages = [
  ['/', 'home'],
  ['/catalogo', 'catalogo'],
  ['/aplicacion', 'aplicacion'],
  ['/cotizacion', 'cotizacion'],
  ['/acerca', 'acerca'],
  ['/contacto', 'contacto'],
  ['/politicas', 'politicas'],
  ['/descargas', 'descargas'],
];

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

for (const [route, slug] of pages) {
  try {
    await page.goto('http://localhost:3001' + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 1500));
    // Force load all images
    await page.evaluate(async () => {
      document.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
      await new Promise(resolve => {
        let dist = 0;
        const step = () => {
          window.scrollBy(0, 1000);
          dist += 1000;
          if (dist > document.body.scrollHeight + 500) return resolve();
          setTimeout(step, 150);
        };
        step();
      });
      window.scrollTo(0, 0);
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: `./shots/audit-${slug}.png`, fullPage: true });
    console.log('  ' + route + ' -> audit-' + slug + '.png');
  } catch (e) {
    console.error('  ' + route + ' FAIL: ' + e.message);
  }
}
await browser.close();
console.log('listo');
