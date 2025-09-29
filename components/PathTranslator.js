const pathTranslations = {
  '/': 'início',
  '/blog': 'blog',
  '/snippets': 'snippets',
  '/projects': 'projetos',
  '/resume': 'sobre-mim',
  '/contact': 'contato',
  '/now': 'agora',
  '/stats': 'estatísticas',
  '/activity': 'atividade',
  '/recommends': 'recomendações',
  '/journey': 'jornada',
  '/quotes': 'citações',
  '/tweets': 'tweets',
  '/tags': 'tags',
  '/about': 'sobre',
}

const translatePath = (path) => {
  // Remove query parameters and hash
  const cleanPath = path.split('?')[0].split('#')[0]
  
  // If it's an exact match, return the translation
  if (pathTranslations[cleanPath]) {
    return pathTranslations[cleanPath]
  }
  
  // For dynamic routes like /blog/[slug], try to match the base path
  const pathSegments = cleanPath.split('/').filter(Boolean)
  if (pathSegments.length > 0) {
    const basePath = `/${pathSegments[0]}`
    if (pathTranslations[basePath]) {
      return pathTranslations[basePath]
    }
  }
  
  // For nested paths, translate each segment
  const translatedSegments = pathSegments.map(segment => {
    const fullPath = `/${segment}`
    return pathTranslations[fullPath] || segment
  })
  
  return translatedSegments.join('/')
}

export default translatePath
