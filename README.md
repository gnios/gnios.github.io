# Gnios Blog

Meu blog pessoal construído com Next.js, Tailwind CSS e hospedado no GitHub Pages.

## 🚀 Tecnologias

- **Framework**: Next.js 12
- **Styling**: Tailwind CSS
- **Deploy**: GitHub Pages
- **Content**: MDX
- **Icons**: React Icons

## 📝 Funcionalidades

- ✅ Blog com posts em MDX
- ✅ Snippets de código
- ✅ Páginas estáticas (About, Projects, Contact)
- ✅ Tema escuro/claro
- ✅ Responsivo
- ✅ SEO otimizado
- ✅ Hospedagem gratuita no GitHub Pages

## 🛠 Instalação e Desenvolvimento

1. Clone o repositório

```bash
git clone https://github.com/gnios/gnios.github.io.git
cd gnios.github.io
```

2. Instale as dependências

```bash
npm install
```

3. Execute o servidor de desenvolvimento

```bash
npm run dev
```

4. Acesse [http://localhost:3000](http://localhost:3000)

## 📦 Build para Produção

```bash
npm run build
```

O build será gerado na pasta `out/` e pode ser servido estaticamente.

## 🚀 Deploy

O deploy é automático através do GitHub Actions. Toda vez que você fizer push para a branch `main`, o site será automaticamente construído e publicado no GitHub Pages.

## 📁 Estrutura do Projeto

```
├── components/          # Componentes React
├── css/                # Estilos CSS
├── data/               # Dados do site (metadados, autores, posts)
├── layouts/            # Layouts das páginas
├── lib/                # Utilitários
├── pages/              # Páginas do site
├── public/             # Arquivos estáticos
└── scripts/            # Scripts de build
```

## 📝 Personalização

1. **Metadados do site**: Edite `data/siteMetadata.js`
2. **Informações do autor**: Edite `data/authors/default.md`
3. **Posts do blog**: Adicione arquivos `.md` ou `.mdx` em `data/blog/`
4. **Snippets**: Adicione arquivos `.md` ou `.mdx` em `data/snippets/`
5. **Projetos**: Edite `data/projectsData.js`

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

Baseado no template [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) por Timothy Lin.
