import { execSync } from 'child_process'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    // Executar script de geração
    const scriptPath = path.join(process.cwd(), 'scripts', 'generate-resume-html.js')
    execSync(`node ${scriptPath}`, {
      stdio: 'pipe',
      cwd: process.cwd(),
    })

    res.status(200).json({
      success: true,
      message: 'Arquivos HTML regenerados com sucesso',
    })
  } catch (error) {
    console.error('Erro ao regenerar arquivos:', error)
    res.status(500).json({
      success: false,
      message: 'Erro ao regenerar arquivos',
      error: error.message,
    })
  }
}
