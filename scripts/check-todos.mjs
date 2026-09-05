// Fails if any built page still contains a TODO marker.
// Run after `npm run build`: `npm run check:todos`.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(html|xml|txt|json|webmanifest)$/.test(name)) {
      const text = readFileSync(full, 'utf8');
      const matches = text.match(/TODO[:\- ][^<"]{0,80}/g);
      if (matches) hits.push({ file: full.replace(dist, ''), matches: [...new Set(matches)] });
    }
  }
}

try {
  walk(dist);
} catch {
  console.error('No dist/ folder. Run `npm run build` first.');
  process.exit(2);
}

if (hits.length === 0) {
  console.log('No TODO markers in the built site.');
  process.exit(0);
}
console.error(`TODO markers found in ${hits.length} built file(s). Do not launch until these are resolved.\n`);
for (const { file, matches } of hits) {
  console.error(`  ${file}`);
  for (const m of matches) console.error(`      ${m.trim()}`);
}
process.exit(1);
