import { useState } from 'react'

export default function Skills({ skillsData }) {
  const [expandedCategory, setExpandedCategory] = useState(null)

  const toggleCategory = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index)
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'Avançado':
        return 'bg-green-500'
      case 'Intermediário':
        return 'bg-yellow-500'
      case 'Básico':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Habilidades</h2>
      <div className="space-y-4">
        {skillsData.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md dark:border-gray-700"
          >
            <button
              onClick={() => toggleCategory(categoryIndex)}
              className="flex w-full items-center justify-between text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {category.category}
              </h3>
              <svg
                className={`h-5 w-5 transform transition-transform ${
                  expandedCategory === categoryIndex ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {expandedCategory === categoryIndex && (
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {skill.name}
                    </span>
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
                                ? getLevelColor(skill.level)
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
