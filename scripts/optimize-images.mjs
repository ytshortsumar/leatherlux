// One-off image optimization script for Day 4 (Polish & Performance).
// Resizes product images to a web-friendly width and re-encodes them,
// overwriting the originals in place (backups are in .image-backup/).
// Run with:  node scripts/optimize-images.mjs
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const DIR = 'public/products'
const MAX_WIDTH = 800

const files = (await readdir(DIR)).filter((f) => f.toLowerCase().endsWith('.png'))

for (const file of files) {
  const filePath = path.join(DIR, file)
  const buffer = await sharp(filePath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .png({ quality: 80, compressionLevel: 9 })
    .toBuffer()
  await sharp(buffer).toFile(filePath)
  console.log(`optimized ${file}`)
}

console.log('Done.')
