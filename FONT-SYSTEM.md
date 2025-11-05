# Hall XIII Font System

## Font Families

### 1. SCHABO Condensed (Titels)
```css
font-family: var(--font-schabo);
font-weight: 100;
```
**Gebruik voor:**
- Hoofdtitels (H1, H2, H3)
- Hero headings
- Section titels
- Grote display tekst

### 2. Grifter (Paragrafen)
```css
font-family: var(--font-grifter);
font-weight: 400;
```
**Gebruik voor:**
- Body tekst
- Paragrafen
- Beschrijvingen
- Navigatie links
- Formulier labels

### 3. Relost Brush (Details)
```css
font-family: var(--font-relost);
font-weight: 400;
```
**Gebruik voor:**
- Buttons
- Menu items
- Handgeschreven details
- Accent tekst
- CTA elementen

## Font Sizes

Het font systeem schaalt automatisch op basis van schermgrootte:

| Variable | Mobile | Tablet | Desktop | Large | XL |
|----------|--------|--------|---------|-------|----|
| `--font-xs` | 12px | 12px | 12px | 12px | 12px |
| `--font-sm` | 14px | 14px | 14px | 14px | 14px |
| `--font-base` | 16px | 16px | 18px | 18px | 20px |
| `--font-lg` | 18px | 20px | 22px | 24px | 26px |
| `--font-xl` | 20px | 24px | 26px | 28px | 32px |
| `--font-2xl` | 24px | 28px | 32px | 36px | 40px |
| `--font-3xl` | 30px | 36px | 40px | 48px | 56px |
| `--font-4xl` | 36px | 48px | 56px | 64px | 72px |
| `--font-5xl` | 48px | 60px | 72px | 80px | 96px |
| `--font-6xl` | 60px | 72px | 84px | 96px | 112px |
| `--font-7xl` | 72px | 84px | 96px | 108px | 128px |
| `--font-8xl` | 96px | 112px | 128px | 144px | 160px |
| `--font-9xl` | 128px | 144px | 160px | 180px | 200px |

## Gebruik Guidelines

### Titels (SCHABO)
```css
/* Hero Heading */
h1 {
  font-family: var(--font-schabo);
  font-weight: 100;
  font-size: var(--font-7xl); /* of --font-8xl */
  text-transform: uppercase;
  line-height: 0.9;
}

/* Section Titel */
h2 {
  font-family: var(--font-schabo);
  font-weight: 100;
  font-size: var(--font-6xl);
  text-transform: uppercase;
  line-height: 0.94;
}

/* Subtitel */
h3 {
  font-family: var(--font-schabo);
  font-weight: 100;
  font-size: var(--font-4xl);
  text-transform: uppercase;
}
```

### Paragrafen (Grifter)
```css
/* Body tekst */
p {
  font-family: var(--font-grifter);
  font-weight: 400;
  font-size: var(--font-base);
  line-height: 1.625;
}

/* Kleine tekst */
.small-text {
  font-family: var(--font-grifter);
  font-weight: 400;
  font-size: var(--font-sm);
  line-height: 1.5;
}

/* Grote paragraaf */
.lead {
  font-family: var(--font-grifter);
  font-weight: 400;
  font-size: var(--font-lg);
  line-height: 1.75;
}
```

### Details & Buttons (Relost Brush)
```css
/* Button */
button {
  font-family: var(--font-relost);
  font-weight: 400;
  font-size: var(--font-2xl);
}

/* Menu item */
.menu-item {
  font-family: var(--font-relost);
  font-weight: 400;
  font-size: var(--font-xl);
}

/* Accent detail */
.detail {
  font-family: var(--font-relost);
  font-weight: 400;
  font-size: var(--font-sm);
}
```

## Breakpoints

```css
/* Mobile First (default) */
/* 320px - 767px */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1280px) { }

/* XL Desktop */
@media (min-width: 1536px) { }
```

## Best Practices

1. **Gebruik altijd CSS variables** voor font-sizes in plaats van hardcoded px waardes
2. **Text-transform: uppercase** gebruiken bij SCHABO titels
3. **Line-height** aanpassen per font:
   - SCHABO: 0.9 - 0.95 (tight)
   - Grifter: 1.5 - 1.75 (comfortable)
   - Relost Brush: 1.0 - 1.2 (compact)
4. **Gebruik font-weight: 100** bij SCHABO voor een lichte look
5. **Gebruik font-weight: 400** bij Grifter en Relost Brush

## Voorbeeld Component

```css
.hero {
  /* Titel */
  .heading {
    font-family: var(--font-schabo);
    font-weight: 100;
    font-size: var(--font-7xl);
    text-transform: uppercase;
    line-height: 0.9;
  }

  /* Beschrijving */
  .description {
    font-family: var(--font-grifter);
    font-weight: 400;
    font-size: var(--font-base);
    line-height: 1.625;
  }

  /* Button */
  .button {
    font-family: var(--font-relost);
    font-weight: 400;
    font-size: var(--font-2xl);
  }
}
```

## Migration Checklist

Als je bestaande CSS wilt omzetten:
- [ ] Vervang hardcoded font-family met CSS variables
- [ ] Vervang hardcoded font-size met CSS variables
- [ ] Verwijder media queries voor font-size (wordt automatisch geschaald)
- [ ] Check font-weight is correct (100 voor SCHABO, 400 voor rest)
- [ ] Test op alle breakpoints
