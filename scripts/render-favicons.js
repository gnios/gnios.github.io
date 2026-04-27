const path = require('path')
const fs = require('fs')
const sharp = require('sharp')

const publicDir = path.join(__dirname, '..', 'public')
const svgSrc = path.join(publicDir, 'favicon.svg')
const favDir = path.join(publicDir, 'static', 'favicons')

const pngTargets = [
  { file: 'favicon-16x16.png', size: 16 },
  { file: 'favicon-32x32.png', size: 32 },
  { file: 'favicon-96x96.png', size: 96 },
  { file: 'favicon-128.png', size: 128 },
  { file: 'favicon-196x196.png', size: 196 },
  { file: 'android-chrome-96x96.png', size: 96 },
  { file: 'apple-touch-icon.png', size: 76 },
  { file: 'apple-touch-icon-57x57.png', size: 57 },
  { file: 'apple-touch-icon-60x60.png', size: 60 },
  { file: 'apple-touch-icon-72x72.png', size: 72 },
  { file: 'apple-touch-icon-76x76.png', size: 76 },
  { file: 'apple-touch-icon-114x114.png', size: 114 },
  { file: 'apple-touch-icon-120x120.png', size: 120 },
  { file: 'apple-touch-icon-144x144.png', size: 144 },
  { file: 'apple-touch-icon-152x152.png', size: 152 },
  { file: 'mstile-70x70.png', size: 70 },
  { file: 'mstile-144x144.png', size: 144 },
  { file: 'mstile-150x150.png', size: 150 },
  { file: 'mstile-310x310.png', size: 310 },
]

async function main() {
  const svg = fs.readFileSync(svgSrc)
  for (const { file, size } of pngTargets) {
    const out = path.join(favDir, file)
    await sharp(svg)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(out)
    console.log(`  ${file}  ${size}x${size}`)
  }

  await sharp(svg)
    .resize(150, 74, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 38,
      bottom: 38,
      left: 80,
      right: 80,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(path.join(favDir, 'mstile-310x150.png'))
  console.log('  mstile-310x150.png  310x150')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
