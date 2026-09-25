# Gireesha R · Portfolio

Personal portfolio of **Gireesha R**, Senior Frontend Developer (Angular · TypeScript · RxJS · NgRx).

Built with **Angular 21** using standalone components, signals, the new `@if` / `@for` control flow and zoneless change detection. No UI library: all styling is hand-written SCSS with light and dark themes.

## Features

- Animated hero with a typing effect, count-up stats and a tilting code card
- Scrolling skills strip that pauses on hover
- Experience timeline and project cards with a cursor spotlight
- Floating **Resume** button that downloads the CV, with a scroll-progress ring
- Scroll progress bar and active-section highlighting in the navbar
- Light / dark theme toggle (dark by default)
- Fully responsive, and respects `prefers-reduced-motion`

## Run locally

Requires Node.js 20.19 or newer.

```bash
npm install
npm start        # http://localhost:4200
```

## Build

```bash
npm run build    # output in dist/gireesha-portfolio/browser
```

## Edit content

All text lives in one file: [`src/app/data/portfolio.data.ts`](src/app/data/portfolio.data.ts).
To update the CV, replace `public/Gireesha_R_Resume.pdf`.

## Project structure

```
src/app/
├── data/portfolio.data.ts      # all site content
├── sections/                   # navbar, hero, about, skills, work, contact, resume button
└── shared/                     # theme + scroll services, reveal-on-scroll directive
```

## Contact

gireeshafed@gmail.com
