import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import resumeData from '@/data/resume.json'

// Import html2pdf dinamicamente para evitar problemas de SSR
let html2pdf
if (typeof window !== 'undefined') {
  import('html2pdf.js').then((module) => {
    html2pdf = module.default
  })
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
  AiOutlineStar
} from 'react-icons/ai'

export default function ReactResume() {
  // Tema fixo moderno
  const currentTheme = {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6',
    background: '#ffffff',
    text: '#1f2937',
    textLight: '#6b7280'
  }

  const handleDownload = async () => {
    if (!html2pdf) {
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
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    
    try {
      await html2pdf().set(opt).from(element).save()
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
      month: 'short' 
    })
  }

  const getProfileIcon = (network) => {
    switch (network.toLowerCase()) {
      case 'linkedin':
        return <AiOutlineLinkedin className="w-4 h-4" />
      case 'github':
        return <AiOutlineGithub className="w-4 h-4" />
      case 'twitter':
        return <AiOutlineTwitter className="w-4 h-4" />
      default:
        return <AiOutlineUser className="w-4 h-4" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      {/* Currículo */}
      <div id="resume-content" className="p-8" style={{ backgroundColor: currentTheme.background }}>
        {/* Header do Currículo */}
        <div className="text-center mb-8">
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ color: currentTheme.text }}
          >
            {resumeData.basics.name}
          </h1>
          <h2 
            className="text-xl font-semibold mb-4"
            style={{ color: currentTheme.primary }}
          >
            {resumeData.basics.label}
          </h2>
          
          {/* Informações de contato */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <AiOutlineMail className="w-4 h-4" style={{ color: currentTheme.primary }} />
              <span style={{ color: currentTheme.textLight }}>{resumeData.basics.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <AiOutlineEnvironment className="w-4 h-4" style={{ color: currentTheme.primary }} />
              <span style={{ color: currentTheme.textLight }}>
                {resumeData.basics.location.city}, {resumeData.basics.location.countryCode}
              </span>
            </div>
            {resumeData.basics.profiles.map((profile, index) => (
              <a
                key={index}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                style={{ color: currentTheme.primary }}
              >
                {getProfileIcon(profile.network)}
                <span>{profile.network}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Resumo */}
        <div className="mb-8">
          <h3 
            className="text-2xl font-bold mb-4 pb-2 border-b-2"
            style={{ 
              color: currentTheme.text,
              borderColor: currentTheme.primary 
            }}
          >
            Resumo Profissional
          </h3>
          <div 
            className="prose max-w-none"
            style={{ color: currentTheme.textLight }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {resumeData.basics.summary}
            </ReactMarkdown>
          </div>
        </div>

        {/* Layout em duas colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experiência Profissional */}
            <div>
              <h3 
                className="text-2xl font-bold mb-6 pb-2 border-b-2"
                style={{ 
                  color: currentTheme.text,
                  borderColor: currentTheme.primary 
                }}
              >
                Experiência Profissional
              </h3>
              <div className="space-y-6">
                {resumeData.work.map((job, index) => (
                  <div key={index} className="border-l-4 pl-6" style={{ borderColor: currentTheme.primary }}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h4 
                          className="text-xl font-bold"
                          style={{ color: currentTheme.text }}
                        >
                          {job.position}
                        </h4>
                        <h5 
                          className="text-lg font-semibold"
                          style={{ color: currentTheme.primary }}
                        >
                          {job.name}
                        </h5>
                      </div>
                      <div className="flex items-center gap-2 text-sm" style={{ color: currentTheme.textLight }}>
                        <AiOutlineCalendar className="w-4 h-4" />
                        <span>
                          {formatDate(job.startDate)} - {formatDate(job.endDate)}
                        </span>
                      </div>
                    </div>
                    <div 
                      className="mb-3"
                      style={{ color: currentTheme.textLight }}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {job.summary}
                      </ReactMarkdown>
                    </div>
                    {job.highlights && job.highlights.length > 0 && (
                      <ul className="space-y-1">
                        {job.highlights.map((highlight, highlightIndex) => (
                          <li 
                            key={highlightIndex} 
                            className="flex items-start gap-2 text-sm"
                            style={{ color: currentTheme.textLight }}
                          >
                            <AiOutlineStar className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: currentTheme.primary }} />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Educação */}
            <div>
              <h3 
                className="text-2xl font-bold mb-6 pb-2 border-b-2"
                style={{ 
                  color: currentTheme.text,
                  borderColor: currentTheme.primary 
                }}
              >
                Educação
              </h3>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="border-l-4 pl-6" style={{ borderColor: currentTheme.primary }}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h4 
                          className="text-xl font-bold"
                          style={{ color: currentTheme.text }}
                        >
                          {edu.area}
                        </h4>
                        <h5 
                          className="text-lg font-semibold"
                          style={{ color: currentTheme.primary }}
                        >
                          {edu.institution}
                        </h5>
                      </div>
                      <div className="flex items-center gap-2 text-sm" style={{ color: currentTheme.textLight }}>
                        <AiOutlineCalendar className="w-4 h-4" />
                        <span>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                      </div>
                    </div>
                    {edu.courses && edu.courses.length > 0 && (
                      <div className="mt-3">
                        <h6 className="font-semibold mb-2" style={{ color: currentTheme.text }}>Cursos:</h6>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course, courseIndex) => (
                            <span
                              key={courseIndex}
                              className="px-3 py-1 rounded-full text-sm"
                              style={{ 
                                backgroundColor: currentTheme.primary + '20',
                                color: currentTheme.primary 
                              }}
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna lateral (1/3) */}
          <div className="space-y-8">
            {/* Habilidades */}
            <div>
              <h3 
                className="text-2xl font-bold mb-6 pb-2 border-b-2"
                style={{ 
                  color: currentTheme.text,
                  borderColor: currentTheme.primary 
                }}
              >
                Habilidades
              </h3>
              <div className="space-y-4">
                {resumeData.skills.map((skill, index) => (
                  <div key={index}>
                    <h4 
                      className="font-bold mb-2"
                      style={{ color: currentTheme.text }}
                    >
                      {skill.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.keywords.map((keyword, keywordIndex) => (
                        <span
                          key={keywordIndex}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ 
                            backgroundColor: currentTheme.primary + '20',
                            color: currentTheme.primary 
                          }}
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
              <h3 
                className="text-2xl font-bold mb-6 pb-2 border-b-2"
                style={{ 
                  color: currentTheme.text,
                  borderColor: currentTheme.primary 
                }}
              >
                Idiomas
              </h3>
              <div className="space-y-3">
                {resumeData.languages.map((language, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span style={{ color: currentTheme.text }}>{language.language}</span>
                    <span 
                      className="px-2 py-1 rounded text-sm"
                      style={{ 
                        backgroundColor: currentTheme.primary + '20',
                        color: currentTheme.primary 
                      }}
                    >
                      {language.fluency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projetos */}
            {resumeData.projects && resumeData.projects.length > 0 && (
              <div>
                <h3 
                  className="text-2xl font-bold mb-6 pb-2 border-b-2"
                  style={{ 
                    color: currentTheme.text,
                    borderColor: currentTheme.primary 
                  }}
                >
                  Projetos
                </h3>
                <div className="space-y-4">
                  {resumeData.projects.map((project, index) => (
                    <div key={index}>
                      <h4 
                        className="font-bold mb-1"
                        style={{ color: currentTheme.text }}
                      >
                        {project.name}
                      </h4>
                      <p 
                        className="text-sm"
                        style={{ color: currentTheme.textLight }}
                      >
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
      <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-center">
          <div className="group relative">
            <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-50 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
            <button
              onClick={handleDownload}
              className="relative flex items-center divide-x divide-gray-600 rounded-lg bg-white px-7 py-4 leading-none dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
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
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
          Clique para baixar uma cópia do seu currículo em formato PDF
        </p>
      </div>
    </div>
  )
}