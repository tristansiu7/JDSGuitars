// Generates public/og.png, the default social preview image (1200 x 630),
// by rendering a small HTML page in headless Chromium so the site's own
// typeface is used. Re-run after changing the business name or address:
//   npm run og
// Uses the Google Chrome already on the machine, or set CHROMIUM_PATH to a Chromium binary.
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const pub = new URL('../public/', import.meta.url).pathname;
const font = new URL('../node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2', import.meta.url).pathname;
const fontData = readFileSync(font).toString('base64');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Archivo'; src: url(data:font/woff2;base64,${fontData}) format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
html, body { margin: 0; }
body { width: 1200px; height: 630px; background: #edeae4; font-family: Archivo, sans-serif; color: #231a15; position: relative; overflow: hidden; }
.top { position: absolute; inset: 0 0 auto 0; height: 14px; background: #231a15; }
.name { position: absolute; left: 80px; top: 118px; font-size: 118px; font-weight: 800; font-stretch: 125%; letter-spacing: -0.01em; line-height: 1; }
.rule { position: absolute; left: 80px; top: 262px; width: 1040px; height: 4px; background: #231a15; }
.line { position: absolute; left: 80px; top: 300px; font-size: 40px; font-weight: 500; line-height: 1.4; }
.addr { position: absolute; left: 80px; top: 462px; font-size: 32px; color: #5e4330; }
.brass { position: absolute; left: 80px; top: 540px; width: 160px; height: 10px; background: #b9902f; }
</style></head><body>
<div class="top"></div>
<div class="name">JDS GUITARS</div>
<div class="rule"></div>
<div class="line">Set-up, ready-to-play guitars.<br>Repairs, setups and rentals.</div>
<div class="addr">61 North Shore Rd., Derry, NH 03038</div>
<div class="brass"></div>
</body></html>`;

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : { channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: `${pub}og.png`, type: 'png' });
await browser.close();
console.log('wrote public/og.png');
