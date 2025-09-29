const fs = require('fs')
const path = require('path')
const pdf = require('pdf-parse')

// Função para extrair texto de PDF
async function extractPDFText() {
  try {
    const pdfPath = path.join(__dirname, '..', 'Profile.pdf')

    // Verificar se o arquivo existe
    if (!fs.existsSync(pdfPath)) {
      console.log('❌ Arquivo Profile.pdf não encontrado!')
      return
    }

    console.log('📄 Extraindo texto do Profile.pdf...')

    // Ler o arquivo PDF
    const dataBuffer = fs.readFileSync(pdfPath)

    // Extrair texto do PDF
    const data = await pdf(dataBuffer)

    console.log('✅ Texto extraído com sucesso!')
    console.log('📏 Número de páginas:', data.numpages)
    console.log('📝 Tamanho do texto:', data.text.length, 'caracteres')

    // Salvar o texto extraído em um arquivo
    const outputPath = path.join(__dirname, '..', 'extracted-profile-text.txt')
    fs.writeFileSync(outputPath, data.text, 'utf8')

    console.log('💾 Texto salvo em:', outputPath)

    // Exibir uma prévia do texto
    console.log('\n📋 PRÉVIA DO TEXTO EXTRAÍDO:')
    console.log('='.repeat(80))
    console.log(data.text.substring(0, 2000) + '...')
    console.log('='.repeat(80))

    return data.text
  } catch (error) {
    console.error('❌ Erro ao extrair texto do PDF:', error.message)
  }
}

// Executar extração
extractPDFText()
