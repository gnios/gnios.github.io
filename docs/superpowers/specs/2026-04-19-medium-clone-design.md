# Medium Clone Design — gnios.github.io

**Data:** 2026-04-19  
**Escopo:** Redesign completo do visual do site para replicar o Medium.  
**Restrição:** Menus permanecem os mesmos (Home, Sobre, Snippets, Projetos, Contato).

---

## 1. Sistema de Design

### Paleta de Cores

| Token | Valor | Uso |
|---|---|---|
| `text-primary` | `#191919` | Texto principal, logo, títulos |
| `text-body` | `#292929` | Corpo de artigo |
| `text-secondary` | `#6B6B6B` | Metadata, subtítulos, descrições |
| `text-disabled` | `#B3B3B3` | Placeholders, tempo de leitura |
| `border` | `#E6E6E6` | Divisores, bordas de card |
| `surface-hover` | `#F2F2F2` | Hover de links, tags, input de busca |
| `surface-subtle` | `#FAFAFA` | Fundo do author card, sidebar |
| `surface-base` | `#FFFFFF` | Fundo principal |

**Dark mode** (inverso direto):

| Token | Valor |
|---|---|
| `text-primary` | `#FAFAFA` |
| `text-body` | `#E6E6E6` |
| `text-secondary` | `#B3B3B3` |
| `text-disabled` | `#6B6B6B` |
| `border` | `#292929` |
| `surface-hover` | `#292929` |
| `surface-subtle` | `#1A1A1A` |
| `surface-base` | `#111111` |

**Remover:** cor de acento `#DE1D8D` (rosa/magenta) de todos os componentes. Sem cor de acento — apenas neutros.

### Tipografia

**UI / Navegação (system-ui sans-serif):**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
```
Usado em: topbar, sidebar, metadata de artigo, tags, botões, labels.

**Artigos — corpo (Georgia serif):**
```css
font-family: Georgia, "Charter", "Iowan Old Style", serif;
```
Usado em: títulos do feed, corpo de artigo, títulos dentro do artigo, subtítulo do artigo.

### Escala Tipográfica

| Elemento | Tamanho | Peso | Família | Line-height |
|---|---|---|---|---|
| Título do artigo | 42px | 700 | Georgia | 1.15 |
| Subtítulo do artigo | 22px | 400 | Georgia | 1.45 |
| H2 no artigo | 26px | 700 | Georgia | 1.3 |
| H3 no artigo | 22px | 700 | Georgia | 1.3 |
| Corpo do artigo | 21px | 400 | Georgia | 1.8 |
| Título no feed | 20px | 700 | Georgia | 1.3 |
| Resumo no feed | 15px | 400 | Georgia | 1.5 |
| Metadata / labels | 12–14px | 400/600 | system-ui | 1.4 |
| Tags | 11–12px | 400 | system-ui | — |

### Espaçamentos

Base 8px. Valores em uso: `8 / 16 / 24 / 32 / 40 / 48 / 64px`.

- Topbar height: `64px`
- Sidebar width: `272px`
- Artigo max-width: `740px` (centralizado)
- Padding horizontal da página: `24px` (mobile: `16px`)
- Espaço entre cards no feed: `border-bottom 1px #E6E6E6`

---

## 2. Topbar

**Estrutura:** fixo no topo, `z-index: 50`, altura `64px`, `border-bottom: 1px solid #E6E6E6`.

**Esquerda:** Logo "Gnios" (`font-size: 20px`, `font-weight: 800`, `letter-spacing: -0.3px`) + search pill (`background: #F2F2F2`, `border-radius: 100px`).

**Direita:** ThemeSwitch (botão circular `32px`, `background: #F2F2F2`) + ícone sino (Feather `bell`, `18px`, `color: #6B6B6B`) + avatar circular `36px` com inicial "G" (`background: #191919`, texto branco).

**Dark mode:** fundo `#111111`, bordas `#292929`, search `background: #1A1A1A`, avatar fundo `#FAFAFA` texto `#191919`.

**Remove:** subtítulo "Desenvolvedor Full Stack" do logo; cor rosa do avatar.

---

## 3. Sidebar

**Estrutura:** fixo à esquerda, top `64px`, width `272px`, `height: calc(100vh - 64px)`, `border-right: 1px solid #E6E6E6`. Oculto em telas < `lg` (1024px).

**Itens (inalterados):**
- 🏠 Home → `/`
- 👤 Sobre → `/resume`
- `<>` Snippets → `/snippets`
- ⊞ Projetos → `/projects`
- ✉ Contato → `/contact`

**Ícones:** Feather SVG inline, `16px`, `stroke-width: 2`.

**Estado ativo:** `background: #F2F2F2` (light) / `#292929` (dark), texto `#191919` / `#FAFAFA`, `font-weight: 600`. Sem cor de acento.

**Estado hover:** `background: #F2F2F2` (light) / `#1A1A1A` (dark).

**Padding por item:** `10px 20px`.

---

## 4. Homepage — Feed de Artigos

**Remove completamente:** seção hero ("Olá, eu sou Gnios"), botões de atalho (Projetos, Currículo, Contato), RoughNotation.

