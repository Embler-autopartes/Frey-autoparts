import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 2000));
// scroll through everything to load lazy images
await page.evaluate(async () => {
  await new Promise(resolve => {
    let dist = 0;
    const step = () => {
      window.scrollBy(0, 800);
      dist += 800;
      if (dist > document.body.scrollHeight) return resolve();
      setTimeout(step, 200);
    };
    step();
  });
});
// scroll back to alliance
await page.evaluate(() => {
  const headings = Array.from(document.querySelectorAll('h2, p'));
  const heading = headings.find(el => el.textContent.includes('EMBLER') && el.textContent.length < 50);
  if (heading) {
    heading.scrollIntoView({ block: 'start' });
    window.scrollBy(0, -200);
  }
});
await new Promise(r => setTimeout(r, 2500));
// Take screenshot of viewport height x 3 for full section
const sectionRect = await page.evaluate(() => {
  const el = document.querySelector('section.relative.isolate.overflow-hidden.bg-ink-1.py-28');
  if (el) {
    el.scrollIntoView({ block: 'start' });
    window.scrollBy(0, -50);
    return { y: el.getBoundingClientRect().top + window.scrollY, height: el.offsetHeight };
  }
  return null;
});
await new Promise(r => setTimeout(r, 1500));
await page.setViewport({ width: 1440, height: Math.min(2400, sectionRect?.height + 100 || 1800), deviceScaleFactor: 1 });
await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 2000));
await page.evaluate(async () => {
  // Force load all images
  document.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
  await new Promise(resolve => {
    let dist = 0;
    const step = () => {
      window.scrollBy(0, 800);
      dist += 800;
      if (dist > document.body.scrollHeight) return resolve();
      setTimeout(step, 200);
    };
    step();
  });
});
await new Promise(r => setTimeout(r, 1500));
await page.evaluate(() => {
  const headings = Array.from(document.querySelectorAll('h2, p'));
  const heading = headings.find(el => el.textContent.includes('Alianza estratégica') || el.textContent.includes('ALIANZA'));
  if (heading) {
    heading.scrollIntoView({ block: 'start' });
    window.scrollBy(0, -100);
  }
});
await new Promise(r => setTimeout(r, 2000));
await page.screenshot({ path: './shots/alliance-full.png' });
await browser.close();
console.log('ok');
