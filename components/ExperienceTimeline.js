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
                <h3 className="timeline-title text-gray-900 dark:text-white">{experience.title}</h3>
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
