import { useState } from 'react'
import Image from '@/components/Image'
import Link from '@/components/Link'
import {
  AiOutlineLinkedin,
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineMail,
  AiOutlineDownload,
} from 'react-icons/ai'

export default function JSONResume({ resumeData }) {
  const [activeTheme, setActiveTheme] = useState('elegant')

  const themes = [
    { id: 'elegant', name: 'Elegant' },
    { id: 'modern', name: 'Modern' },
    { id: 'kendall', name: 'Kendall' },
  ]

  const handleDownloadPDF = async (theme) => {
    try {
      // Tentar baixar PDF pré-gerado
      const pdfUrl = `/resume/resume-${theme}.pdf`

      // Verificar se o PDF existe
      const response = await fetch(pdfUrl, { method: 'HEAD' })

      if (response.ok) {
        // Se o PDF existe, fazer download
        const link = document.createElement('a')
        link.href = pdfUrl
        link.download = `curriculo-${theme}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        // Se não existe, mostrar mensagem para gerar
        alert(
          `PDF com tema ${theme} não encontrado. Execute 'npm run resume:pdf' para gerar os PDFs.`
        )
      }
    } catch (error) {
      console.error('Erro ao baixar PDF:', error)
      alert('Erro ao baixar PDF. Tente novamente.')
    }
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
        return <AiOutlineMail className="h-4 w-4" />
    }
  }

  const getSkillLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'avançado':
        return 'bg-green-500'
      case 'intermediário':
        return 'bg-yellow-500'
      case 'básico':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="mx-auto max-w-4xl bg-white shadow-lg dark:bg-gray-900">
      {/* Header com controles */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div>
            <h1 className="text-3xl font-bold">{resumeData.basics.name}</h1>
            <p className="text-lg text-blue-200">{resumeData.basics.label}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
            <select
              value={activeTheme}
              onChange={(e) => setActiveTheme(e.target.value)}
              className="rounded border border-white/30 bg-white/20 px-3 py-1 text-white"
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id} className="text-gray-900">
                  {theme.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleDownloadPDF(activeTheme)}
              className="flex items-center gap-2 rounded border border-white/30 bg-white/20 px-4 py-1 transition-colors hover:bg-white/30"
            >
              <AiOutlineDownload className="h-4 w-4" />
              PDF
            </button>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Informações de Contato */}
        <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start">
          <div className="flex-shrink-0">
            <Image
              src={resumeData.basics.image}
              alt={resumeData.basics.name}
              width="120px"
              height="120px"
              className="rounded-full border-4 border-gray-200 dark:border-gray-700"
              placeholder="blur"
              blurDataURL="/static/images/SVG-placeholder.png"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4">
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {resumeData.basics.summary}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:justify-start">
              <a
                href={`mailto:${resumeData.basics.email}`}
                className="flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <AiOutlineMail className="mr-2 h-4 w-4" />
                {resumeData.basics.email}
              </a>
              {resumeData.basics.profiles.map((profile, index) => (
                <a
                  key={index}
                  href={profile.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  {getProfileIcon(profile.network)}
                  <span className="ml-2">{profile.network}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Experiência Profissional */}
        <section className="mb-8">
          <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold text-gray-900 dark:border-blue-400 dark:text-gray-100">
            Experiência Profissional
          </h2>
          <div className="space-y-6">
            {resumeData.work.map((job, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4 dark:border-blue-400">
                <div className="rounded-r-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <div className="mb-2 flex flex-col md:flex-row md:items-start md:justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {job.position}
                    </h3>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {new Date(job.startDate).getFullYear()} -{' '}
                      {job.endDate ? new Date(job.endDate).getFullYear() : 'Presente'}
                    </span>
                  </div>
                  <h4 className="text-md mb-2 font-medium text-gray-700 dark:text-gray-300">
                    {job.name}
                  </h4>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{job.summary}</p>
                  {job.highlights && job.highlights.length > 0 && (
                    <ul className="list-inside list-disc space-y-1">
                      {job.highlights.map((highlight, highlightIndex) => (
                        <li
                          key={highlightIndex}
                          className="text-sm text-gray-700 dark:text-gray-300"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Layout em duas colunas */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Coluna Esquerda */}
          <div className="space-y-8">
            {/* Educação */}
            <section>
              <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold text-gray-900 dark:border-blue-400 dark:text-gray-100">
                Educação
              </h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <div className="mb-2 flex flex-col md:flex-row md:items-start md:justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {edu.area}
                      </h3>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {new Date(edu.startDate).getFullYear()} -{' '}
                        {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Presente'}
                      </span>
                    </div>
                    <h4 className="text-md mb-2 font-medium text-gray-700 dark:text-gray-300">
                      {edu.institution}
                    </h4>
                    {edu.courses && edu.courses.length > 0 && (
                      <div className="mt-3">
                        <h5 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Cursos e Especializações:
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {edu.courses.map((course, courseIndex) => (
                            <span
                              key={courseIndex}
                              className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
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
            </section>

            {/* Projetos */}
            {resumeData.projects && resumeData.projects.length > 0 && (
              <section>
                <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold text-gray-900 dark:border-blue-400 dark:text-gray-100">
                  Projetos
                </h2>
                <div className="space-y-4">
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                      <div className="mb-2 flex flex-col md:flex-row md:items-start md:justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {project.name}
                        </h3>
                        <div className="flex gap-2">
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                            >
                              Demo
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="text-sm text-gray-600 hover:underline dark:text-gray-400"
                            >
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                        {project.description}
                      </p>
                      {project.highlights && project.highlights.length > 0 && (
                        <ul className="list-inside list-disc space-y-1">
                          {project.highlights.map((highlight, highlightIndex) => (
                            <li
                              key={highlightIndex}
                              className="text-sm text-gray-700 dark:text-gray-300"
                            >
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                      {project.keywords && project.keywords.length > 0 && (
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-1">
                            {project.keywords.map((keyword, keywordIndex) => (
                              <span
                                key={keywordIndex}
                                className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Coluna Direita */}
          <div className="space-y-8">
            {/* Habilidades */}
            <section>
              <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold text-gray-900 dark:border-blue-400 dark:text-gray-100">
                Habilidades
              </h2>
              <div className="space-y-4">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                        {skill.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[1, 2, 3].map((level) => (
                            <div
                              key={level}
                              className={`h-2 w-2 rounded-full ${
                                level <=
                                (skill.level === 'Avançado'
                                  ? 3
                                  : skill.level === 'Intermediário'
                                  ? 2
                                  : 1)
                                  ? getSkillLevelColor(skill.level)
                                  : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {skill.keywords.map((keyword, keywordIndex) => (
                        <span
                          key={keywordIndex}
                          className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Idiomas */}
            <section>
              <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold text-gray-900 dark:border-blue-400 dark:text-gray-100">
                Idiomas
              </h2>
              <div className="space-y-3">
                {resumeData.languages.map((language, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {language.language}
                    </span>
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      {language.fluency}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Interesses */}
            {resumeData.interests && resumeData.interests.length > 0 && (
              <section>
                <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold text-gray-900 dark:border-blue-400 dark:text-gray-100">
                  Interesses
                </h2>
                <div className="space-y-3">
                  {resumeData.interests.map((interest, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                      <h3 className="text-md mb-2 font-semibold text-gray-900 dark:text-gray-100">
                        {interest.name}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {interest.keywords.map((keyword, keywordIndex) => (
                          <span
                            key={keywordIndex}
                            className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
