// Hero image optimization script (Day 6 — Module 2 performance fix).
// The 3 homepage carousel images were still uncompressed PNGs (~6.2 MB total),
// which made the hero banner take several seconds to load. This resizes them to
// a web-friendly width and re-encodes them as WebP (far smaller for photos),
// writing hero-1.webp / hero-2.webp / hero-3.webp next to the originals.
// Originals are backed up in .image-backup/hero/ (gitignored).
// Run with:  node scripts/optimize-hero.mjs
import sharp from 'sharp'
import path from 'node:path'

const DIR = 'src/assets/hero'
const MAX_WIDTH = 1600
const files = ['hero-1.png', 'hero-2.png', 'hero-3.png']

for (const file of files) {
  const src = path.join(DIR, file)
  const out = path.join(DIR, file.replace(/\.png$/, '.webp'))
  await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(out)
  console.log(`optimized ${file} -> ${path.basename(out)}`)
}

console.log('Done.')
