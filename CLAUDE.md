# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build (output: dist/)
npm run preview   # Preview production build locally
```

No linter or test runner is configured.

## Architecture

Single-page React app (Vite + React 19) with no routing — all sections live on one scrollable page anchored by `id`.

**Data flow:** `main.jsx` → `App.jsx` → section components. i18n is initialized in `src/i18n.js` and imported at the top of `App.jsx` before any component. The `useTranslation()` hook is used directly inside each section.

**Sections** (`src/sections/`): `Hero`, `About`, `Experience`, `Skills`, `Projects`, `Contact` — each lives in its own folder as `index.jsx` + `ComponentName.css`. Data (skills, projects, experience) is defined as constants inside the component file, not fetched.

**Components** (`src/components/`): `Navbar`, `Footer`, `CustomCursor`, `ScrollToTop` — same folder-per-component convention as sections.

**Hooks** (`src/hooks/`): `useScrollReveal.js` — sets up an IntersectionObserver on all `[data-reveal]` elements, adding class `in-view` when they enter the viewport. Called once in `App.jsx`.

**Config** (`src/config/`):
- `emailjs.js` — reads EmailJS credentials from `import.meta.env`
- `personal.js` — reads personal contact/social data from `import.meta.env` (email, phone, GitHub, LinkedIn, Instagram, CV URL). Import `PERSONAL` from here instead of hardcoding values in components.

**Styling:** Plain CSS with co-located files (no CSS modules, no Tailwind). Global design tokens (colors, fonts, transitions, animations, scroll-reveal) are CSS custom properties in `src/styles/globals.css`. Reusable utility classes: `glass-card`, `btn-primary`, `btn-outline`, `container`, `section-header`.

**i18n:** Two locales — `es` (default) and `en` — in `src/locales/{lang}/translation.json`. Language persisted in `localStorage` under key `lang`. To add a string, add it to both JSON files and access with `t('key.path')`.

**Scroll reveal:** Add `data-reveal` attribute to any `<section>` element. `useScrollReveal` picks it up automatically — no other changes needed.

**Responsive breakpoints:** `1024px` → `900px` → `768px` → `640px` → `480px`. Each section CSS handles its own breakpoints; `globals.css` handles container padding and section titles.

## Environment variables

All sensitive/configurable values live in `.env` (gitignored). Required variables:

```
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY

VITE_EMAIL
VITE_PHONE
VITE_PHONE_DISPLAY
VITE_GITHUB
VITE_LINKEDIN
VITE_INSTAGRAM
VITE_CV_URL
```

## Key conventions

- Each section has its own `id` matching its nav link (`id="about"` ↔ `href="#about"`). `scroll-padding-top: 80px` accounts for the fixed navbar height.
- The Navbar `links` array drives both desktop and mobile nav — add a new section key there and add the translation key to both `translation.json` files.
- Contact form uses `@emailjs/browser` — credentials via `src/config/emailjs.js`.
- Personal contact/social links are centralized in `src/config/personal.js` — update `.env`, not the components.
- Custom cursor (`CustomCursor`) is hidden on touch devices via `@media (hover: none), (pointer: coarse)`.
- `body { cursor: none }` is set in `globals.css` for the custom cursor; same media query restores it on mobile.
