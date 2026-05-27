import puppeteer from 'puppeteer';

const url = process.argv[2] || 'http://localhost:3000/';
const out = process.argv[3] || './home.png';
const viewport = (process.argv[4] || '1440x900').split('x').map(Number);
const fullPage = process.argv[5] !== 'viewport';

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: viewport[0], height: viewport[1], deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.evaluate(() => document.fonts.ready);

if (fullPage) {
  // Scroll through page so lazy images load
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      const distance = 600;
      const delay = 120;
      const step = () => {
        window.scrollBy(0, distance);
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 1) {
          resolve();
        } else {
          setTimeout(step, delay);
        }
      };
      step();
    });
  });
  await new Promise((r) => setTimeout(r, 1500));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 800));
}

await new Promise((r) => setTimeout(r, 2000));
await page.screenshot({ path: out, fullPage });
await browser.close();
console.log('ok ' + out);
