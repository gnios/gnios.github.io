import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { RoughNotation } from 'react-rough-notation'
import NewsletterForm from '@/components/NewsletterForm'
import ViewCounter from '@/components/ViewCounter'
import NoSSR from '@/components/NoSSR'
import ReactResume from '@/components/ReactResume'
import resumeData from '@/data/resume.json'

const MAX_DISPLAY = 3

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO 
        title={`${resumeData.basics.name} - ${resumeData.basics.label}`} 
        description={resumeData.basics.summary} 
      />
      <div className="min-h-screen bg-gray-100 py-8 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <ReactResume />
        </div>
      </div>
    </>
  )
}