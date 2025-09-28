# 🚀 Instruções para o Blog do Gnios

## ✅ O que foi configurado

Seu blog pessoal foi configurado com sucesso! Aqui está o que foi feito:

### 1. Template Base

- ✅ Clonado o template do [pycoder2000/blog](https://github.com/pycoder2000/blog)
- ✅ Configurado para funcionar com GitHub Pages
- ✅ Traduzido para português brasileiro

### 2. Personalização

- ✅ **Site Metadata**: Configurado com suas informações

  - Nome: Gnios
  - LinkedIn: https://www.linkedin.com/in/gnios/
  - GitHub: https://github.com/gnios
  - Site: https://gnios.github.io

- ✅ **Informações do Autor**: Personalizadas em `data/authors/default.md`
- ✅ **Navegação**: Traduzida para português
- ✅ **Artigos**: Criados 3 artigos de exemplo em português:
  - Desenvolvimento Web Moderno
  - Carreira de Desenvolvedor 2024
  - JavaScript Moderno 2024

### 3. Configuração Técnica

- ✅ **Next.js**: Configurado para GitHub Pages
- ✅ **Package.json**: Atualizado com suas informações
- ✅ **Scripts**: Adicionados scripts para deploy
- ✅ **GitHub Actions**: Configurado para deploy automático

## 🚀 Como usar

### Desenvolvimento Local

```bash
# Instalar dependências (já feito)
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Abrir http://localhost:3000 no navegador
```

### Criar Novo Artigo

```bash
# Usar o script de composição
node ./scripts/compose.js

# Ou criar manualmente em data/blog/
```

### Deploy para GitHub Pages

```bash
# Fazer commit das mudanças
git add .
git commit -m "Atualiza blog"
git push origin main

# O GitHub Actions fará o deploy automaticamente
```

## 📁 Estrutura de Arquivos Importantes

```
data/
├── siteMetadata.js     # Configurações do site
├── authors/
│   └── default.md      # Suas informações
├── blog/               # Seus artigos
│   ├── desenvolvimento-web-moderno.mdx
│   ├── carreira-desenvolvedor-2024.mdx
│   └── javascript-moderno-2024.mdx
└── headerNavLinks.js   # Links de navegação

public/static/
├── images/             # Suas imagens
└── favicons/           # Favicons do site
```

## 🎨 Personalização

### Adicionar Novo Artigo

1. Crie um arquivo `.mdx` em `data/blog/`
2. Use o front matter:

```markdown
---
title: 'Título do Artigo'
date: '2024-01-15'
tags: ['tag1', 'tag2']
draft: false
summary: 'Resumo do artigo'
images: ['/static/images/Blog/imagem.jpg']
authors: ['default']
---

Conteúdo do artigo aqui...
```

### Alterar Informações Pessoais

- **Site**: `data/siteMetadata.js`
- **Autor**: `data/authors/default.md`
- **Projetos**: `data/projectsData.js`

### Adicionar Imagens

- Coloque as imagens em `public/static/images/`
- Use o caminho `/static/images/nome-da-imagem.jpg`

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run build           # Build de produção
npm run export          # Export para GitHub Pages
npm run lint            # Verificar código

# Deploy
npm run deploy          # Deploy manual (se necessário)
```

## 📝 Próximos Passos

1. **Substitua o avatar**: Coloque sua foto em `public/static/images/avatar.png`
2. **Adicione seu logo**: Substitua `data/logo.svg`
3. **Crie mais artigos**: Use o script `node ./scripts/compose.js`
4. **Configure comentários**: Adicione as variáveis do Giscus no `.env.local`
5. **Personalize o design**: Modifique `tailwind.config.js` e `css/tailwind.css`

## 🌐 Deploy

O blog será automaticamente deployado quando você fizer push para o branch `main`. O site ficará disponível em:

- **URL**: https://gnios.github.io
- **Repositório**: https://github.com/gnios/gnios.github.io

## 🆘 Suporte

Se precisar de ajuda:

1. Consulte a documentação do [template original](https://github.com/timlrx/tailwind-nextjs-starter-blog)
2. Verifique os [issues do repositório](https://github.com/gnios/gnios.github.io/issues)
3. Consulte a documentação do [Next.js](https://nextjs.org/docs)

---

**Parabéns! Seu blog está pronto para uso! 🎉**
