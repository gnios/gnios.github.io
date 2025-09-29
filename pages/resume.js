import { PageSEO } from '@/components/SEO'
import ReactResume from '@/components/ReactResume'
import resumeData from '@/data/resume.json'

export default function Resume() {
  return (
    <>
      <PageSEO 
        title={`Currículo - ${resumeData.basics.name}`} 
        description={`Currículo profissional de ${resumeData.basics.name}, ${resumeData.basics.label}`} 
      />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <ReactResume />
        </div>
      </div>
    </>
  )
}
