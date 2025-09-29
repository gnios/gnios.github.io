# Sistema de Currículo com React-PDF

Este projeto implementa um sistema moderno de currículo usando React-PDF, permitindo visualização direta no site e download de PDF com design profissional e responsivo.

## 🎯 **Funcionalidades Principais**

- ✅ **Visualização no site** - Currículo exibido diretamente no navegador
- ✅ **Download de PDF** - Geração e download de PDF nativo
- ✅ **Design moderno** - Layout profissional e responsivo
- ✅ **Dados dinâmicos** - Baseado em arquivo JSON
- ✅ **Integração Next.js** - Perfeitamente integrado ao site
- ✅ **Dark mode** - Suporte a tema escuro
- ✅ **Mobile friendly** - Responsivo para todos os dispositivos

## 📁 **Estrutura de Arquivos**

```
components/
├── ResumePDF.js          # Componente PDF com React-PDF
├── ResumeViewer.js       # Visualizador principal do site
pages/
├── resume.js             # Página do currículo
data/
├── resume.json           # Dados do currículo
css/
├── extra.css             # Estilos específicos
```

## 🚀 **Como Usar**

### 1. Visualizar o Currículo

Acesse `/resume` no seu site para:

- Ver preview do currículo
- Visualizar PDF completo no navegador
- Baixar PDF para uso offline

### 2. Editar o Currículo

Modifique o arquivo `data/resume.json` com suas informações:

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
      "summary": "Descrição do trabalho...",
      "highlights": ["Realização 1", "Realização 2"]
    }
  ]
}
```

### 3. Personalizar Design

Edite `components/ResumePDF.js` para modificar:

- Layout e estrutura
- Cores e tipografia
- Seções e organização
- Estilos específicos

## 🎨 **Características do Design**

### Layout PDF

- **Formato A4** - Padrão profissional
- **Duas colunas** - Otimização de espaço
- **Tipografia limpa** - Helvetica para legibilidade
- **Cores profissionais** - Azul e cinza
- **Seções organizadas** - Experiência, educação, habilidades

### Interface Web

- **Header gradiente** - Visual moderno
- **Botões interativos** - Ver PDF e Download
- **Estatísticas** - Resumo visual
- **Preview** - Informações principais
- **Instruções** - Guia de uso

## 🔧 **Tecnologias Utilizadas**

- **React-PDF** - Geração de PDFs
- **Next.js** - Framework React
- **Tailwind CSS** - Estilização
- **React Icons** - Ícones
- **JSON** - Dados estruturados

## 📱 **Responsividade**

- **Desktop** - Layout completo com duas colunas
- **Tablet** - Adaptação de espaçamentos
- **Mobile** - Layout em coluna única
- **PDF Viewer** - Altura ajustável

## 🌟 **Vantagens sobre JSON Resume**

1. **Controle total** - Design completamente personalizável
2. **Integração nativa** - Funciona perfeitamente com React/Next.js
3. **Performance** - Geração de PDF no cliente
4. **Flexibilidade** - Fácil de modificar e estender
5. **Moderno** - Interface atual e profissional
6. **Responsivo** - Funciona em todos os dispositivos

## 🛠️ **Comandos de Desenvolvimento**

```bash
# Desenvolvimento
npm run dev

# Build do site
npm run build

# Linting
npm run lint
```

## 📋 **Estrutura do PDF**

### Seções Incluídas

- **Header** - Nome, profissão, contato
- **Resumo** - Descrição profissional
- **Experiência** - Trabalhos e projetos
- **Educação** - Formação acadêmica
- **Habilidades** - Competências técnicas
- **Idiomas** - Línguas faladas
- **Projetos** - Trabalhos pessoais

### Layout

- **Coluna esquerda** - Experiência e educação
- **Coluna direita** - Habilidades, idiomas e projetos
- **Header** - Informações de contato
- **Resumo** - Texto introdutório

## 🎯 **Próximas Melhorias**

- [ ] Múltiplos templates de design
- [ ] Seletor de cores
- [ ] Exportação em outros formatos
- [ ] Integração com LinkedIn
- [ ] Analytics de visualização
- [ ] Compartilhamento social

## 📚 **Recursos Adicionais**

- [React-PDF Documentation](https://react-pdf.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 🔍 **Troubleshooting**

### PDF não carrega

- Verifique se o React-PDF está instalado
- Confirme se os dados JSON estão válidos
- Verifique o console do navegador

### Estilos não aplicam

- Confirme se o CSS está importado
- Verifique se as classes Tailwind estão corretas
- Teste em modo de desenvolvimento

### Download não funciona

- Verifique se o navegador suporta downloads
- Confirme se não há bloqueadores de popup
- Teste em modo incógnito
