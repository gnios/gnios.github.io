# Medium Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign gnios.github.io to visually replicate Medium — neutral palette, Georgia serif for articles, article-feed homepage, centered 740px article column.

**Architecture:** Seven independent file edits applied in dependency order: design tokens first (Tailwind config + global CSS), then navigation components (Topbar, SidebarNav), then page layouts (ListLayout, PostLayout), and finally the homepage (index.js). Each task is independently deployable.

**Tech Stack:** Next.js 12, Tailwind CSS (class dark-mode), `@tailwindcss/typography` prose, `react-share` + `react-social-icons`, Next.js `Image` component, Georgia system-serif (no external font loading needed).

---

## File Map

| File | Change |
|---|---|
| `tailwind.config.js` | Add `ink/stroke/wash` neutral tokens + `font-serif` family |
| `css/tailwind.css` | Remove magenta from `.special-underline*`, `.company`, `::selection` |
| `components/Topbar.js` | Swap pink avatar/hover for neutral tokens |
| `components/SidebarNav.js` | Swap `primary-500` active state for neutral tokens |
| `pages/index.js` | Replace hero + manual post list with `<ListLayout>` |
| `layouts/ListLayout.js` | Rewrite: serif card, thumbnail, pill tags, no hover card |
| `layouts/PostLayout.js` | Rewrite: 740px column, Georgia 21px, no TOC, reduced share buttons |

---

## Task 1: Add Neutral Design Tokens to Tailwind

**Files:**
- Modify: `tailwind.config.js`

The spec defines eight neutral color tokens (`ink`, `ink-body`, `ink-light`, `ink-faint`, `stroke`, `wash`, `wash-subtle`) and requires `font-serif` family. We add these inside `theme.extend` without touching the existing `primary-*` palette (still used by `ScrollTopAndComment`, `ProgressBar`, etc.).

- [ ] **Step 1: Open `tailwind.config.js` and locate `theme.extend.fontFamily`**

Currently at line 25–27:
```js
fontFamily: {
  sans: ['Inter', ...defaultTheme.fontFamily.sans],
},
```

- [ ] **Step 2: Add `serif` and replace `sans` with system stack**

Replace the `fontFamily` block with:
```js
fontFamily: {
  sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', ...defaultTheme.fontFamily.sans],
  serif: ['Georgia', 'Charter', 'Iowan Old Style', ...defaultTheme.fontFamily.serif],
},
```

- [ ] **Step 3: Add neutral tokens inside `theme.extend.colors`**

The `colors` block currently opens at line 37. Add the neutral tokens at the **top** of the colors object, before the `primary` key:

```js
colors: {
  // Medium neutral tokens
  ink:           '#191919',
  'ink-body':    '#292929',
  'ink-light':   '#6B6B6B',
  'ink-faint':   '#B3B3B3',
  stroke:        '#E6E6E6',
  wash:          '#F2F2F2',
  'wash-subtle': '#FAFAFA',
  // existing keys below — do not touch
  primary: { ... },
  'primary-color': { ... },
  ...
}
```

- [ ] **Step 4: Update prose typography to use neutral tokens for article body**

Inside the `typography` callback, locate the `DEFAULT.css` block (around line 76). Update `a`, `h1`–`h6`, and `blockquote` to use neutral tokens so prose in `PostLayout` renders correctly:

