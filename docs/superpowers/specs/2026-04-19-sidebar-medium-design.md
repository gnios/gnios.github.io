# Sidebar Medium-Style Redesign

**Date:** 2026-04-19  
**Status:** Approved

## Overview

Redesign the left sidebar to match Medium's visual style, and add a hamburger toggle in the Topbar that collapses/expands the sidebar between full (icon + text) and icon-only modes.

## Requirements

- Sidebar visually matches Medium: no left-border active indicator, hover uses rounded background, icons are outline SVGs at 18×18px, font weight distinguishes active vs inactive
- Add Blog to nav items (currently missing from sidebar)
- Hamburger button appears in Topbar, to the left of the site logo
- Expanded state (260px) is the default on desktop
- Clicking hamburger animates the sidebar to collapsed state (64px, icons only)
- Collapsed mode shows tooltips on icon hover (native `title` attribute)
- Sidebar state persists across page loads via `localStorage`
- Transition animates both the sidebar width and the main content margin-left (250ms ease)
- Dark mode fully supported

## Nav Items (6 total)

| Label | Href | Icon |
|---|---|---|
| Home | `/` | house |
| Blog | `/blog` | pencil/edit |
| Snippets | `/snippets` | code brackets `<>` |
| Projetos | `/projects` | grid of squares |
| Sobre | `/resume` | person |
| Contato | `/contact` | envelope |

## Visual Design

- **Active item:** `color: #191919` (dark: `#fafafa`), `font-weight: 600` — no border
- **Inactive item:** `color: #6b6b6b`, `font-weight: 400`
- **Hover:** rounded background `bg-wash` (light) / `#252525` (dark), `border-radius: 6px`, `margin: 1px 8px`
- **Padding per item:** `9px 14px`
- **Icon size:** 18×18px, opacity 0.5 when inactive, 1 when active
- **Collapsed icons:** centered in 36×36px circular button, same opacity rules
- **Font size:** 14px, system sans-serif stack

## Architecture

### New File: `components/SidebarContext.js`

React Context providing:
- `isCollapsed: boolean` — sidebar state
- `toggleSidebar: () => void` — flip the state

Initialization reads `localStorage.getItem('sidebar-collapsed')` (default: `false`).  
On toggle: updates state and writes new value to `localStorage`.

### Modified: `components/SidebarNav.js`

- Consumes `SidebarContext` via `useContext`
- Nav items array updated to 6 items (Blog added with edit/pencil icon)
- Width: `w-[260px]` expanded → `w-16` (64px) collapsed
- Applied via `transition-[width] duration-250 ease-in-out overflow-hidden`
- Item text and labels: hidden with `opacity-0 w-0 overflow-hidden` when collapsed (also animated)
- Collapsed mode: icon centered, `title` attribute on `<Link>` for native tooltip
- No `border-l-[3px]` — active state via font-weight + color only

### Modified: `components/Topbar.js`

- Consumes `SidebarContext` via `useContext`
- Adds hamburger button as the first element in the left section (before logo)
- Hamburger: 3 horizontal lines, 16×16px area, hover rounded background
- `onClick` calls `toggleSidebar()`
- Button has `hidden lg:flex` — invisible on mobile where the sidebar is not rendered

### Modified: `components/LayoutWrapper.js`

- Wraps the entire layout with `<SidebarProvider>`
- Main content div: `lg:ml-[260px]` → `lg:ml-[64px]` based on `isCollapsed`
- Applied via inline style or dynamic class with same 250ms ease transition

## Behavior Notes

- Sidebar only visible on `lg:` and above (unchanged from current behavior)
- On mobile: sidebar remains hidden, hamburger has no effect (mobile nav unchanged)
- No changes to `MobileNav.js` or any layout files (`PostLayout`, `ListLayout`, etc.)
- `headerNavLinks.js` unchanged (used only by MobileNav)

## Files Changed

| File | Change |
|---|---|
| `components/SidebarContext.js` | **CREATE** — Context + Provider |
| `components/SidebarNav.js` | **MODIFY** — Medium style, 6 items, collapse animation |
| `components/Topbar.js` | **MODIFY** — hamburger button |
| `components/LayoutWrapper.js` | **MODIFY** — wrap with Provider, animated margin |