**Substitui por:** feed idêntico ao `/blog`, renderizado diretamente pelo componente `ListLayout`.

**Alteração em `pages/index.js`:** passar `posts` para `ListLayout` com `title=""` — string vazia suprime o bloco de cabeçalho (sem título nem campo de busca), indo direto para o feed de cards.

---

## 5. Feed de Artigos — `ListLayout`

**Cabeçalho** (apenas em `/blog`): título "Todos os Posts" em Georgia 32px bold + campo de busca pill `background: #F2F2F2`, `border-radius: 100px`.

**Card de artigo:**
```
[Thumbnail 96×72px]   Autor · Data
                      Título (Georgia 20px bold)
                      Resumo (Georgia 15px, 2 linhas max)
                      [tag] [tag] · X min de leitura
```
- Thumbnail: imagem do frontmatter `images[0]`; se ausente, sem placeholder (card sem imagem).
- Separação entre cards: `border-bottom: 1px solid #E6E6E6`.
- Padding por card: `24px 0`.
- Hover: sem card elevado; apenas título fica `text-decoration: underline`.

---

## 6. Página do Artigo — `PostLayout`

**Layout:** coluna central única, `max-width: 740px`, `margin: 0 auto`, `padding: 48px 24px`.

**Remove:** TOC sidebar, `SectionContainer` wrapper externo, `xl:grid-cols-4` layout.

### Estrutura em ordem:

1. **Título** — Georgia 42px, `font-weight: 700`, `letter-spacing: -0.5px`, `line-height: 1.15`
2. **Subtítulo** (`summary`) — Georgia 22px, cor `#6B6B6B`, `line-height: 1.45`
3. **Linha de autor** — avatar `36px` + nome (system-ui 14px bold) + "· data · X min de leitura" (12px `#6B6B6B`), separada por `border-bottom`
4. **Imagem destaque** (`images[0]`) — full-width, `border-radius: 0` (sai das margens), altura automática
5. **Corpo** — Georgia 21px, `line-height: 1.8`, cor `#292929`; código em `background: #F2F2F2`
6. **Tags** — pills cinzas, separadas por `border-top`
7. **Compartilhamento** — Twitter, LinkedIn, WhatsApp; botões circulares `32px`, cores de marca
8. **Author card** — `background: #FAFAFA`, avatar `52px`, nome + bio, sem botão "Seguir"
9. **Navegação** — grid 2 colunas "← Anterior / Próximo →", títulos em Georgia com underline
10. **Comentários** — componente existente mantido

**Remove:** FacebookShareButton, EmailShareButton, RedditShareButton (mantém apenas Twitter, LinkedIn, WhatsApp).

---

## 7. Tailwind Config

Adicionar tokens neutros flat (nomes curtos, usáveis como classes Tailwind diretas):

```js
colors: {
  // Tokens Medium — neutros
  'ink':        '#191919',  // texto principal
  'ink-body':   '#292929',  // corpo de artigo
  'ink-light':  '#6B6B6B',  // secundário
  'ink-faint':  '#B3B3B3',  // desabilitado
  'stroke':     '#E6E6E6',  // bordas
  'wash':       '#F2F2F2',  // hover / surface
  'wash-subtle':'#FAFAFA',  // fundo author card / sidebar

  // Dark mode — definir via CSS vars ou dark: classes
}
```

Exemplos de uso: `text-ink`, `bg-wash`, `border-stroke`, `text-ink-light`.

Adicionar família `serif`:
```js
fontFamily: {
  sans:  ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
  serif: ['Georgia', 'Charter', 'Iowan Old Style', 'serif'],
}
```

**`primary-*` (magenta):** manter na config (remove-los quebraria componentes não redesenhados como `ScrollTopAndComment` e `ProgressBar`). Substituir apenas nos 6 componentes/layouts listados na Seção 8 — não fazer busca/replace global.

---

## 8. Arquivos a Modificar

| Arquivo | Tipo de mudança |
|---|---|
| `tailwind.config.js` | Adicionar tokens neutros, fonte serif |
| `styles/tailwind.css` | Remover `.special-underline` magenta, ajustar `::selection` |
| `components/Topbar.js` | Aplicar tokens neutros, remover rosa do avatar |
| `components/SidebarNav.js` | Aplicar tokens neutros no ativo/hover |
| `components/LayoutWrapper.js` | Sem mudança de estrutura |
| `pages/index.js` | Remover hero, usar `ListLayout` diretamente |
| `layouts/ListLayout.js` | Reescrever card com serif, thumbnail, pills neutras |
| `layouts/PostLayout.js` | Reescrever: coluna central, Georgia, sem TOC, author card, menos share buttons |

**Não modificar:** `pages/blog.js`, `pages/[...slug].js`, `components/Footer.js`, dados/conteúdo MDX.

---

## 9. Fora de Escopo

- Funcionalidade de "aplausos" (clap) do Medium
- Feed personalizado por tags/tópicos
- Sistema de followers
- Paywall / memberships
- Busca funcional (input já existe como UI; implementação de busca é separada)
