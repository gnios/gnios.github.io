const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const themes = ['elegant', 'modern', 'kendall']
const resumePath = path.join(__dirname, '..', 'data', 'resume.json')
const outputDir = path.join(__dirname, '..', 'public', 'resume')

// Criar diretório de saída se não existir
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

console.log('Gerando PDFs do currículo...')

themes.forEach(theme => {
  try {
    console.log(`Gerando PDF com tema ${theme}...`)
    
    const outputPath = path.join(outputDir, `resume-${theme}.pdf`)
    
    // Comando para gerar PDF usando resume-cli
    const command = `npx resume export ${outputPath} --theme ${theme} --resume ${resumePath}`
    
    execSync(command, { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    })
    
    console.log(`✅ PDF gerado com sucesso: ${outputPath}`)
  } catch (error) {
    console.error(`❌ Erro ao gerar PDF com tema ${theme}:`, error.message)
  }
})

console.log('Geração de PDFs concluída!')
