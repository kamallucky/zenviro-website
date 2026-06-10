import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const OUT = 'review-shots';
mkdirSync(OUT, { recursive: true });
const BASE = 'http://localhost:5173';

const browser = await chromium.launch();

async function shot(name, path, { width = 1440, height = 900, dark = false, fullPage = false, scrollTo = null } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  if (dark) {
    await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  } else {
    await page.addInitScript(() => localStorage.setItem('theme', 'light'));
  }
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200); // let reveal animations finish
  if (scrollTo !== null) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollTo);
    await page.waitForTimeout(1600);
  }
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage });
  await ctx.close();
  console.log('done:', name);
}

// Light mode — key pages, above the fold
await shot('01-home-hero', '/');
await shot('02-home-mid', '/', { scrollTo: 1600 });
await shot('03-home-lower', '/', { scrollTo: 3400 });
await shot('04-products', '/products');
await shot('05-product-detail', '/products/titanic');
await shot('06-pricing', '/pricing');
await shot('07-contact', '/contact');

// Dark mode
await shot('08-home-hero-dark', '/', { dark: true });
await shot('09-home-mid-dark', '/', { dark: true, scrollTo: 1600 });
await shot('10-products-dark', '/products', { dark: true });
await shot('11-pricing-dark', '/pricing', { dark: true });

// Mobile
await shot('12-home-mobile', '/', { width: 390, height: 844 });
await shot('13-products-mobile', '/products', { width: 390, height: 844 });

await browser.close();
console.log('all done');
