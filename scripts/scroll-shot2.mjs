import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1800 });
await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 2000));
await page.evaluate(() => {
  document.querySelectorAll('h2').forEach(h => {
    if (h.textContent.includes('flota europea') || h.textContent.includes('european fleet')) {
      h.scrollIntoView({ block: 'start' });
    }
  });
  window.scrollBy(0, -120);
});
await new Promise(r => setTimeout(r, 2500));
await page.screenshot({ path: './shots/brand-cards-zoom.png' });
await browser.close();
console.log('ok');
