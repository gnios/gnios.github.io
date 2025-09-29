const fs = require('fs')
const path = require('path')

// Função para extrair conteúdo do currículo
function extractResumeContent() {
  try {
    // Ler o arquivo resume.json
    const resumePath = path.join(__dirname, '..', 'data', 'resume.json')
    const resumeData = JSON.parse(fs.readFileSync(resumePath, 'utf8'))

    console.log('='.repeat(80))
    console.log('📋 CONTEÚDO COMPLETO DO CURRÍCULO')
    console.log('='.repeat(80))

    // Informações básicas
    console.log('\n👤 INFORMAÇÕES BÁSICAS')
    console.log('-'.repeat(40))
    console.log(`Nome: ${resumeData.basics.name}`)
    console.log(`Cargo: ${resumeData.basics.label}`)
    console.log(`Email: ${resumeData.basics.email}`)
    console.log(`Website: ${resumeData.basics.url}`)
    console.log(
      `Localização: ${resumeData.basics.location.city}, ${resumeData.basics.location.region}`
    )
    console.log(`\nResumo Profissional:`)
    console.log(resumeData.basics.summary)

    // Perfis sociais
    console.log('\n🔗 PERFIS SOCIAIS')
    console.log('-'.repeat(40))
    resumeData.basics.profiles.forEach((profile) => {
      console.log(`${profile.network}: ${profile.url}`)
    })

    // Experiências profissionais
    console.log('\n💼 EXPERIÊNCIAS PROFISSIONAIS')
    console.log('-'.repeat(40))
    resumeData.work.forEach((work, index) => {
      console.log(`\n${index + 1}. ${work.position} - ${work.name}`)
      console.log(
        `   Período: ${work.startDate} ${work.endDate ? `- ${work.endDate}` : '- Presente'}`
      )
      console.log(`   URL: ${work.url}`)
      console.log(`   Resumo: ${work.summary}`)
      console.log('   Principais realizações:')
      work.highlights.forEach((highlight) => {
        console.log(`   • ${highlight}`)
      })
    })

    // Educação
    console.log('\n🎓 EDUCAÇÃO')
    console.log('-'.repeat(40))
    resumeData.education.forEach((edu, index) => {
      console.log(`\n${index + 1}. ${edu.area} - ${edu.institution}`)
      console.log(`   Tipo: ${edu.studyType}`)
      console.log(`   Período: ${edu.startDate} ${edu.endDate ? `- ${edu.endDate}` : '- Presente'}`)
      console.log(`   Descrição: ${edu.description || 'N/A'}`)
      console.log('   Cursos:')
      edu.courses.forEach((course) => {
        console.log(`   • ${course}`)
      })
    })

    // Habilidades
    console.log('\n🛠️ HABILIDADES TÉCNICAS')
    console.log('-'.repeat(40))
    resumeData.skills.forEach((skillGroup) => {
      console.log(`\n${skillGroup.name} (${skillGroup.level}):`)
      skillGroup.keywords.forEach((keyword) => {
        console.log(`  • ${keyword}`)
      })
    })

    // Idiomas
    console.log('\n🌍 IDIOMAS')
    console.log('-'.repeat(40))
    resumeData.languages.forEach((lang) => {
      console.log(`• ${lang.language}: ${lang.fluency}`)
    })

    // Projetos
    console.log('\n🚀 PROJETOS')
    console.log('-'.repeat(40))
    resumeData.projects.forEach((project, index) => {
      console.log(`\n${index + 1}. ${project.name}`)
      console.log(`   Descrição: ${project.description}`)
      console.log(`   URL: ${project.url || 'N/A'}`)
      console.log(`   GitHub: ${project.github || 'N/A'}`)
      console.log('   Principais características:')
      project.highlights.forEach((highlight) => {
        console.log(`   • ${highlight}`)
      })
      console.log('   Tecnologias:')
      project.keywords.forEach((keyword) => {
        console.log(`   • ${keyword}`)
      })
    })

    // Interesses
    console.log('\n🎯 INTERESSES')
    console.log('-'.repeat(40))
    resumeData.interests.forEach((interest) => {
      console.log(`\n${interest.name}:`)
      interest.keywords.forEach((keyword) => {
        console.log(`  • ${keyword}`)
      })
    })

    console.log('\n' + '='.repeat(80))
    console.log('✅ Extração concluída! Use essas informações para comparar com seu LinkedIn.')
    console.log('='.repeat(80))
  } catch (error) {
    console.error('❌ Erro ao extrair conteúdo do currículo:', error.message)
  }
}

// Executar extração
extractResumeContent()