```js
DEFAULT: {
  css: {
    color: '#292929',              // ink-body
    fontSize: '21px',
    lineHeight: '1.8',
    fontFamily: "Georgia, 'Charter', serif",
    a: {
      color: '#191919',            // ink — underline only, no color accent
      textDecoration: 'underline',
      '&:hover': { color: '#191919' },
      code: { color: '#191919' },
    },
    h1: { fontWeight: '700', letterSpacing: '-0.02em', color: '#191919', fontFamily: "Georgia, 'Charter', serif" },
    h2: { fontWeight: '700', letterSpacing: '-0.01em', color: '#191919', fontSize: '26px', lineHeight: '1.3', fontFamily: "Georgia, 'Charter', serif" },
    h3: { fontWeight: '700', color: '#191919', fontSize: '22px', lineHeight: '1.3', fontFamily: "Georgia, 'Charter', serif" },
    'h4,h5,h6': { color: '#191919' },
    pre: { backgroundColor: 'transparent' },
    'pre code': { backgroundColor: 'transparent', color: 'inherit', padding: 0 },
    code: {
      color: '#191919',
      backgroundColor: '#F2F2F2',  // wash
      paddingLeft: '4px', paddingRight: '4px',
      paddingTop: '2px', paddingBottom: '2px',
      borderRadius: '0.25rem',
    },
    'code::before': { content: 'none' },
    'code::after':  { content: 'none' },
    hr:   { borderColor: '#E6E6E6' },    // stroke
    'ol li::marker': { fontWeight: '600', color: '#6B6B6B' },
    'ul li::marker': { backgroundColor: '#6B6B6B' },
    strong:     { color: '#191919' },
    blockquote: { color: '#6B6B6B', borderLeftColor: '#E6E6E6' },
  },
},
dark: {
  css: {
    color: '#E6E6E6',
    fontFamily: "Georgia, 'Charter', serif",
    a: {
      color: '#FAFAFA',
      '&:hover': { color: '#FAFAFA' },
      code: { color: '#FAFAFA' },
    },
    h1: { color: '#FAFAFA', fontFamily: "Georgia, 'Charter', serif" },
    h2: { color: '#FAFAFA', fontFamily: "Georgia, 'Charter', serif" },
    h3: { color: '#FAFAFA', fontFamily: "Georgia, 'Charter', serif" },
    'h4,h5,h6': { color: '#FAFAFA' },
    pre: { backgroundColor: 'transparent' },
    'pre code': { backgroundColor: 'transparent', color: 'inherit', padding: 0 },
    code: { backgroundColor: '#292929' },
    hr: { borderColor: '#292929' },
    'ol li::marker': { color: '#B3B3B3' },
    'ul li::marker': { backgroundColor: '#B3B3B3' },
    strong:     { color: '#FAFAFA' },
    blockquote: { color: '#B3B3B3', borderLeftColor: '#292929' },
  },
},
```

- [ ] **Step 5: Start dev server and verify no build errors**

```bash
npm run dev
```

Expected: server starts, no Tailwind config errors in terminal. Visit http://localhost:3000 — page loads (may look unstyled in places; that's expected until later tasks).

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: add Medium neutral tokens and serif font family to Tailwind"
```

---

## Task 2: Clean Magenta from Global CSS

**Files:**
- Modify: `css/tailwind.css`

The global stylesheet has three places with `#de1d8d` (magenta): `.special-underline`, `.special-underline-new`, `.company`, and `::selection`. We neutralise all of them.

- [ ] **Step 1: Replace the entire `@layer utilities` block**

Replace lines 22–55 with:
```css
@layer utilities {
  .special-underline {
    @apply underline decoration-ink/30 hover:decoration-ink
      motion-safe:transition-all motion-safe:duration-200;
  }

  .special-underline-new {
    @apply underline decoration-ink/30 hover:decoration-ink
      motion-safe:transition-all motion-safe:duration-200;
  }

  .company {
    color: #191919;
  }
  .company:hover {
    text-decoration: underline;
  }
}
```

- [ ] **Step 2: Replace `::selection` colors**

Replace lines 67–75 with:
```css
::-moz-selection   { background: #E6E6E6; color: #191919; }
::-webkit-selection { background: #E6E6E6; color: #191919; }
::selection         { background: #E6E6E6; color: #191919; }
```

- [ ] **Step 3: Verify**

Visit http://localhost:3000/blog — page loads, no magenta text-selection highlight on mouse drag.

- [ ] **Step 4: Commit**

```bash
git add css/tailwind.css
git commit -m "feat: remove magenta from global CSS, neutralise selection and underline utilities"
```

---

## Task 3: Update Topbar to Neutral Palette

**Files:**
- Modify: `components/Topbar.js`

The current topbar uses `bg-primary-500` for the avatar. Replace with neutral (`bg-ink` / dark `bg-wash-subtle`).

- [ ] **Step 1: Replace full file content**

