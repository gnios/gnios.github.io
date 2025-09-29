import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import resumeData from '@/data/resume.json'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import experienceTimelineData from '@/data/experienceTimelineData'

// Import html2pdf dinamicamente para evitar problemas de SSR
let html2pdf = null

// Função para carregar html2pdf apenas quando necessário
const loadHtml2Pdf = async () => {
  if (typeof window !== 'undefined' && !html2pdf) {
    try {
      const module = await import('html2pdf.js')
      html2pdf = module.default
    } catch (error) {
      console.error('Erro ao carregar html2pdf:', error)
    }
  }
  return html2pdf
}

import {
  AiOutlineDownload,
  AiOutlineMail,
  AiOutlineEnvironment,
  AiOutlineLinkedin,
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineStar,
} from 'react-icons/ai'

export default function ReactResume() {
  // Tema dinâmico baseado no modo escuro
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    // Verificar se está em modo escuro
    const checkDarkMode = () => {
      if (typeof window !== 'undefined') {
        const isDarkMode =
          document.documentElement.classList.contains('dark') ||
          window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDark(isDarkMode)
      }
    }

    checkDarkMode()

    // Observar mudanças no tema
    const observer = new MutationObserver(checkDarkMode)
    if (typeof window !== 'undefined') {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    }

    return () => observer.disconnect()
  }, [])

  const currentTheme = {
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#60a5fa',
    background: isDark ? '#111827' : '#ffffff',
    text: isDark ? '#f9fafb' : '#1f2937',
    textLight: isDark ? '#9ca3af' : '#6b7280',
    cardBg: isDark ? '#1f2937' : '#ffffff',
    border: isDark ? '#374151' : '#e5e7eb',
  }

  const handleDownload = async () => {
    try {
      const html2pdfInstance = await loadHtml2Pdf()

      if (!html2pdfInstance) {
        // Fallback para impressão se html2pdf não estiver carregado
        window.print()
        return
      }

      const element = document.getElementById('resume-content')
      const opt = {
        margin: 0.5,
        filename: `curriculo-${resumeData.basics.name}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      }

      await html2pdfInstance().set(opt).from(element).save()
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      // Fallback para impressão
      window.print()
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Presente'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
    })
  }

  const getProfileIcon = (network) => {
    switch (network.toLowerCase()) {
      case 'linkedin':
        return <AiOutlineLinkedin className="h-4 w-4" />
      case 'github':
        return <AiOutlineGithub className="h-4 w-4" />
      case 'twitter':
        return <AiOutlineTwitter className="h-4 w-4" />
      default:
        return <AiOutlineUser className="h-4 w-4" />
    }
  }

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
      {/* Currículo */}
      <div id="resume-content" className="bg-white p-8 dark:bg-gray-900">
        {/* Header do Currículo */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
            {resumeData.basics.name}
          </h1>
          <h2 className="mb-4 text-xl font-semibold text-blue-600 dark:text-blue-400">
            {resumeData.basics.label}
          </h2>

          {/* Informações de contato */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <AiOutlineMail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-600 dark:text-gray-300">{resumeData.basics.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <AiOutlineEnvironment className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-600 dark:text-gray-300">
                {resumeData.basics.location.city}, {resumeData.basics.location.countryCode}
              </span>
            </div>
            {resumeData.basics.profiles.map((profile, index) => (
              <a
                key={index}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 transition-opacity hover:opacity-80 dark:text-blue-400"
              >
                {getProfileIcon(profile.network)}
                <span>{profile.network}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Resumo */}
        <div className="mb-8">
          <h3 className="mb-4 border-b-2 border-blue-600 pb-2 text-2xl font-bold text-gray-900 dark:border-blue-400 dark:text-white">
            Resumo Profissional
          </h3>
          <div className="prose max-w-none text-gray-600 dark:text-gray-300">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{resumeData.basics.summary}</ReactMarkdown>
          </div>
        </div>

        {/* Timeline de Experiências */}
        <div className="mb-8">
          <h3 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold text-gray-900 dark:border-blue-400 dark:text-white">
            Trajetória Profissional e Acadêmica
          </h3>
          <ExperienceTimeline experiences={experienceTimelineData} />
        </div>

        {/* Layout em duas colunas para habilidades e projetos */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Habilidades */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold text-gray-900 dark:border-blue-400 dark:text-white">
                Habilidades
              </h3>
              <div className="space-y-4">
                {resumeData.skills.map((skill, index) => (
                  <div key={index}>
                    <h4 className="mb-2 font-bold text-gray-900 dark:text-white">{skill.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.keywords.map((keyword, keywordIndex) => (
                        <span
                          key={keywordIndex}
                          className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Idiomas */}
            <div>
              <h3 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold text-gray-900 dark:border-blue-400 dark:text-white">
                Idiomas
              </h3>
              <div className="space-y-3">
                {resumeData.languages.map((language, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-900 dark:text-white">{language.language}</span>
                    <span className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {language.fluency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projetos */}
          <div className="space-y-8">
            {resumeData.projects && resumeData.projects.length > 0 && (
              <div>
                <h3 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold text-gray-900 dark:border-blue-400 dark:text-white">
                  Projetos
                </h3>
                <div className="space-y-4">
                  {resumeData.projects.map((project, index) => (
                    <div key={index}>
                      <h4 className="mb-1 font-bold text-gray-900 dark:text-white">
                        {project.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Botão de download no final */}
      <div className="border-t border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex justify-center">
          <div className="group relative">
            <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-50 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
            <button
              onClick={handleDownload}
              className="relative flex items-center divide-x divide-gray-600 rounded-lg bg-white px-7 py-4 leading-none transition-colors hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-900"
            >
              <span className="flex items-center space-x-5">
                <AiOutlineDownload className="h-6 w-6 -rotate-6 text-fuchsia-600" />
                <span className="pr-6 text-gray-900 dark:text-gray-100">
                  Baixar Currículo em PDF
                </span>
              </span>
            </button>
          </div>
        </div>
        <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
          Clique para baixar uma cópia do seu currículo em formato PDF
        </p>
      </div>
    </div>
  )
}
