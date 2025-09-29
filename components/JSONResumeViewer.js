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
    { id: 'kendall', name: 'Kendall', description: 'Layout moderno com cores' },
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
        alert(
          `PDF com tema ${theme} não encontrado. Execute 'npm run resume:generate' para gerar os arquivos.`
        )
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
  }, [activeTheme])

  return (
    <div className="mx-auto max-w-6xl bg-white shadow-lg dark:bg-gray-900">
      {/* Header com controles */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Currículo Profissional</h1>
            <p className="text-blue-200">Visualização interativa com temas JSON Resume</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Seletor de Tema */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-blue-200">Tema:</label>
              <select
                value={activeTheme}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="rounded border border-white/30 bg-white/20 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                {themes.map((theme) => (
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
                className="flex items-center gap-2 rounded border border-white/30 bg-white/20 px-4 py-2 transition-colors hover:bg-white/30"
                title="Baixar PDF"
              >
                <AiOutlineDownload className="h-4 w-4" />
                PDF
              </button>

              <button
                onClick={handleRegenerate}
                className="flex items-center gap-2 rounded border border-white/30 bg-white/20 px-4 py-2 transition-colors hover:bg-white/30"
                title="Regenerar arquivos"
              >
                <AiOutlineReload className="h-4 w-4" />
                Atualizar
              </button>
            </div>
          </div>
        </div>

        {/* Informações do tema ativo */}
        <div className="mt-4 rounded-lg bg-white/10 p-3">
          <h3 className="text-lg font-semibold">
            {themes.find((t) => t.id === activeTheme)?.name}
          </h3>
          <p className="text-sm text-blue-200">
            {themes.find((t) => t.id === activeTheme)?.description}
          </p>
        </div>
      </div>

      {/* Área de visualização */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-gray-900/80">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <p className="text-gray-600 dark:text-gray-400">Carregando tema {activeTheme}...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-8 text-center">
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
              <h3 className="mb-2 text-lg font-semibold text-red-800 dark:text-red-200">
                Erro ao carregar tema
              </h3>
              <p className="mb-4 text-red-600 dark:text-red-400">{error}</p>
              <button
                onClick={() => loadTheme(activeTheme)}
                className="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
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
      <div className="bg-gray-50 p-4 text-center text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400">
        <p>
          Currículo gerado com <strong>JSON Resume</strong> • Tema:{' '}
          <strong>{themes.find((t) => t.id === activeTheme)?.name}</strong> • Última atualização:{' '}
          {new Date().toLocaleString('pt-BR')}
        </p>
      </div>
    </div>
  )
}