```jsx
import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import ThemeSwitch from './ThemeSwitch'

export default function Topbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-stroke bg-white dark:border-[#292929] dark:bg-[#111111]">
      <div className="flex h-full items-center justify-between px-6">

        {/* Left: Logo + Search */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-[-0.3px] text-ink dark:text-wash-subtle"
            aria-label={siteMetadata.headerTitle}
          >
            {siteMetadata.author || 'Gnios'}
          </Link>
          <div className="hidden items-center gap-2 rounded-full bg-wash px-4 py-2 dark:bg-[#1A1A1A] sm:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-ink-faint"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-sm text-ink-faint">Buscar artigos...</span>
          </div>
        </div>

        {/* Right: Theme + Bell + Avatar */}
        <div className="flex items-center gap-3">
          <ThemeSwitch />
          <button
            className="rounded-full p-2 text-ink-light hover:bg-wash dark:text-ink-faint dark:hover:bg-[#292929]"
            aria-label="Notificações"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          {/* Avatar: dark bg + white initial in light mode; light bg + dark initial in dark mode */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink dark:bg-wash-subtle">
            <span className="font-sans text-xs font-bold text-white dark:text-ink">G</span>
          </div>
        </div>

      </div>
    </header>
  )
}
```

- [ ] **Step 2: Verify**

Visit http://localhost:3000 — topbar shows "Gnios" logo (no subtitle), neutral avatar with "G", no pink anywhere. Toggle dark mode — fundo fica `#111111`, avatar inverte.

- [ ] **Step 3: Commit**

```bash
git add components/Topbar.js
git commit -m "feat: neutralise Topbar — remove pink avatar, apply ink/stroke/wash tokens"
```

---

## Task 4: Update SidebarNav Active/Hover to Neutral

**Files:**
- Modify: `components/SidebarNav.js`

Active state currently uses `text-primary-500` (magenta). Replace with `text-ink` + `bg-wash` (light) / `bg-[#292929]` (dark).

- [ ] **Step 1: Locate the active/inactive class string inside the `navItems.map()`**

Currently around line 85:
```jsx
className={`flex items-center gap-3 px-6 py-3 text-[15px] transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 ${
  isActive
    ? 'font-medium text-primary-500'
    : 'text-gray-700 dark:text-gray-300'
}`}
```

- [ ] **Step 2: Replace that className expression**

