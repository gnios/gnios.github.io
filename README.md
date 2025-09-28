<div align="center">
  <img alt="Logo" src="https://github.com/pycoder2000/blog/raw/master/public/static/images/logo.png" width="100" />
</div>

<h1 align="center">
  Blog do Gnios
</h1>

<p align="center">
  Este é meu blog pessoal onde compartilho pensamentos sobre tecnologia, desenvolvimento e inovação. Construído com <a href="https://nextjs.org/" target="_blank">Next.js</a>, <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a> e hospedado no <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>.
</p>

<p align="center">
  O template original foi criado por <a href="https://github.com/timlrx" target="_blank">Timothy Lin</a> e pode ser encontrado <a href="https://github.com/timlrx/tailwind-nextjs-starter-blog" target="_blank">aqui</a>. Este projeto é baseado no template do <a href="https://github.com/pycoder2000/blog" target="_blank">pycoder2000/blog</a>.
</p>

<div align="center">

<a href="https://gnios.github.io/" target="blank" >![Ver Site](https://img.shields.io/badge/-Ver%20Site%20-orange?color=%23DE1D8D&style=for-the-badge)</a> <a href="https://github.com/gnios/gnios.github.io/issues/new?assignees=&labels=bug&template=bug_report.md&title=">![Reportar Bug](https://img.shields.io/badge/-Reportar%20Bug%20-orange?color=%23ee0701&style=for-the-badge)</a> <a href="https://github.com/gnios/gnios.github.io/issues/new?assignees=&labels=&template=feature_request.md&title=">![Solicitar Feature](https://img.shields.io/badge/-Solicitar%20Feature%20-orange?color=%230e8a16&style=for-the-badge)</a>

</div>

<div align="center">

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-000000.svg?style=for-the-badge&logo=github&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![MDX](https://img.shields.io/badge/MDX-1a1a1a?style=for-the-badge&logo=mdx&logoColor=white)

</div>

## 🛠 Instalação e Configuração

1. Clone este repositório

   ```sh
   git clone https://github.com/gnios/gnios.github.io.git
   ```

2. Entre no diretório

   ```sh
   cd gnios.github.io
   ```

3. Instale as dependências

   ```sh
   npm install
   ```

4. Inicie o servidor de desenvolvimento

   ```sh
   npm run dev
   ```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🏗️ Build e Deploy

1. Gere o build de produção

   ```sh
   npm run build
   ```

2. Exporte para GitHub Pages

   ```sh
   npm run export
   ```

3. Faça push para o branch `gh-pages`

   ```sh
   git subtree push --prefix out origin gh-pages
   ```

## 👨‍🎨️ Personalização

1. Personalize `data/siteMetadata.js` (informações do site)
2. Modifique `data/authors/default.md` (informações do autor)
3. Atualize `data/projectsData.js` (projetos)
4. Customize `data/headerNavLinks.js` (links de navegação)
5. Adicione posts no diretório `data/blog`

## 📝 Arquivos para personalizar

- `data/siteMetadata.js` - contém as informações principais do site
- `data/authors/default.md` - informações do autor principal
- `data/projectsData.js` - dados dos projetos exibidos na página de projetos
- `data/headerNavLinks.js` - links de navegação
- `data/logo.svg` - substitua pelo seu próprio logo
- `data/blog` - substitua pelos seus próprios posts
- `public/static` - armazene assets como imagens e favicons

## 🔨 Criar Novo Post

Execute `node ./scripts/compose.js` para criar um novo post.

Siga o prompt interativo para gerar um post com front matter pré-preenchido.

## 📚 Stack Tecnológico

| Ferramenta  | Link                                                      |
| ----------- | --------------------------------------------------------- |
| Framework   | [Next.js](https://nextjs.org/)                            |
| Estilização | [Tailwind CSS](https://tailwindcss.com/)                  |
| Conteúdo    | [MDX](https://mdxjs.com/)                                 |
| Deploy      | [GitHub Pages](https://pages.github.com/)                 |
| Favicon     | [realfavicongenerator](https://realfavicongenerator.net/) |

## 🪜 Estrutura do Projeto

```bash
📦 root
├── 🗂️ components             # Componentes React para customizar o site
├── 🗂️ css                    # Arquivos CSS do Tailwind
├── 🗂️ data                   # Arquivos para alterar o conteúdo das páginas
│ ├── 🗂️ authors              # Arquivos Markdown dos autores do blog
│ ├── 🗂️ blog                 # Arquivos Markdown dos posts do blog
│ └── 🗂️ snippets             # Arquivos Markdown dos snippets de código
├── 🗂️ layouts                # Templates das páginas
├── 🗂️ lib                    # Módulos não-React
├── 🗂️ pages                  # Arquivos de páginas do site
├── 🗂️ public                 # Arquivos estáticos para imagens, rss e assets
│ ├── 🗂️ static               # Contém imagens, favicons e outros assets
│ │ ├── 🗂️ favicon            # Arquivos de favicon
│ │ └── 🗂️ images             # Arquivos de Imagem
│ ├── 📝 feed.xml             # Feed RSS
│ ├── 📝 robots.txt           # Ajuda crawlers a indexar seu site
│ └── 📝 sitemap.xml          # Sitemap
├── 🗂️ scripts                # Scripts para diferentes tarefas
├── 📝 tailwind.config.js     # Contém a configuração do Tailwind
└── 📝 next.config.js         # Configuração do Next.js
```

## 🚀 Deploy

**GitHub Pages**  
A forma mais fácil de fazer deploy é usar o GitHub Pages. O site será automaticamente atualizado sempre que você fizer push para o branch `main`.

1. Faça push do seu código para o repositório
2. Vá para Settings > Pages no GitHub
3. Selecione o branch `gh-pages` como fonte
4. Seu site estará disponível em `https://seuusername.github.io/nome-do-repo`

## 🍰 Contribuindo

Contribuições são o que tornam a comunidade open source um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

Se você tem uma sugestão que tornaria isso melhor, por favor faça fork do repo e crie um pull request. Você também pode simplesmente abrir uma issue com a tag "enhancement".
Não esqueça de dar uma estrela no projeto! Obrigado novamente!

1. Faça Fork do Projeto
2. Commit suas Mudanças

   ```bash
   git commit -m 'Adiciona alguma Feature'
   ```

3. Push para a Branch

   ```bash
   git push origin main
   ```

4. Abra um Pull Request

<div align="center">

<a href="https://makeapullrequest.com" target="blank" >![PRs Welcome](https://img.shields.io/badge/PR-Welcome-brightgreen?style=for-the-badge)</a>

</div>
