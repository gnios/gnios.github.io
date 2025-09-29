import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function FourZeroFour() {
  return (
    <>
      <PageSEO title={`Página Não Encontrada - ${siteMetadata.title}`} />
      <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:px-3 md:text-8xl md:leading-14">
            404
          </h1>
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="md:border-l-2 md:px-6">
            <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
              Indisponível Por Motivos Legais
            </p>
            <p className="mb-4">
              Por que mostrar um 404 genérico quando posso torná-lo misterioso? Parece que você encontrou
              algo que costumava existir, ou digitou algo errado. Acho que você digitou
              algo errado. Pode verificar novamente essa URL?
            </p>
            <p>Mas não se preocupe, você pode encontrar muitas outras coisas em nossa página inicial.</p>
          </div>
        </div>
      </div>
      <div className="mt-16 grid place-items-center">
        <Link href="/">
          <button aria-label="Scroll To Top" type="button" className="pushable">
            <span className="shadow"></span>
            <span className="edgeblue"></span>
            <span className="frontblue">Voltar à Página Inicial</span>
          </button>
        </Link>
      </div>
    </>
  )
}
