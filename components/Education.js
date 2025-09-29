import Link from '@/components/Link'

export default function Education({ educationData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Educação</h2>
      <div className="space-y-6">
        {educationData.map((education, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {education.degree}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {education.institution}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {education.location} • {education.period}
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {education.description}
            </p>
            
            {education.courses && education.courses.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Cursos e Especializações:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {education.courses.map((course, courseIndex) => (
                    <span
                      key={courseIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
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
  )
}
