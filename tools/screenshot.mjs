/**
 * Headless smoke-test / screenshot harness.
 *
 * Loads the game in headless Chromium, waits, captures console output and a
 * screenshot. Used during development and usable in CI as a render smoke
 * test.
 *
 * Usage:
 *   node tools/screenshot.mjs [url] [outPath] [waitMs] [actionsJson]
 *
 * actionsJson: optional JSON array of {type, ...} steps executed after load:
 *   {type:'tap'}                     — click screen center (dismiss start screen)
 *   {type:'key', code:'KeyW', ms}    — hold a key for ms milliseconds
 *   {type:'wait', ms}                — idle wait
 *   {type:'eval', js}                — run JS in page context
 *   {type:'shot', path}              — intermediate screenshot
 */
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

const url = process.argv[2] ?? 'http://localhost:5173';
const out = process.argv[3] ?? 'screenshot.png';
const waitMs = Number(process.argv[4] ?? 4000);
const actions = process.argv[5] ? JSON.parse(process.argv[5]) : [];

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium',
  args: [
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--no-sandbox',
    '--disable-dev-shm-usage',
  ],
});

const [vw, vh] = (process.env.VIEWPORT ?? '900x500').split('x').map(Number);
const page = await browser.newPage({ viewport: { width: vw, height: vh } });
// Forest scenes push millions of triangles through SwiftShader — frames can
// take seconds each, so give every playwright call generous headroom.
page.setDefaultTimeout(180000);

const logs = [];
page.on('console', (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));
page.on('pageerror', (err) => logs.push(`[pageerror] ${err.message}`));

await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(waitMs);

for (const action of actions) {
  switch (action.type) {
    case 'tap':
      await page.mouse.click(450, 250);
      break;
    case 'key':
      await page.keyboard.down(action.code);
      await page.waitForTimeout(action.ms ?? 500);
      await page.keyboard.up(action.code);
      break;
    case 'wait':
      await page.waitForTimeout(action.ms ?? 1000);
      break;
    case 'eval':
      await page.evaluate(action.js);
      break;
    case 'evalFile':
      await page.evaluate(readFileSync(action.path, 'utf8'));
      break;
    case 'shot':
      await page.screenshot({ path: action.path });
      break;
    default:
      throw new Error(`unknown action: ${action.type}`);
  }
}

await page.screenshot({ path: out });
await browser.close();

console.log(`--- console output (${logs.length} lines) ---`);
for (const line of logs.slice(0, 80)) console.log(line);
console.log(`--- screenshot saved to ${out} ---`);
