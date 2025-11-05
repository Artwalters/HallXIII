# Hall XIII

Hall XIII sportschool website - een moderne, responsive website gebouwd met Next.js 16 en TypeScript.

## Tech Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript 5
- **Styling**: CSS Modules
- **Animations**: GSAP 3.13
- **Slider**: Swiper 12
- **UI**: React 19.2

## Project Structure

```
hall13v2/
├── app/
│   ├── components/          # React components met CSS modules
│   │   ├── Hero.tsx
│   │   ├── Hero.module.css
│   │   ├── ExpertiseSection.tsx
│   │   ├── ExpertiseSection.module.css
│   │   ├── GymSection.tsx
│   │   ├── GymSection.module.css
│   │   ├── OnboardingForm.tsx
│   │   └── OnboardingForm.module.css
│   ├── globals.css          # Global styles, fonts & CSS variables
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── public/
│   ├── assets/              # Images & SVGs
│   └── fonts/               # Custom fonts (Schabo, Grifter, Relost Brush)
└── package.json
```

## CSS Architecture

Het project gebruikt **CSS Modules** voor component-scoped styling:
- Elke component heeft zijn eigen `.module.css` bestand
- `globals.css` bevat alleen:
  - Font-face declarations
  - CSS custom properties (variabelen)
  - Global resets
  - Utility classes

## Responsive Font System

Het project gebruikt een responsive font scale met CSS variables:
- Mobile first approach
- Breakpoints: 768px, 1024px, 1280px, 1536px
- Font sizes schalen automatisch per breakpoint
- Semantic naming voor betere leesbaarheid

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## Fonts

Het project gebruikt drie custom fonts:
- **SCHABO Condensed**: Titels en grote tekst
- **Grifter Variable**: Body text en navigatie
- **Relost Brush**: Handgeschreven accenten en buttons

## Deploy

De website kan gedeployed worden op:
- Vercel (aanbevolen)
- Netlify
- Elke hosting platform die Next.js ondersteunt
