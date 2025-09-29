const fs = require('fs')
const path = require('path')

// Função para processar experiências e criar timeline
function generateExperienceTimeline() {
  try {
    // Ler o arquivo resume.json
    const resumePath = path.join(__dirname, '..', 'data', 'resume.json')
    const resumeData = JSON.parse(fs.readFileSync(resumePath, 'utf8'))

    const experiences = []

    // Processar experiências de trabalho
    resumeData.work.forEach((work, index) => {
      const startDate = work.startDate
      const endDate = work.endDate || null

      // Calcular duração
      const duration = calculateDuration(startDate, endDate)

      experiences.push({
        type: 'work',
        title: work.position,
        company: work.name,
        location: work.location || '',
        url: work.url || '',
        startDate: startDate,
        endDate: endDate,
        duration: duration,
        summary: work.summary,
        highlights: work.highlights || [],
        technologies: extractTechnologies(work.highlights || []),
      })
    })

    // Processar educação
    resumeData.education.forEach((edu, index) => {
      const startDate = edu.startDate
      const endDate = edu.endDate || null

      experiences.push({
        type: 'education',
        title: edu.area,
        company: edu.institution,
        location: edu.location || '',
        url: edu.url || '',
        startDate: startDate,
        endDate: endDate,
        duration: calculateDuration(startDate, endDate),
        summary: edu.description || '',
        highlights: edu.courses || [],
        technologies: [],
      })
    })

    // Processar prêmios
    resumeData.awards.forEach((award, index) => {
      experiences.push({
        type: 'award',
        title: award.title,
        company: award.awarder || '',
        location: '',
        url: '',
        startDate: award.date,
        endDate: null,
        duration: '',
        summary: award.summary || '',
        highlights: [],
        technologies: [],
      })
    })

    // Ordenar por data (mais recente primeiro)
    experiences.sort((a, b) => {
      const dateA = new Date(a.startDate || a.date || 0)
      const dateB = new Date(b.startDate || b.date || 0)
      return dateB - dateA
    })

    // Salvar dados processados
    const outputPath = path.join(__dirname, '..', 'data', 'experienceTimelineData.js')
    const content = `const experienceTimelineData = ${JSON.stringify(experiences, null, 2)};

export default experienceTimelineData;
`

    fs.writeFileSync(outputPath, content, 'utf8')

    console.log('✅ Timeline de experiências gerada com sucesso!')
    console.log(`📄 Arquivo salvo em: ${outputPath}`)
    console.log(`📊 Total de experiências: ${experiences.length}`)

    // Mostrar resumo
    console.log('\n📋 RESUMO DAS EXPERIÊNCIAS:')
    console.log('='.repeat(60))
    experiences.forEach((exp, index) => {
      console.log(`${index + 1}. ${exp.title} - ${exp.company}`)
      console.log(`   Período: ${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`)
      console.log(`   Duração: ${exp.duration}`)
      console.log('')
    })
  } catch (error) {
    console.error('❌ Erro ao gerar timeline de experiências:', error.message)
  }
}

// Função para calcular duração
function calculateDuration(startDate, endDate) {
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

// Função para formatar data
function formatDate(dateString) {
  if (!dateString) return 'Presente'
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
  })
}

// Função para extrair tecnologias dos highlights
function extractTechnologies(highlights) {
  const techKeywords = [
    '.NET Core',
    'ASP.NET',
    'C#',
    'React',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'MongoDB',
    'SQL Server',
    'PostgreSQL',
    'MySQL',
    'AWS',
    'Azure',
    'Docker',
    'Git',
    'GraphQL',
    'REST API',
    'Entity Framework',
    'NHibernate',
    'jQuery',
    'Bootstrap',
    'HTML',
    'CSS',
    'Tailwind CSS',
    'Next.js',
    'Vue.js',
    'Express.js',
    'WCF',
    'WebForms',
    'ASP.NET MVC',
  ]

  const foundTechs = new Set()

  highlights.forEach((highlight) => {
    techKeywords.forEach((tech) => {
      if (highlight.toLowerCase().includes(tech.toLowerCase())) {
        foundTechs.add(tech)
      }
    })
  })

  return Array.from(foundTechs).slice(0, 8) // Limitar a 8 tecnologias
}

// Executar geração
generateExperienceTimeline()
