const siteMetadata = {
  title: 'Gnios | Desenvolvedor Full Stack',
  author: 'Gnios',
  headerTitle: 'Gnios - Desenvolvedor Full Stack',
  description:
    'Desenvolvedor Full Stack apaixonado por tecnologia. Blog pessoal com artigos sobre desenvolvimento web, projetos e experiências na área de tecnologia.',
  snippets: 'Snippets de código reutilizáveis e tutoriais de programação por Gnios',
  language: 'pt-br',
  theme: 'system', // system, dark or light
  siteUrl: 'https://gnios.github.io',
  siteRepo: 'https://github.com/gnios/gnios.github.io',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'contato@gnios.dev',
  github: 'https://github.com/gnios',
  twitter: 'https://twitter.com/gnios_dev',
  linkedin: 'https://www.linkedin.com/in/gnios/',
  website: 'https://gnios.github.io',
  locale: 'pt-BR',
  analytics: {
    plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: 'G-F6V2QTJ628', // e.g. UA-000000-2 or G-XXXXXXX
  },
  newsletter: {
    provider: 'emailOctopus',
  },
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      inputPosition: 'bottom',
      lang: 'pt',
      darkTheme: 'dark',
      themeURL: '',
    },
  },
  socialAccount: {
    twitter: '_ParthDesai_',
  },
}

module.exports = siteMetadata