```jsx
className={`flex items-center gap-3 px-6 py-3 text-[15px] transition-colors
  hover:bg-wash dark:hover:bg-[#1A1A1A]
  ${isActive
    ? 'bg-wash font-semibold text-ink dark:bg-[#292929] dark:text-wash-subtle'
    : 'text-ink-light dark:text-ink-faint'
  }`}
```

- [ ] **Step 3: Verify**

Navigate to /blog — "Home" item in sidebar has neutral background highlight, no pink. Active page item (if navigating to /snippets etc.) shows gray highlight.

- [ ] **Step 4: Commit**

```bash
git add components/SidebarNav.js
git commit -m "feat: neutralise SidebarNav active/hover states — remove primary-500 pink"
```

---

## Task 5: Rewrite ListLayout (Feed Cards)

**Files:**
- Modify: `layouts/ListLayout.js`

Full rewrite. New design: Georgia serif titles, thumbnail at right (from `images[0]`), reading time (from `readingTime.text`), pill tags in neutral gray, hover = title underline only.

**Note:** `readingTime` comes from `frontMatter` via `mdx-bundler` but is only available on the full post, not in `getAllFilesFrontMatter`. The feed uses only `getAllFilesFrontMatter` output, which does NOT include `readingTime`. Omit reading time from the feed card; it is only shown in `PostLayout`.

- [ ] **Step 1: Replace full file content**

```jsx
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')

  const filteredPosts = posts.filter((fm) => {
    const content = fm.title + fm.summary + fm.tags.join(' ')
    return content.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredPosts

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Header — only shown when title is non-empty (i.e. /blog, not homepage) */}
      {title && (
        <div className="mb-10 space-y-5">
          <h1 className="font-serif text-[32px] font-bold text-ink dark:text-wash-subtle">
            {title}
          </h1>
          <div className="relative max-w-sm">
            <div className="flex items-center gap-2 rounded-full bg-wash px-4 py-2.5 dark:bg-[#1A1A1A]">
              <svg
                className="h-4 w-4 shrink-0 text-ink-faint"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                aria-label="Buscar artigos"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Buscar artigos..."
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint dark:text-wash-subtle"
              />
            </div>
          </div>
        </div>
      )}

      <ul>
        {!filteredPosts.length && (
          <p className="py-10 font-sans text-ink-light dark:text-ink-faint">
            Nenhum post encontrado.
          </p>
        )}

        {displayPosts.map((fm) => {
          const { slug, date, title: postTitle, summary, tags, images } = fm
          const thumbnail = images && images.length > 0 ? images[0] : null

          return (
            <li
              key={slug}
              className="group border-b border-stroke py-6 last:border-b-0 dark:border-[#292929]"
            >
              {/* Outer div — not Link — avoids "multiple children" error */}
              <div className="flex items-start justify-between gap-5">
                {/* Text block */}
                <div className="min-w-0 flex-1 space-y-1.5">
                  <p className="font-sans text-[12px] font-semibold uppercase tracking-wide text-ink-light dark:text-ink-faint">
                    Gnios &middot; <time dateTime={date}>{formatDate(date)}</time>
                  </p>
                  <h2 className="font-serif text-[20px] font-bold leading-snug text-ink dark:text-wash-subtle">
                    <Link
                      href={`/blog/${slug}`}
                      className="hover:underline"
                    >
                      {postTitle}
                    </Link>
                  </h2>
                  {summary && (
                    <p className="line-clamp-2 font-serif text-[15px] leading-relaxed text-ink-light dark:text-ink-faint">
                      {summary}
                    </p>
                  )}
                  {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-wash px-2.5 py-0.5 font-sans text-[11px] text-ink-light dark:bg-[#292929] dark:text-ink-faint"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Thumbnail — only renders when images[0] exists */}
                {thumbnail && (
                  <Link href={`/blog/${slug}`} className="shrink-0">
                    <div className="relative h-[72px] w-24 overflow-hidden rounded">
                      <Image
                        src={thumbnail}
                        alt={postTitle}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </Link>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Add `font-serif` to Tailwind safelist (it's a custom class — verify purge)**

In `tailwind.config.js`, confirm that `layouts/**/*.js` is in the `content` array (it already is at line 11). No safelist needed.

- [ ] **Step 3: Verify**

Visit http://localhost:3000/blog — cards show Georgia serif title, neutral pill tags, no pink. Articles with an `images` field in frontmatter show a 96×72 thumbnail. Hover → title underlines, no card lift.

- [ ] **Step 4: Commit**

```bash
git add layouts/ListLayout.js
git commit -m "feat: rewrite ListLayout with Medium-style serif cards and neutral tokens"
```

---

## Task 6: Rewrite PostLayout (Article Page)

**Files:**
- Modify: `layouts/PostLayout.js`

Full rewrite. Removes `SectionContainer`, `xl:grid-cols-4` layout, TOC. Adds centered 740px column, Georgia 21px body, reduced share buttons (Twitter + LinkedIn + WhatsApp only), neutral author card, Georgia nav links.

- [ ] **Step 1: Replace full file content**

```jsx
import Link from '@/components/Link'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share'
import { SocialIcon } from 'react-social-icons'
import formatDate from '@/lib/utils/formatDate'

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, date, title, images, tags, readingTime, summary } = frontMatter
  const postUrl = `${siteMetadata.siteUrl}/blog/${slug}`
  const featuredImage = images && images.length > 0 ? images[0] : null

  return (
    <>
      <BlogSEO
        url={postUrl}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />

      <article className="mx-auto max-w-[740px] px-6 py-12">

        {/* ── Header ── */}
        <header className="mb-8">
          <h1 className="font-serif text-[42px] font-bold leading-[1.15] tracking-[-0.5px] text-ink dark:text-wash-subtle">
            {title}
          </h1>

          {summary && (
            <p className="mt-4 font-serif text-[22px] leading-[1.45] text-ink-light dark:text-ink-faint">
              {summary}
            </p>
          )}

          {/* Author row */}
          <div className="mt-6 flex items-center gap-3 border-b border-stroke pb-6 dark:border-[#292929]">
            {authorDetails.map((author) =>
              author.avatar ? (
                <Image
                  key={author.name}
                  src={author.avatar}
                  width="36px"
                  height="36px"
                  alt={author.name}
                  className="rounded-full"
                />
              ) : null
            )}
            <div className="font-sans">
              <span className="text-[14px] font-semibold text-ink dark:text-wash-subtle">
                {authorDetails.map((a) => a.name).join(', ')}
              </span>
              <span className="ml-2 text-[12px] text-ink-light dark:text-ink-faint">
                &middot; <time dateTime={date}>{formatDate(date)}</time>
                {readingTime && <> &middot; {readingTime.text}</>}
              </span>
            </div>
          </div>
        </header>

        {/* ── Featured Image ── */}
        {featuredImage && (
          <div className="relative mb-10 -mx-6 aspect-[16/9] overflow-hidden">
            <Image
              src={featuredImage}
              alt={title}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        )}

        {/* ── Body ── */}
        {/* prose — NOT prose-lg; our Tailwind config sets 21px/1.8 in DEFAULT */}
        <div className="prose max-w-none dark:prose-dark">
          {children}
        </div>

        {/* ── Tags ── */}
        {tags && tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-stroke pt-6 dark:border-[#292929]">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}

        {/* ── Share ── */}
        <div className="mt-8 flex items-center gap-3 border-t border-stroke pt-6 dark:border-[#292929]">
          <span className="font-sans text-[13px] text-ink-light dark:text-ink-faint">
            Compartilhar:
          </span>
          <TwitterShareButton
            url={postUrl}
            title={title}
            via={siteMetadata.socialAccount?.twitter}
            className="flex items-center overflow-hidden rounded-full hover:scale-110 transition-transform"
          >
            <SocialIcon network="twitter" style={{ height: 32, width: 32 }} fgColor="#fff" bgColor="#1da1f2" />
          </TwitterShareButton>
          <LinkedinShareButton
            summary={summary}
            title={title}
            source={siteMetadata.siteUrl}
            url={postUrl}
            className="flex items-center overflow-hidden rounded-full hover:scale-110 transition-transform"
          >
            <SocialIcon network="linkedin" style={{ height: 32, width: 32 }} fgColor="#fff" bgColor="#0072b1" />
          </LinkedinShareButton>
          <WhatsappShareButton
            title={title}
            separator=" : "
            url={postUrl}
            className="flex items-center overflow-hidden rounded-full hover:scale-110 transition-transform"
          >
            <SocialIcon network="whatsapp" style={{ height: 32, width: 32 }} fgColor="#fff" bgColor="#25D366" />
          </WhatsappShareButton>
        </div>

        {/* ── Author Card ── */}
        {authorDetails.map((author) => (
          <div
            key={author.name}
            className="mt-10 flex items-start gap-4 rounded-lg border border-stroke bg-wash-subtle p-5 dark:border-[#292929] dark:bg-[#1A1A1A]"
          >
            {author.avatar && (
              <Image
                src={author.avatar}
                width="52px"
                height="52px"
                alt={author.name}
                className="shrink-0 rounded-full"
              />
            )}
            <div>
              <p className="font-sans text-[15px] font-bold text-ink dark:text-wash-subtle">
                {author.name}
              </p>
              <p className="mt-1 font-sans text-[13px] leading-relaxed text-ink-light dark:text-ink-faint">
                {siteMetadata.description}
              </p>
            </div>
          </div>
        ))}

        {/* ── Prev / Next ── */}
        {(next || prev) && (
          <div className="mt-10 grid gap-4 border-t border-stroke pt-8 dark:border-[#292929] sm:grid-cols-2">
            {prev && (
              <div>
                <p className="mb-1 font-sans text-[11px] uppercase tracking-widest text-ink-faint">
                  ← Anterior
                </p>
                <Link
                  href={`/blog/${prev.slug}`}
                  className="font-serif text-[15px] text-ink underline dark:text-wash-subtle"
                >
                  {prev.title}
                </Link>
              </div>
            )}
            {next && (
              <div className="text-right">
                <p className="mb-1 font-sans text-[11px] uppercase tracking-widest text-ink-faint">
                  Próximo →
                </p>
                <Link
                  href={`/blog/${next.slug}`}
                  className="font-serif text-[15px] text-ink underline dark:text-wash-subtle"
                >
                  {next.title}
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/blog"
            className="font-sans text-[13px] text-ink-light underline dark:text-ink-faint"
          >
            ← Voltar para o blog
          </Link>
        </div>

        <Comments frontMatter={frontMatter} />
      </article>
    </>
  )
}
```

- [ ] **Step 2: Verify**

Visit http://localhost:3000/blog/spotify-refresh-token — article shows:
- Georgia title 42px, summary in grey, author avatar + name + date
- Full-width featured image
- Body text in Georgia 21px line-height 1.8
- No TOC sidebar
- Neutral tags, 3 share buttons, author card with grey background
- No pink anywhere

- [ ] **Step 3: Commit**

```bash
git add layouts/PostLayout.js
git commit -m "feat: rewrite PostLayout — Medium 740px column, Georgia serif, no TOC, neutral palette"
```

---

## Task 7: Replace Homepage Hero with Article Feed

**Files:**
- Modify: `pages/index.js`

Remove the hero section, `RoughNotation`, quick-link buttons, and manual post loop. Replace with `<ListLayout>` passing `title=""` (suppresses the search header — shows feed cards directly).

- [ ] **Step 1: Replace full file content**

```jsx
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import ListLayout from '@/layouts/ListLayout'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout posts={posts} initialDisplayPosts={[]} pagination={null} title="" />
    </>
  )
}
```

- [ ] **Step 2: Verify**

Visit http://localhost:3000 — page shows article feed immediately (no hero, no buttons). Article cards render with serif titles and neutral tags. Scroll to bottom — no "Todos os Posts" pagination since `pagination={null}`.

- [ ] **Step 3: Verify /blog still works independently**

Visit http://localhost:3000/blog — shows "Todos os Posts" heading + search field (because `title` is non-empty in `blog.js`).

- [ ] **Step 4: Commit**

```bash
git add pages/index.js
git commit -m "feat: replace homepage hero with article feed using ListLayout"
```

---

## Task 8: Visual QA Pass

**Files:** No code changes — browser verification only.

- [ ] **Step 1: Homepage — light mode**

Visit http://localhost:3000. Confirm:
- No pink/magenta visible anywhere
- Article titles in Georgia serif
- Tags are neutral grey pills
- Topbar: "Gnios" logo, grey search pill, neutral avatar "G"
- Sidebar: 5 items with Feather icons, active item grey bg

- [ ] **Step 2: Article page — light mode**

Visit http://localhost:3000/blog/spotify-refresh-token. Confirm:
- Title 42px serif, summary in grey
- Author row with avatar, date, reading time
- Featured image full-width
- Body prose in 21px Georgia
- No TOC, no right sidebar
- 3 share buttons (Twitter, LinkedIn, WhatsApp)
- Author card neutral grey
- Prev/Next with serif underlined links

- [ ] **Step 3: Dark mode**

Toggle dark mode (ThemeSwitch in topbar). Confirm:
- Topbar: fundo `#111111`, avatar inverts (light bg + dark text)
- Sidebar: fundo dark, active item `#292929`
- Article body: text `#E6E6E6` on dark bg
- No pink appears in dark mode

- [ ] **Step 4: Mobile (resize to 375px)**

In browser devtools, resize to 375px width. Confirm:
- Sidebar hidden (hidden below `lg`)
- Topbar still shows logo + avatar
- Feed cards readable, single column
- Article page text readable at 16px min

- [ ] **Step 5: /blog search**

Visit http://localhost:3000/blog, type "spotify" in the search field. Confirm only the Spotify article appears.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: visual QA pass — Medium clone complete"
```

---

## Summary

| Task | File | Status |
|---|---|---|
| 1 | `tailwind.config.js` | tokens + serif font |
| 2 | `css/tailwind.css` | remove magenta |
| 3 | `components/Topbar.js` | neutral palette |
| 4 | `components/SidebarNav.js` | neutral active/hover |
| 5 | `layouts/ListLayout.js` | serif feed cards |
| 6 | `layouts/PostLayout.js` | 740px column, no TOC |
| 7 | `pages/index.js` | replace hero with feed |
| 8 | — | visual QA |
