import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import Link from '@/components/Link'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import experienceData from '@/data/experienceData'
import skillsData from '@/data/skillsData'
import educationData from '@/data/educationData'
import { AiOutlineLinkedin, AiOutlineGithub, AiOutlineMail, AiOutlinePhone, AiOutlinePrinter } from 'react-icons/ai'

export default function CVLayout({ children, frontMatter }) {
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    twitter,
    linkedin,
    github,
    text1,
    text2,
    text3,
  } = frontMatter

  return (
    <>
      <PageSEO title={`Currículo - ${name}`} description={`Currículo profissional de ${name}, desenvolvedor full stack`} />
      
      {/* Header do CV */}
      <div className="cv-container bg-white dark:bg-gray-900 print:bg-white">
        <div className="cv-header">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              <Image
                src={avatar}
                alt="avatar"
                width="120px"
                height="120px"
                className="h-30 w-30 rounded-full border-4 border-white"
                placeholder="blur"
                blurDataURL="/static/images/SVG-placeholder.png"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">{name}</h1>
              <h2 className="text-xl text-blue-200 font-semibold mb-2">{occupation}</h2>
              <p className="text-gray-200 mb-4">{company}</p>
              
              {/* Informações de Contato */}
              <div className="cv-contact-info flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <a href={`mailto:${email}`} className="flex items-center text-gray-200 hover:text-white">
                  <AiOutlineMail className="mr-2 h-4 w-4" />
                  {email}
                </a>
                <a href={linkedin} target="_blank" rel="noreferrer noopener" className="flex items-center text-gray-200 hover:text-white">
                  <AiOutlineLinkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
                <a href={github} target="_blank" rel="noreferrer noopener" className="flex items-center text-gray-200 hover:text-white">
                  <AiOutlineGithub className="mr-2 h-4 w-4" />
                  GitHub
                </a>
                <button 
                  onClick={() => window.print()} 
                  className="cv-print-button flex items-center text-gray-200 hover:text-white"
                >
                  <AiOutlinePrinter className="mr-2 h-4 w-4" />
                  Imprimir PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">

          {/* Resumo Profissional */}
          <div className="cv-section">
            <h3 className="cv-section-title">
              Resumo Profissional
            </h3>
            <div className="prose max-w-none dark:prose-dark">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{text1}</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">{text2}</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">{text3}</p>
            </div>
          </div>

          {/* Layout em Duas Colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Esquerda - Experiência */}
            <div className="lg:col-span-2 space-y-8">
              {/* Experiência Profissional */}
              <div className="cv-section">
                <h3 className="cv-section-title">
                  Experiência Profissional
                </h3>
                <div className="space-y-6">
                  {experienceData.map((d, index) => (
                    <div key={index} className="cv-experience-item">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <h4 className="cv-experience-title">{d.title}</h4>
                        <span className="cv-experience-period">{d.range}</span>
                      </div>
                      <h5 className="cv-experience-company">{d.company}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{d.location}</p>
                      <div className="space-y-2">
                        <p className="cv-experience-description">{d.text1}</p>
                        <p className="cv-experience-description">{d.text2}</p>
                        <p className="cv-experience-description">{d.text3}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Educação */}
              <div className="cv-section">
                <h3 className="cv-section-title">
                  Educação
                </h3>
                <div className="space-y-4">
                  {educationData.map((education, index) => (
                    <div key={index} className="cv-education-item">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <h4 className="cv-education-degree">{education.degree}</h4>
                        <span className="cv-education-period">{education.period}</span>
                      </div>
                      <h5 className="cv-education-institution">{education.institution}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{education.location}</p>
                      <p className="cv-education-description">{education.description}</p>
                      {education.courses && education.courses.length > 0 && (
                        <div className="cv-courses">
                          <h6 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Cursos e Especializações:</h6>
                          <div className="flex flex-wrap gap-1">
                            {education.courses.map((course, courseIndex) => (
                              <span
                                key={courseIndex}
                                className="cv-course-tag"
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

            {/* Coluna Direita - Habilidades e Informações Adicionais */}
            <div className="space-y-8">
              {/* Habilidades Técnicas */}
              <div className="cv-section">
                <h3 className="cv-section-title">
                  Habilidades Técnicas
                </h3>
                <div className="cv-skills-grid">
                  {skillsData.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="cv-skills-category">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">{category.category}</h4>
                      <div className="space-y-2">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="cv-skill-item">
                            <span className="text-sm text-gray-700 dark:text-gray-300">{skill.name}</span>
                            <div className="flex items-center space-x-2">
                              <div className="cv-skill-level">
                                {[1, 2, 3].map((level) => (
                                  <div
                                    key={level}
                                    className={`cv-skill-dot ${
                                      level <= (skill.level === 'Avançado' ? 3 : skill.level === 'Intermediário' ? 2 : 1)
                                        ? skill.level === 'Avançado' ? 'bg-green-500' : skill.level === 'Intermediário' ? 'bg-yellow-500' : 'bg-blue-500'
                                        : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">{skill.level}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="cv-section">
                <h3 className="cv-section-title">
                  Informações Adicionais
                </h3>
                <div className="cv-additional-info space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Disponibilidade</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Tempo integral / Freelancer</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Localização</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Remoto / Brasil</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Idiomas</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Português (Nativo), Inglês (Intermediário)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
