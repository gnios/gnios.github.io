# Framework React Resume

Um framework moderno e interativo para criação de currículos usando React, Next.js e JSON.

## 🎯 **Características Principais**

- ✅ **Framework Próprio** - Solução customizada e moderna
- ✅ **Tema Moderno** - Design limpo e profissional
- ✅ **Suporte Markdown** - Formatação rica no conteúdo
- ✅ **Responsivo** - Funciona em todos os dispositivos
- ✅ **Download PDF** - Geração nativa de PDF
- ✅ **Interface Minimalista** - Apenas currículo e botão de download
- ✅ **JSON Data** - Dados estruturados e editáveis

## 🎨 **Design**

### **Tema Moderno**

- **Cores**: Azul (#2563eb, #1e40af)
- **Estilo**: Limpo e profissional
- **Tipografia**: Helvetica para melhor legibilidade
- **Layout**: Duas colunas responsivas

## 🚀 **Funcionalidades**

### **Interface Minimalista**

- **Apenas Currículo** - Conteúdo em destaque
- **Botão de Download** - Padrão do site, posicionado no final
- **Sem Distrações** - Interface limpa e focada

### **Visualização**

- **Layout Responsivo** - Duas colunas no desktop, uma no mobile
- **Tipografia Moderna** - Fonte Inter para melhor legibilidade
- **Ícones Integrados** - React Icons para visual profissional
- **Animações Suaves** - Transições elegantes

### **Exportação**

- **Download PDF** - Geração nativa com html2pdf.js
- **Impressão** - Fallback para impressão do navegador
- **Qualidade Alta** - PDF otimizado para impressão

## 📁 **Estrutura de Arquivos**

```
components/
├── ReactResume.js          # Componente principal
pages/
├── resume.js               # Página do currículo
data/
├── resume.json             # Dados do currículo
css/
├── extra.css               # Estilos do framework
```

## 🔧 **Tecnologias Utilizadas**

- **React** - Interface de usuário
- **Next.js** - Framework React
- **React Markdown** - Renderização de Markdown
- **html2pdf.js** - Geração de PDF
- **React Icons** - Ícones
- **Tailwind CSS** - Estilização
- **JSON** - Dados estruturados

## 📋 **Estrutura dos Dados (JSON)**

```json
{
  "basics": {
    "name": "Nome Completo",
    "label": "Profissão",
    "email": "email@exemplo.com",
    "summary": "Resumo profissional em **Markdown**",
    "location": {
      "city": "Cidade",
      "countryCode": "BR"
    },
    "profiles": [
      {
        "network": "LinkedIn",
        "username": "usuario",
        "url": "https://linkedin.com/in/usuario"
      }
    ]
  },
  "work": [
    {
      "name": "Empresa",
      "position": "Cargo",
      "startDate": "2020-01-01",
      "endDate": "2022-12-31",
      "summary": "Descrição do trabalho",
      "highlights": ["Realização 1", "Realização 2"]
    }
  ],
  "education": [
    {
      "institution": "Universidade",
      "area": "Curso",
      "startDate": "2018-01-01",
      "endDate": "2022-12-31",
      "courses": ["Curso 1", "Curso 2"]
    }
  ],
  "skills": [
    {
      "name": "Frontend",
      "keywords": ["React", "Next.js", "TypeScript"]
    }
  ],
  "languages": [
    {
      "language": "Português",
      "fluency": "Nativo"
    }
  ]
}
```

## 🎨 **Personalização de Temas**

### **Criar Novo Tema**

```javascript
const themes = {
  meuTema: {
    primary: '#cor-principal',
    secondary: '#cor-secundaria',
    accent: '#cor-destaque',
    background: '#cor-fundo',
    text: '#cor-texto',
    textLight: '#cor-texto-claro',
  },
}
```

### **Aplicar Tema**

```jsx
<select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
  <option value="meuTema">Meu Tema</option>
</select>
```

## 📱 **Responsividade**

### **Desktop (1024px+)**

- Layout em duas colunas
- Experiência/Educação (esquerda)
- Habilidades/Idiomas (direita)

### **Tablet (768px - 1023px)**

- Layout adaptado
- Espaçamentos otimizados

### **Mobile (< 768px)**

- Layout em coluna única
- Controles empilhados
- Texto otimizado

## 🖨️ **Estilos de Impressão**

- **Cores preservadas** - Gradientes e cores mantidos
- **Quebras de página** - Seções organizadas
- **Fonte otimizada** - Tamanho 12px para impressão
- **Margens adequadas** - 0.5in de margem

## 🚀 **Como Usar**

### **1. Visualizar Currículo**

```bash
# Acesse a página
http://localhost:3000/resume
```

### **2. Editar Dados**

```bash
# Edite o arquivo JSON
data/resume.json
```

### **3. Personalizar Tema**

```bash
# Modifique as cores
components/ReactResume.js
```

### **4. Baixar PDF**

```bash
# Clique em "Baixar PDF"
# Ou use Ctrl+P para imprimir
```

## 🔍 **Recursos Avançados**

### **Markdown Support**

- **Negrito**: `**texto**`
- **Itálico**: `*texto*`
- **Listas**: `- item`
- **Links**: `[texto](url)`
- **Código**: `` `código` ``

### **Ícones Disponíveis**

- **Contato**: Mail, Phone, Environment
- **Social**: LinkedIn, GitHub, Twitter
- **Seções**: User, Trophy, Book, Code, Star
- **Tempo**: Calendar

### **Animações**

- **Fade In**: Aparecimento suave
- **Slide In**: Deslizamento lateral
- **Hover**: Efeitos de interação

## 🎯 **Vantagens do Framework**

1. **Controle Total** - Design completamente personalizável
2. **Performance** - Otimizado para velocidade
3. **Manutenibilidade** - Código limpo e organizado
4. **Extensibilidade** - Fácil de adicionar funcionalidades
5. **Compatibilidade** - Funciona em todos os navegadores
6. **Acessibilidade** - Seguindo padrões web

## 📚 **Próximas Melhorias**

- [ ] Mais temas personalizados
- [ ] Editor visual de currículo
- [ ] Integração com LinkedIn
- [ ] Analytics de visualização
- [ ] Compartilhamento social
- [ ] Múltiplos formatos de exportação

## 🔧 **Troubleshooting**

### **PDF não gera**

- Verifique se html2pdf.js está carregado
- Use o fallback de impressão
- Verifique o console para erros

### **Tema não aplica**

- Confirme se o tema existe no objeto themes
- Verifique se o estado selectedTheme está correto
- Recarregue a página

### **Markdown não renderiza**

- Verifique se react-markdown está instalado
- Confirme se remark-gfm está configurado
- Verifique a sintaxe Markdown

## 📖 **Recursos Adicionais**

- [React Markdown](https://github.com/remarkjs/react-markdown)
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Framework React Resume** - Uma solução moderna e profissional para currículos interativos.
