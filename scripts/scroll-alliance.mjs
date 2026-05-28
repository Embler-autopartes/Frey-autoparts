import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 2000));
await page.evaluate(() => {
  document.querySelectorAll('h2,p').forEach(el => {
    if (el.textContent.includes('Alianza') || el.textContent.includes('alliance')) {
      el.scrollIntoView({ block: 'start' });
    }
  });
  window.scrollBy(0, -120);
});
await new Promise(r => setTimeout(r, 2500));
await page.screenshot({ path: './shots/alliance-zoom.png' });
await browser.close();
console.log('ok');
