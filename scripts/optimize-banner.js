#!/usr/bin/env node
/**
 * Usage:
 *   node scripts/optimize-banner.js <input-image> [--slug <name>] [--max-kb 300]
 *
 * Output: public/static/images/banner-<slug>.png
 *
 * If the image is still over the limit at 1200x630, dimensions are reduced
 * proportionally (steps: 1200, 1000, 800, 600) until it fits.
 */

const path = require('path')
const fs = require('fs')
const sharp = require('sharp')

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'static', 'images')
const TARGET_W = 1200
const TARGET_H = 630
const DIMENSION_STEPS = [1200, 1000, 800, 600]

function parseArgs(argv) {
  const args = { input: null, slug: null, maxKb: 300 }
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--slug') args.slug = argv[++i]
    else if (argv[i] === '--max-kb') args.maxKb = parseInt(argv[++i], 10)
    else if (!argv[i].startsWith('--')) args.input = argv[i]
  }
  return args
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[áàãâä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[íìîï]/g, 'i')
    .replace(/[óòõôö]/g, 'o')
    .replace(/[úùûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function tryDimensions(inputPath, outputPath, width, maxBytes) {
  const height = Math.round((width / TARGET_W) * TARGET_H)
  const buf = await sharp(inputPath)
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 9, quality: 80 })
    .toBuffer()

  if (buf.length <= maxBytes || width <= DIMENSION_STEPS[DIMENSION_STEPS.length - 1]) {
    fs.writeFileSync(outputPath, buf)
    return { width, height, size: buf.length }
  }
  return null
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (!args.input) {
    console.error(
      'Usage: node scripts/optimize-banner.js <input-image> [--slug <name>] [--max-kb 300]'
    )
    process.exit(1)
  }

  const inputPath = path.resolve(args.input)
  if (!fs.existsSync(inputPath)) {
    console.error('Input file not found:', inputPath)
    process.exit(1)
  }

  const slug = args.slug || slugify(path.basename(inputPath, path.extname(inputPath)))
  const outputName = `banner-${slug}.png`
  const outputPath = path.join(IMAGES_DIR, outputName)
  const maxBytes = args.maxKb * 1024

  let result = null
  for (const w of DIMENSION_STEPS) {
    result = await tryDimensions(inputPath, outputPath, w, maxBytes)
    if (result) break
  }

  const kb = Math.round(result.size / 1024)
  const warn = result.width < TARGET_W ? ` (reduced from ${TARGET_W}px — original too large)` : ''
  console.log(`✓ ${outputName}`)
  console.log(`  ${result.width}×${result.height}px · ${kb} kb${warn}`)
  console.log(`  /static/images/${outputName}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
