# SbS Industrial - Next.js Component Based Homepage

This project converts your single HTML file into a **production-ready, SEO-optimized, reusable Next.js App Router** structure.

## Why this is better (lighter & smarter)

- **No CDN Tailwind**: Uses Tailwind v4 via PostCSS, purged in production = 90% smaller CSS.
- **No inline <script>**: All JS is React state, no global variables.
- **next/font**: Outfit + Inter loaded with `display:swap`, self-hosted, no external request.
- **Reusable components**: `ProductCard`, `SectionGrid`, `CategorySection`, `BrandStrip` etc.
- **Contexts**: `CartContext` and `LocationContext` instead of global `let cart=[]`.
- **SEO**: 
  - `metadataBase`, `title.template`, `openGraph`, `twitter`, `robots`, `sitemap.xml`, `manifest.json`
  - JSON-LD Organization + WebSite with SearchAction
  - Semantic headings (h1 for hero, h2 for sections), alt tags, canonical
- **Performance**: lazy images, client components only where needed, static server components for grids.

## Folder Structure (easy to learn)

```
src/
  app/
    layout.js    -> fonts, metadata, JSON-LD, providers
    page.js      -> assembles homepage
    globals.css  -> Tailwind + custom animations
    sitemap.js / robots.js / manifest.js -> SEO
  lib/
    data.js      -> ALL data: categories, products, hero slides (edit here)
    utils.js     -> formatINR etc.
  components/
    layout/
      Header.jsx, TopTicker.jsx, MegaMenu.jsx, Footer.jsx
      CartContext.jsx, LocationContext.jsx
    ui/
      ProductCard.jsx, ToastProvider.jsx
    home/
      HeroSlider.jsx, TrustBadges.jsx, SectionGrid.jsx, CategorySection.jsx, BrandAndBanners.jsx
    modals/
      CartDrawer.jsx, LocationModal.jsx
```

## How to add a new category

1. Open `src/lib/data.js`
2. Add to `CATEGORIES` and create product array
3. Add to `SECTIONS` - homepage auto renders it.

## SEO checklist included

- Meta title (60 chars) + description (155 chars)
- OG image 1200x630
- Twitter large card
- Canonical
- JSON-LD
- robots.txt + sitemap.xml
- themeColor #1B2B4B
- Alt tags on all product images
- Structured headings
