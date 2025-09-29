import { useState, useEffect } from 'react'
import { AiOutlineDownload, AiOutlineEye, AiOutlineReload } from 'react-icons/ai'

export default function JSONResumeViewer() {
  const [activeTheme, setActiveTheme] = useState('elegant')
  const [htmlContent, setHtmlContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const themes = [
    { id: 'elegant', name: 'Elegant', description: 'Design clássico e profissional' },
    { id: 'modern', name: 'Modern', description: 'Estilo contemporâneo' },
    { id: 'kendall', name: 'Kendall', description: 'Layout moderno com cores' }
  ]

  const loadTheme = async (theme) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/resume-html/resume-${theme}.html`)
      if (!response.ok) {
        throw new Error(`Tema ${theme} não encontrado`)
      }
      const html = await response.text()
      setHtmlContent(html)
    } catch (err) {
      setError(err.message)
      console.error('Erro ao carregar tema:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleThemeChange = (theme) => {
    setActiveTheme(theme)
    loadTheme(theme)
  }

  const handleDownloadPDF = async (theme) => {
    try {
      const pdfUrl = `/resume/resume-${theme}.pdf`
      const response = await fetch(pdfUrl, { method: 'HEAD' })
      
      if (response.ok) {
        const link = document.createElement('a')
        link.href = pdfUrl
        link.download = `curriculo-${theme}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        alert(`PDF com tema ${theme} não encontrado. Execute 'npm run resume:generate' para gerar os arquivos.`)
      }
    } catch (error) {
      console.error('Erro ao baixar PDF:', error)
      alert('Erro ao baixar PDF. Tente novamente.')
    }
  }

  const handleRegenerate = async () => {
    try {
      const response = await fetch('/api/resume/regenerate', { method: 'POST' })
      if (response.ok) {
        alert('Arquivos regenerados com sucesso! Recarregando...')
        loadTheme(activeTheme)
      } else {
        alert('Erro ao regenerar arquivos. Execute manualmente: npm run resume:generate')
      }
    } catch (error) {
      console.error('Erro ao regenerar:', error)
      alert('Erro ao regenerar arquivos. Execute manualmente: npm run resume:generate')
    }
  }

  useEffect(() => {
    loadTheme(activeTheme)
  }, [])

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 shadow-lg">
      {/* Header com controles */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Currículo Profissional</h1>
            <p className="text-blue-200">Visualização interativa com temas JSON Resume</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Seletor de Tema */}
            <div className="flex flex-col">
              <label className="text-sm text-blue-200 mb-1">Tema:</label>
              <select
                value={activeTheme}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="bg-white/20 border border-white/30 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                {themes.map(theme => (
                  <option key={theme.id} value={theme.id} className="text-gray-900">
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-2">
              <button
                onClick={() => handleDownloadPDF(activeTheme)}
                className="bg-white/20 hover:bg-white/30 border border-white/30 rounded px-4 py-2 flex items-center gap-2 transition-colors"
                title="Baixar PDF"
              >
                <AiOutlineDownload className="w-4 h-4" />
                PDF
              </button>
              
              <button
                onClick={handleRegenerate}
                className="bg-white/20 hover:bg-white/30 border border-white/30 rounded px-4 py-2 flex items-center gap-2 transition-colors"
                title="Regenerar arquivos"
              >
                <AiOutlineReload className="w-4 h-4" />
                Atualizar
              </button>
            </div>
          </div>
        </div>

        {/* Informações do tema ativo */}
        <div className="mt-4 p-3 bg-white/10 rounded-lg">
          <h3 className="font-semibold text-lg">
            {themes.find(t => t.id === activeTheme)?.name}
          </h3>
          <p className="text-blue-200 text-sm">
            {themes.find(t => t.id === activeTheme)?.description}
          </p>
        </div>
      </div>

      {/* Área de visualização */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Carregando tema {activeTheme}...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-8 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                Erro ao carregar tema
              </h3>
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <button
                onClick={() => loadTheme(activeTheme)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        {!loading && !error && htmlContent && (
          <div className="resume-container">
            <div 
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className="resume-html-content"
            />
          </div>
        )}
      </div>

      {/* Footer com informações */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          Currículo gerado com <strong>JSON Resume</strong> • 
          Tema: <strong>{themes.find(t => t.id === activeTheme)?.name}</strong> • 
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </p>
      </div>
    </div>
  )
}
