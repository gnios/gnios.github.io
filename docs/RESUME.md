# Sistema de Currículo JSON Resume

Este projeto implementa um sistema completo de currículo baseado no padrão JSON Resume, permitindo manter o currículo em formato JSON e gerar tanto a versão web quanto PDFs usando os temas oficiais do JSON Resume.

## 📁 Estrutura de Arquivos

```
data/
├── resume.json                    # Dados do currículo em formato JSON Resume
components/
├── JSONResumeViewer.js           # Visualizador de currículo com temas JSON Resume
├── JSONResume.js                 # Componente React customizado (legado)
pages/
├── resume.js                     # Página do currículo
├── api/resume.js                 # API para servir dados do currículo
├── api/resume/regenerate.js      # API para regenerar arquivos HTML
scripts/
├── generate-resume-pdf.js        # Script para gerar PDFs
├── generate-resume-html.js       # Script para gerar HTMLs
public/
├── resume/                       # PDFs gerados
│   ├── resume-elegant.pdf
│   ├── resume-modern.pdf
│   └── resume-kendall.pdf
└── resume-html/                  # HTMLs gerados
    ├── resume-elegant.html
    ├── resume-modern.html
    └── resume-kendall.html
```

## 🚀 Como Usar

### 1. Visualizar o Currículo

Acesse `/resume` no seu site para ver a versão web do currículo com:

- **Seletor de temas** (Elegant, Modern, Kendall)
- **Visualização direta** dos HTMLs gerados pelo JSON Resume
- **Download de PDFs** para cada tema
- **Botão de atualização** para regenerar arquivos

### 2. Gerar Arquivos

Execute os comandos para gerar PDFs e HTMLs:

```bash
# Gerar apenas PDFs
npm run resume:pdf

# Gerar apenas HTMLs
npm run resume:html

# Gerar ambos (PDFs e HTMLs)
npm run resume:generate
```

Isso gerará arquivos nas pastas:

- `public/resume/` - PDFs com temas JSON Resume
- `public/resume-html/` - HTMLs com temas JSON Resume

### 3. Servir Currículo Localmente

Para visualizar o currículo com tema específico localmente:

```bash
npm run resume:serve
```

### 4. Validar JSON

Para validar se o arquivo JSON está correto:

```bash
npm run resume:validate
```

## 🎨 Temas Disponíveis

- **Elegant**: Design clássico e profissional
- **Modern**: Estilo contemporâneo
- **Kendall**: Layout moderno com cores

## 📝 Editando o Currículo

Edite o arquivo `data/resume.json` seguindo o padrão JSON Resume:

```json
{
  "basics": {
    "name": "Seu Nome",
    "label": "Sua Profissão",
    "email": "seu@email.com",
    "summary": "Resumo profissional...",
    "profiles": [
      {
        "network": "GitHub",
        "username": "seuusuario",
        "url": "https://github.com/seuusuario"
      }
    ]
  },
  "work": [
    {
      "name": "Empresa",
      "position": "Cargo",
      "startDate": "2020-01-01",
      "endDate": "",
      "summary": "Descrição do trabalho...",
      "highlights": ["Realização 1", "Realização 2"]
    }
  ]
}
```

## 🔧 Personalização

### Adicionando Novos Temas

1. Instale o tema:

```bash
npm install --save-dev jsonresume-theme-nome-do-tema
```

2. Adicione ao array `themes` em `scripts/generate-resume-pdf.js`

3. Adicione ao array `themes` em `components/JSONResume.js`

### Modificando o Layout

Edite o componente `JSONResume.js` para personalizar a aparência da versão web.

## 📋 Especificação JSON Resume

O JSON Resume segue um padrão específico com seções:

- `basics`: Informações básicas (nome, contato, etc.)
- `work`: Experiência profissional
- `education`: Formação acadêmica
- `skills`: Habilidades técnicas
- `projects`: Projetos pessoais
- `languages`: Idiomas
- `interests`: Interesses
- `volunteer`: Trabalho voluntário
- `awards`: Prêmios e reconhecimentos
- `certificates`: Certificações
- `publications`: Publicações
- `references`: Referências

## 🌐 Integração com o Site

O currículo está integrado ao site Next.js:

1. **Navegação**: Link "Currículo" no menu principal
2. **API**: Endpoint `/api/resume` para servir dados
3. **SEO**: Meta tags otimizadas para a página
4. **Responsivo**: Layout adaptável para mobile e desktop

## 📱 Funcionalidades

- ✅ Visualização web responsiva
- ✅ Geração de PDFs com múltiplos temas
- ✅ Download de PDFs
- ✅ Validação de JSON
- ✅ Integração com API
- ✅ SEO otimizado
- ✅ Dark mode support
- ✅ Navegação integrada

## 🛠️ Comandos Úteis

```bash
# Gerar todos os PDFs
npm run resume:pdf

# Gerar todos os HTMLs
npm run resume:html

# Gerar PDFs e HTMLs
npm run resume:generate

# Servir currículo localmente
npm run resume:serve

# Validar JSON
npm run resume:validate

# Desenvolvimento
npm run dev

# Build do site
npm run build
```

## 🌟 Funcionalidades Principais

### Visualização Web

- ✅ **Temas JSON Resume oficiais** - Elegant, Modern, Kendall
- ✅ **Seletor de temas** - Troque entre temas instantaneamente
- ✅ **Visualização responsiva** - Funciona em desktop e mobile
- ✅ **Dark mode support** - Suporte a tema escuro
- ✅ **Loading states** - Indicadores de carregamento
- ✅ **Error handling** - Tratamento de erros elegante

### Geração de Arquivos

- ✅ **PDFs com temas** - Geração automática de PDFs
- ✅ **HTMLs com temas** - Geração de HTMLs para web
- ✅ **Validação JSON** - Verificação de schema
- ✅ **API de regeneração** - Atualização via interface web

### Integração

- ✅ **API REST** - Endpoints para dados e regeneração
- ✅ **Navegação integrada** - Link no menu principal
- ✅ **SEO otimizado** - Meta tags apropriadas
- ✅ **Fallback robusto** - Dados estáticos como backup

## 📚 Recursos Adicionais

- [JSON Resume Schema](https://jsonresume.org/schema/)
- [Temas Disponíveis](https://jsonresume.org/themes/)
- [Resume CLI](https://github.com/jsonresume/resume-cli)
- [Documentação Oficial](https://jsonresume.org/)
