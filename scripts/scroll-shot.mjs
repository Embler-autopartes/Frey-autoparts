import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 2000));
// scroll to Categories section
await page.evaluate(() => {
  document.querySelectorAll('section').forEach(s => {
    if (s.textContent.includes('Sistemas que cubrimos') || s.textContent.includes('CATALOGO TECNICO')) {
      s.scrollIntoView({ block: 'start' });
    }
  });
});
await new Promise(r => setTimeout(r, 2500));
await page.screenshot({ path: './shots/categories-zoom.png' });
await browser.close();
console.log('ok');
