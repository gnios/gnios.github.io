const path = require('path')
const puppeteer = require('puppeteer')

async function main() {
  const htmlPath = path.join(__dirname, 'banner-documentacao.html')
  const outPath = path.join(
    __dirname,
    '..',
    'public',
    'static',
    'images',
    'banner-documentacao-antes-das-ferramentas.png'
  )

  const browser = await puppeteer.launch({ headless: 'new' })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 })
    await page.goto('file://' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' })
    await page.evaluateHandle('document.fonts.ready')
    await page.screenshot({
      path: outPath,
      type: 'png',
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    })
    console.log('Wrote', outPath)
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
