import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1100 });
await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 2500));
await page.evaluate(() => {
  document.querySelectorAll('h2,p').forEach(el => {
    if (el.textContent.includes('flota europea') || el.textContent.includes('European fleet')) {
      el.scrollIntoView({ block: 'start' });
    }
  });
  window.scrollBy(0, -120);
});
await new Promise(r => setTimeout(r, 2500));
await page.screenshot({ path: './shots/brands-fixed.png' });
await browser.close();
console.log('ok');
