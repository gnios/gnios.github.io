import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function About() {
  return (
    <>
      <PageSEO title={`Sobre – ${siteMetadata.author}`} description="Sobre Eugênio Tavares" />
      <div className="mx-auto max-w-2xl px-8 py-16">
        <div className="mb-10 flex items-center gap-6">
          <img
            src="/static/images/avatar.png"
            alt="Eugênio Tavares"
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-ink dark:text-wash-subtle">
              Eugênio Tavares
            </h1>
            <p className="mt-1 text-[15px] text-ink-light">Staff Software Engineer · Stone</p>
          </div>
        </div>

        <div className="space-y-4 text-[15px] leading-relaxed text-ink-light dark:text-[#aaa]">
          <p>
            Engenheiro de software com mais de 10 anos de experiência construindo sistemas e
            aplicações financeiras. Trabalho hoje como Staff Engineer na Stone, onde lidero
            iniciativas técnicas, defino padrões arquiteturais e ajudo times a entregar software de
            qualidade em escala.
          </p>
          <p>
            Meu background é forte em .NET / C# e ecossistema Microsoft, mas me sinto igualmente à
            vontade com React, APIs GraphQL e arquiteturas distribuídas. Tenho expertise em
            Inteligência Artificial, Liderança Técnica, DDD (Domain-Driven Design) e Arquitetura
            de Software. Gosto de problemas difíceis, de mentorar engenheiros e de simplificar o
            que parece complicado.
          </p>
          <p>
            Formado em Engenharia da Computação pela UECE (Universidade Estadual do Ceará) e
            baseado em São Paulo, Brasil.
          </p>
          <p>Esse blog é onde compartilho o que aprendo no dia a dia.</p>
        </div>

        <div className="mt-10 flex gap-4">
          <a
            href="https://github.com/gnios"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-stroke px-4 py-2 text-[14px] font-medium text-ink-light transition-colors hover:border-ink hover:text-ink dark:border-[#333] dark:text-[#888] dark:hover:border-[#666] dark:hover:text-wash-subtle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/gnios/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-stroke px-4 py-2 text-[14px] font-medium text-ink-light transition-colors hover:border-ink hover:text-ink dark:border-[#333] dark:text-[#888] dark:hover:border-[#666] dark:hover:text-wash-subtle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </>
  )
}
