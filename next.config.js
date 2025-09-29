// Configuração simplificada para GitHub Pages
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/gnios.github.io' : ''

module.exports = {
  reactStrictMode: true,
  basePath: basePath,
  assetPrefix: basePath || undefined,
  output: isProd ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      'i.scdn.co',
      'pbs.twimg.com',
      'cdn.discordapp.com',
      'avatars.githubusercontent.com',
      'github.com',
      's3.us-west-2.amazonaws.com',
      'via.placeholder.com',
      'images.unsplash.com',
      'dwgyu36up6iuz.cloudfront.net',
      'cdn.hashnode.com',
      'res.craft.do',
      'res.cloudinary.com',
    ],
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['pages', 'components', 'lib', 'layouts', 'scripts'],
  },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
