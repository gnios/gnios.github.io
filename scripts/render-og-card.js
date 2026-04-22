const path = require('path')
const puppeteer = require('puppeteer')

async function main() {
  const htmlPath = path.join(__dirname, 'og-card.html')
  const outPath = path.join(__dirname, '..', 'public', 'static', 'images', 'twitter-card.png')

  const browser = await puppeteer.launch({ headless: 'new' })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
    await page.goto('file://' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' })
    await page.evaluateHandle('document.fonts.ready')
    await page.screenshot({ path: outPath, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } })
    console.log('Wrote', outPath)
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
