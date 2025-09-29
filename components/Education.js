import Link from '@/components/Link'

export default function Education({ educationData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Educação</h2>
      <div className="space-y-6">
        {educationData.map((education, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md dark:border-gray-700"
          >
            <div className="mb-4 flex flex-col md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {education.degree}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">{education.institution}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {education.location} • {education.period}
                </p>
              </div>
            </div>

            <p className="mb-4 text-gray-700 dark:text-gray-300">{education.description}</p>

            {education.courses && education.courses.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Cursos e Especializações:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {education.courses.map((course, courseIndex) => (
                    <span
                      key={courseIndex}
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
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
