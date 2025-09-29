// Componente simplificado para GitHub Pages - sem funcionalidade de newsletter
const NewsletterForm = ({ title = 'Inscreva-se na newsletter' }) => {
  return (
    <div>
      <div className="text-md pb-1 pt-8 text-gray-800 dark:text-gray-100">{title}</div>
      <div className="text-center text-gray-500 dark:text-gray-400">
        <p>Newsletter não disponível no GitHub Pages</p>
        <p className="text-sm">Entre em contato através das redes sociais</p>
      </div>
    </div>
  )
}

export default NewsletterForm

export const BlogNewsletterForm = ({ title }) => (
  <div className="flex items-center justify-center">
    <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
      <NewsletterForm title={title} />
    </div>
  </div>
)
