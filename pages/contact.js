import siteMetadata from '@/data/siteMetadata'
import ContactLink from '@/components/ContactLink'
import { PageSEO } from '@/components/SEO'

const Contact = () => {
  return (
    <>
      <PageSEO title={`Contato - ${siteMetadata.author}`} description="Todos os meus contatos" />
      <div className="mx-auto max-w-3xl overflow-hidden">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Contato
        </h1>
        <div className="pb-8 pt-10">
          <ul className="font-semi-bold flex flex-col space-y-4">
            <ContactLink
              href="mailto:contato@gnios.dev"
              title="gmail"
              icon="contato@gnios.dev"
            />
            <ContactLink href="https://github.com/gnios" title="github" icon="gnios" />
            <ContactLink
              href="https://twitter.com/gnios_dev"
              title="twitter"
              icon="gnios_dev"
            />
            <ContactLink
              href="https://www.linkedin.com/in/gnios/"
              title="linkedin"
              icon="gnios"
            />
          </ul>
        </div>
      </div>
    </>
  )
}

export default Contact
