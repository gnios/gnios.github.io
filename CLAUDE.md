# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Gnios Blog** is a personal blog built with Next.js and deployed to GitHub Pages. It features MDX-based content for blog posts and snippets, with dark/light theme support and custom styling via Tailwind CSS.

## Common Commands

```bash
# Development
npm run dev              # Start dev server at localhost:3000

# Building and Deployment
npm run build            # Build for production (includes `next export`)
npm run deploy           # Build + create .nojekyll (ready for GitHub Pages)

# Code Quality
npm run lint             # Lint and fix files in pages, components, lib, layouts, scripts

# Resume/CV Tools
npm run resume:generate  # Generate both PDF and HTML resume
npm run resume:pdf       # Generate PDF resume from data/resume.json
npm run resume:html      # Generate HTML resume from data/resume.json
npm run resume:validate  # Validate resume JSON schema
npm run resume:serve     # Serve resume locally with theme preview
```

## Architecture

### Content Pipeline

The blog uses a **compile-time MDX content system**:

1. **Content Storage** (`/data` folder):
   - Blog posts: `/data/blog/*.mdx` (or `.md`)
   - Code snippets: `/data/snippets/*.mdx` (or `.md`)
   - Activity: `/data/activity/*.mdx`
   - Each file starts with YAML frontmatter (title, date, slug, etc.)

2. **MDX Compilation** ([lib/mdx.js](lib/mdx.js)):
   - MDX files are bundled at **build time** using `mdx-bundler`
   - Files must exist as `.mdx` or `.md` format in `/data/{type}/` folder
   - Windows support: Path handling includes `.replace(/\\/g, '/')` for Windows paths in content slugs

3. **Processing Pipeline** (Remark/Rehype plugins):
   - **Remark** (markdown → AST): `remarkGfm`, `remarkMath`, `remarkCodeTitles`, `remarkTocHeadings`, `remarkImgToJsx`
   - **Rehype** (HTML → AST): `rehypeSlug`, `rehypeAutolinkHeadings`, `rehypePrismPlus` (syntax highlighting)
   - Table of contents is extracted during compilation and returned to pages

4. **Key Functions** in [lib/mdx.js](lib/mdx.js):
   - `getFiles(type)` — List all `.md`/`.mdx` files in `/data/{type}/`
   - `getFileBySlug(type, slug)` — Fetch and compile single MDX file (used in `getStaticProps`)
   - `getAllFilesFrontMatter(folder)` — Get frontmatter for all files (skips `draft: true`)

### Page Structure

- **Dynamic Pages**: `/pages/blog/[...slug].js`, `/pages/snippets/[...slug].js` (support nested folders)
- **List Pages**: `/pages/blog.js`, `/pages/snippets.js`, `/pages/tags/[tag].js` (with pagination)
- **Static Pages**: `/pages/about.js`, `/pages/projects.js`, `/pages/resume.js`
- **API Routes**: `/pages/api/resume.js` (resume data endpoint)

### Layouts

Each content type has a dedicated layout component ([layouts/](layouts/)):
- `PostLayout.js` — Blog posts with TOC, reading time, navigation
- `SnippetsLayout.js` — Code snippets
- `ListLayout.js` — Paginated lists
- `AuthorLayout.js` — Author bio pages

### Styling & Theme

- **Framework**: Tailwind CSS (dark mode: `class` strategy)
- **Theme Colors**: Custom primary color (#DE1D8D, pink/magenta gradient)
- **Typography**: `@tailwindcss/typography` for prose styling (blog content)
- **Animations**: Custom keyframes in [tailwind.config.js](tailwind.config.js) (gradient effects, fade animations)
- **Light/Dark**: Separate typography CSS variants for both modes

### GitHub Pages Configuration

- **Next.js Config** ([next.config.js](next.config.js)):
  - `trailingSlash: true` — URLs must have trailing slashes (GitHub Pages requirement)
  - `images.unoptimized: true` — Next.js image optimization disabled (static export only)
  - Image domains whitelist includes: Spotify, Twitter, Discord, GitHub, S3, Unsplash, Cloudinary, etc.
  - SVG loader: `@svgr/webpack` for inline SVG components

- **Build Output**: `out/` folder (created by `next export`)
- **Deployment**: `.nojekyll` file created by `npm run deploy` (disables Jekyll processing)

## Data Configuration

Site metadata and navigation are centralized in `/data`:
- [data/siteMetadata.js](data/siteMetadata.js) — Site title, author, analytics, comments provider
- [data/nav.js](data/nav.js) — Main navigation links
- [data/projectsData.js](data/projectsData.js) — Featured projects
- [data/skillsData.js](data/skillsData.js) — Skills list
- [data/resume.json](data/resume.json) — JSON Resume format (for resume generation)

## Important Patterns

### Adding a Blog Post

1. Create file: `data/blog/my-post.mdx`
2. Start with YAML frontmatter:
   ```yaml
   ---
   title: "Post Title"
   date: "2026-04-19"
   tags: ["tag1", "tag2"]
   summary: "Short description"
   ---
   ```
3. Content is automatically compiled at build time
4. Draft posts: add `draft: true` to frontmatter

### Image Handling

- Local images: `/public/static/images/` (or other public subdirs)
- Remote images: Domain must be in `next.config.js` `images.domains`
- Markdown images are auto-converted to JSX `<Image>` components by `remarkImgToJsx` plugin (Next.js optimization not applied, but component available)

### Code Snippets in MDX

- Markdown code blocks use `rehypePrismPlus` for syntax highlighting
- Add language after backticks: `` ```js `` or `` ```python ``
- Line numbers are shown by default (configurable in [lib/mdx.js](lib/mdx.js) `showLineNumbers: true`)
- Optional: Add comment above code block: `` ```js title="filename.js" ``

## Build & Deployment

- **Dev Build**: `npm run dev` uses Next.js dev server with hot reload
- **Production Build**: `npm run build` compiles MDX, generates static HTML, exports to `out/`
- **GitHub Pages**: Automatic CI/CD via GitHub Actions (pushes to `main` trigger deploy)
- **Build Size**: Watch for unused dependencies; `sharp` (image processing) is a large peer dep but can be stripped for GitHub Pages

## Notes for Development

- **Windows Compatibility**: Path handling for MDX includes Windows backslash conversion (`replace(/\\/g, '/')`)
- **ESBUILD Binary**: Automatically set for Windows in [lib/mdx.js](lib/mdx.js) line 51-55
- **Linting**: ESLint configured via `next/core-web-vitals` preset; runs on `pages/`, `components/`, `lib/`, `layouts/`, `scripts/`
- **Code Formatting**: Prettier with Tailwind CSS sorting plugin (`prettier-plugin-tailwindcss`)
- **Git Hooks**: Husky + lint-staged auto-format staged files before commit
