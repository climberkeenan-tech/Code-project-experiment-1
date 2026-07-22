/**
 * Verify ship-load retry: fail one hull's GLB on the FIRST request, allow it
 * afterwards, and confirm the retry recovers it (no permanent procedural
 * fallback). node repro-ship.mjs <url> <ship>
 */
import { chromium } from 'playwright-core';

const url = process.argv[2] ?? 'http://localhost:5173/';
const ship = process.argv[3] ?? 'nighthawk';

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage({ viewport: { width: 500, height: 300 } });
page.setDefaultTimeout(120000);

const logs = [];
page.on('console', (m) => logs.push(m.text()));

let reqs = 0;
await page.route(`**/${ship}.glb`, async (route) => {
  reqs++;
  if (reqs === 1) { await route.abort('failed'); } // transient failure on first try
  else { await route.continue(); }
});

await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(10000); // model gate + one retry backoff

const permanentFail = logs.some((l) => l.includes(`${ship}`) && l.includes('failed after'));
console.log(`ship=${ship} requests=${reqs} permanentFailWarning=${permanentFail}`);
console.log(reqs >= 2 && !permanentFail ? 'RESULT: PASS (retry recovered the hull)' : 'RESULT: FAIL');
await browser.close();
