import { FaBuilding, FaCode, FaGraduationCap, FaAward } from 'react-icons/fa'
import { BsBriefcaseFill } from 'react-icons/bs'
import { HiOutlineCode } from 'react-icons/hi'
import Link from '@/components/Link'

const ExperienceTimeline = ({ experiences }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'work':
        return <BsBriefcaseFill className="h-4 w-4" />
      case 'education':
        return <FaGraduationCap className="h-4 w-4" />
      case 'award':
        return <FaAward className="h-4 w-4" />
      default:
        return <FaCode className="h-4 w-4" />
    }
  }

  const getCompanyLogo = (companyName) => {
    const logos = {
      Stone:
        'https://media.licdn.com/dms/image/v2/C4D0BAQGT_-yf7Xw9dw/company-logo_100_100/company-logo_100_100/0/1673960541253?e=1761782400&v=beta&t=DC-5Ofx0MT9bvo2fKBki5VyjlhcXOVIkXb9-KSF91XY',
      'White Tents':
        'https://media.licdn.com/dms/image/v2/C4D0BAQHC_WxT6Nuovw/company-logo_100_100/company-logo_100_100/0/1630581639541/whitetents_logo?e=1761782400&v=beta&t=QB558UUrCpvOxG4TssoNLh1ETHuyxDvmFPxv57iq7vo',
      'Join Tecnologia & Design':
        'https://media.licdn.com/dms/image/v2/D4D0BAQGhjQ-W24eT2A/company-logo_100_100/company-logo_100_100/0/1703195012178/join_ti_logo?e=1761782400&v=beta&t=KzcHH0Cs2VMpxtsGp0SOL1E-IPNtbxRtovKm-qM2uv4',
      Beblue: 'https://logo.clearbit.com/beblue.com.br',
      TOTVS:
        'https://media.licdn.com/dms/image/v2/D4D0BAQEATHMUo8sshg/company-logo_100_100/B4DZd7OnTLHkAQ-/0/1750119118553/totvs_logo?e=1761782400&v=beta&t=x5gfQ0lvD3Yu5ineUC5nDHSfIF2v_ybtzqSfUo2jYaM',
      Ilevus: 'https://logo.clearbit.com/ilevus.com.br',
      'UECE - Universidade Estadual do Ceará':
        'https://www.uece.br/wp-content/uploads/2023/07/Logo_Uece_Nova_Brasa%CC%83o_Colorido.png',
      'Universidade Estácio de Sá': 'https://logo.clearbit.com/estacio.br',
    }
    return logos[companyName] || null
  }

  const getColor = (index) => {
    const colors = [
      'bg-blue-200 dark:bg-blue-900',
      'bg-green-200 dark:bg-green-900',
      'bg-purple-200 dark:bg-purple-900',
      'bg-yellow-200 dark:bg-yellow-900',
      'bg-red-200 dark:bg-red-900',
      'bg-indigo-200 dark:bg-indigo-900',
      'bg-pink-200 dark:bg-pink-900',
      'bg-orange-200 dark:bg-orange-900',
    ]
    return colors[index % colors.length]
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Presente'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
    })
  }

  const getDuration = (startDate, endDate) => {
    if (!startDate) return ''

    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()

    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const years = Math.floor(diffDays / 365)
    const months = Math.floor((diffDays % 365) / 30)

    if (years > 0) {
      return months > 0
        ? `${years} ano${years > 1 ? 's' : ''} ${months} mês${months > 1 ? 'es' : ''}`
        : `${years} ano${years > 1 ? 's' : ''}`
    }
    return `${months} mês${months > 1 ? 'es' : ''}`
  }

  return (
    <div className="timeline-container">
      <div className="timeline-line bg-gray-300 dark:bg-gray-600"></div>
      {experiences.map((experience, index) => (
        <div key={index} className={`timeline-item ${experience.type || 'work'}`}>
          <div className="timeline-card border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-none">
            <div className="timeline-header">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  {/* Logo da Empresa */}
                  {getCompanyLogo(experience.company) && (
                    <div className="flex-shrink-0">
                      <img
                        src={getCompanyLogo(experience.company)}
                        alt={`${experience.company} logo`}
                        className="h-12 w-12 rounded-lg border border-gray-200 bg-white object-contain p-1 shadow-sm dark:border-gray-600"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>
                  )}

                  {/* Informações da Empresa */}
                  <div className="flex-1">
                    <h3 className="timeline-title text-gray-900 dark:text-white">
                      {experience.title}
                    </h3>
                    <div className="timeline-company text-blue-600 dark:text-blue-400">
                      {experience.url ? (
                        <Link
                          href={experience.url}
                          className="company hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          {experience.company}
                        </Link>
                      ) : (
                        experience.company
                      )}
                    </div>
                    {experience.location && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {experience.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="timeline-date text-gray-600 dark:text-gray-300">
                <time>
                  {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                </time>
                {experience.duration && (
                  <div className="timeline-duration text-sm text-gray-500 dark:text-gray-400">
                    {experience.duration}
                  </div>
                )}
              </div>
            </div>

            {experience.summary && (
              <p className="timeline-summary text-gray-600 dark:text-gray-300">
                {experience.summary}
              </p>
            )}

            {experience.highlights && experience.highlights.length > 0 && (
              <ul className="timeline-highlights text-gray-600 dark:text-gray-300">
                {experience.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex}>{highlight}</li>
                ))}
              </ul>
            )}

            {experience.technologies && experience.technologies.length > 0 && (
              <div className="timeline-technologies">
                {experience.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="timeline-tech-tag bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExperienceTimeline
