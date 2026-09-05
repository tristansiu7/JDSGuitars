// Generates the favicon set from public/favicon.svg.
// Run only after the mark has been approved: `npm run icons`.
// Produces: favicon.ico (32px), apple-touch-icon.png (180px),
// icon-192.png, icon-512.png, and updates site.webmanifest.
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const pub = new URL('../public/', import.meta.url).pathname;
const svg = readFileSync(`${pub}favicon.svg`);

async function png(size, name) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(`${pub}${name}`);
  console.log(`wrote ${name}`);
}

// Apple touch icons get no transparency and a little padding.
await sharp(svg, { density: 384 }).resize(180, 180).flatten({ background: '#231a15' }).png().toFile(`${pub}apple-touch-icon.png`);
console.log('wrote apple-touch-icon.png');
await png(192, 'icon-192.png');
await png(512, 'icon-512.png');

// ICO: a single 32px BMP-less PNG-in-ICO container, which every current browser reads.
const png32 = await sharp(svg, { density: 384 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // count
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0); // width
entry.writeUInt8(32, 1); // height
entry.writeUInt8(0, 2); // palette
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // planes
entry.writeUInt16LE(32, 6); // bit depth
entry.writeUInt32LE(png32.length, 8); // size
entry.writeUInt32LE(22, 12); // offset
writeFileSync(`${pub}favicon.ico`, Buffer.concat([header, entry, png32]));
console.log('wrote favicon.ico');

const manifest = JSON.parse(readFileSync(`${pub}site.webmanifest`, 'utf8'));
manifest.icons = [
  { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
  { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
  { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
];
writeFileSync(`${pub}site.webmanifest`, JSON.stringify(manifest, null, 2) + '\n');
console.log('updated site.webmanifest');
