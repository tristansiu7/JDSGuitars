// Checks the built output against the hard prohibitions in the brief.
// Run after `npm run build`: `npm run check:prohibitions`.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const problems = [];

const checks = [
  { name: 'Em dash', re: /—/g, types: /\.html$/ },
  { name: 'Emoji', re: /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]/gu, types: /\.html$/ },
  { name: 'Generator meta tag', re: /<meta[^>]+name="generator"/gi, types: /\.html$/ },
  { name: 'Attribution badge', re: /(made|built) with (ai|astro|claude)|powered by/gi, types: /\.html$/ },
  { name: 'Gradient', re: /linear-gradient|radial-gradient|conic-gradient/gi, types: /\.(html|css)$/ },
  { name: 'Backdrop blur (glassmorphism)', re: /backdrop-filter/gi, types: /\.(html|css)$/ },
  { name: 'Pill radius', re: /border-radius:\s*(9999px|999px|100vmax|50%)/gi, types: /\.(html|css)$/ },
  { name: 'Scroll animation', re: /IntersectionObserver|data-aos|scroll-behavior|animation-timeline/g, types: /\.(html|js)$/ },
  { name: 'Purple or violet', re: /#(8b5cf6|a855f7|7c3aed|6d28d9|9333ea|c084fc|d8b4fe|8a2be2|9400d3|ee82ee)/gi, types: /\.(html|css)$/ },
  { name: 'Banned hero copy', re: /elevate your sound|passion meets craftsmanship|journey starts here|sound that moves you/gi, types: /\.html$/ },
  { name: 'Invented social proof', re: /trusted by|testimonial|★|&#9733;|stars? rating|years? in business|happy customers/gi, types: /\.html$/ },
];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else {
      const text = readFileSync(full, 'utf8');
      for (const check of checks) {
        if (!check.types.test(name)) continue;
        const m = text.match(check.re);
        if (m) problems.push(`${check.name}: ${full.replace(dist, '')} (${m.length} hit${m.length === 1 ? '' : 's'}, first: ${JSON.stringify(m[0])})`);
      }
    }
  }
}

try {
  walk(dist);
} catch {
  console.error('No dist/ folder. Run `npm run build` first.');
  process.exit(2);
}

// Every image needs alt text (empty alt is allowed only for decorative images, and we do not use any).
function altCheck(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) altCheck(full);
    else if (name.endsWith('.html')) {
      const text = readFileSync(full, 'utf8');
      const imgs = text.match(/<img\b[^>]*>/g) ?? [];
      for (const img of imgs) {
        if (!/\balt="[^"]+"/.test(img)) problems.push(`Image without alt text: ${full.replace(dist, '')}: ${img.slice(0, 80)}`);
        if (!/\bwidth="\d+"/.test(img) || !/\bheight="\d+"/.test(img)) problems.push(`Image without explicit dimensions: ${full.replace(dist, '')}: ${img.slice(0, 80)}`);
      }
    }
  }
}
altCheck(dist);

if (problems.length === 0) {
  console.log('No prohibited patterns found in the built site.');
  process.exit(0);
}
console.error('Prohibited patterns found:\n');
for (const p of problems) console.error(`  ${p}`);
process.exit(1);
