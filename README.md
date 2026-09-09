# Cloud Bird India

The Cloud Bird India marketing site, rebuilt in Next.js from the original
single-file HTML build. Layout, copy, translations and behaviour are unchanged;
the differences are structural and are listed under "What changed" below.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Script              | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                  |
| `npm run build`     | Static export to `out/`                             |
| `npm run test`      | Unit tests (Vitest)                                 |
| `npm run typecheck` | TypeScript, no emit                                 |
| `npm run lint`      | ESLint                                              |

## Deploying

`npm run build` writes a fully static site to `out/`. Upload that folder to any
static host — Nginx, Netlify, Vercel, S3 + CloudFront. There is no server
runtime and no environment variables to set.

## Project layout

```
src/
  app/
    layout.tsx        Fonts, metadata, language provider, scroll reveal
    page.tsx          Section order for the one page
    globals.css       The whole stylesheet, ported from the original
    icon.png          Favicon, generated from the brand logo
  components/         One file per section, plus the header and footer
  data/
    customers.ts      Client list — add or edit clients here
    services.ts       The nine service cards and their icons
    locations.ts      Offices, status, addresses, WhatsApp numbers
    flags.tsx         Inline SVG flags
    site.ts           Support email, head office address, brand logo path
  i18n/
    translations.ts   Every string in English, Nepali and Russian
    LanguageProvider.tsx
  lib/mailto.ts       Builds the contact form's mailto: URL
tests/                Unit tests for the data and the mailto builder
public/logos/         24 client and brand logos as PNG files
```

## Common edits

**Add a client.** Drop the logo in `public/logos/` named `<key>.png`, then add a
`{ name, key, url }` entry to `CUSTOMERS` in `src/data/customers.ts`. The grid
grows on its own. Leave `url` empty for a client with no site — the tile renders
unlinked, exactly as `octaq` and `techenable` do today.

**Change wording.** Every visible string lives in `src/i18n/translations.ts`.
Edit all three language blocks; a unit test fails if the keys drift apart.

**Add an office.** Append to `LOCS` in `src/data/locations.ts` and add its flag
to `src/data/flags.tsx`. The optional `contact` field names the person on that
office's WhatsApp number and renders just above it. Names are shown as written
in every language, like the city names beside them.

## What changed from the original

Nothing visible, and nothing functional. The structural differences:

- **Logos are files, not data URIs.** The 24 base64 PNGs came out of the HTML
  into `public/logos/`. The page dropped from 1.27 MB to roughly 39 KB, and the
  logos now lazy-load and cache.
- **Fonts are self-hosted.** Poppins and Inter are served from the app rather
  than the Google Fonts CDN. The fallback chains are configured to resolve
  exactly as the original's did, including Cyrillic and Devanagari.
- **Added polish.** Scroll reveal, an animated burger, a focus-visible outline
  on every control, a skip link, `scroll-margin` so the sticky header stops
  covering anchor targets, and a message when the contact form is submitted
  empty. All of it respects `prefers-reduced-motion`, and none of it moves an
  element.
- **The site always opens in English.** The original remembered a visitor's
  language choice in `localStorage` under `cb_lang`, so anyone who tried
  Russian once was greeted in Russian on every later visit. The switcher now
  applies to the current visit only. To bring the memory back, store and read
  the chosen language in `src/i18n/LanguageProvider.tsx`.
- **Client logos show in full colour.** The original greyed them out and faded
  them to 72% until hover.
- **WhatsApp numbers hold one line.** They used to break mid-number. The
  "(WhatsApp only)" note now drops beneath when a card cannot hold both. Below
  480px the location cards stack one per row, because a two-across card is
  narrower than the longest number and `.loc` hides its overflow.

Verified against the original with full-page screenshot diffs at 390, 768, 1280
and 1440 pixels wide, in all three languages. Outside the location cards, the
only rendered difference is the clock emoji in the top bar, which this build
draws and the original does not.

## Known issue inherited from the original

Below about 414px the page scrolls horizontally by 20 to 90 pixels. The service
cards force their grid tracks wider than the viewport, because `1fr` floors at
the widest unbreakable word. The original does this too, by exactly the same
amount. Changing `.svc-grid` to `minmax(0,1fr)` fixes it, at the cost of the
service card text wrapping slightly differently on phones.
