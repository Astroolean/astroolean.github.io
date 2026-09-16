## FatAshBOT 1.0 GitHub Pages

Created by Astroolean
Clean website package files: 19

# FatAshBOT GitHub Pages Website

This release is organized so the repository root stays clean.

## Repository layout

```text
astroolean.github.io/
├── index.html
└── website/
    ├── assets/
    ├── css/
    ├── js/
    ├── pricing.html
    ├── privacy.html
    ├── terms.html
    ├── pricing/      # compatibility redirect
    ├── privacy/      # compatibility redirect
    ├── terms/        # compatibility redirect
    ├── 404.html
    ├── robots.txt
    ├── sitemap.xml
    └── site.webmanifest
```

`index.html` is intentionally the only homepage file at the repository root. Every supporting website file is organized inside `website/`.

## GitHub Pages deployment

1. Open the repository that powers `astroolean.github.io`.
2. Upload `index.html` to the repository root.
3. Upload the complete `website` folder next to it. Do not upload the ZIP itself.
4. Commit the files.
5. In GitHub Pages settings, publish from the branch/root that contains `index.html`.

The public URLs are:

- Website: `https://astroolean.github.io/`
- Pricing: `https://astroolean.github.io/website/pricing.html`
- Privacy: `https://astroolean.github.io/website/privacy.html`
- Terms: `https://astroolean.github.io/website/terms.html`

For the X Developer Portal, use the root website URL for Website URL and the organized Privacy/Terms URLs above when those fields are requested.

## Change pricing

Edit `website/js/pricing-config.js`. Prices, status names, perks, and the purchase/contact destination are centralized there.

## Canonical branding

The exact FatAshBOT logo is stored in `website/assets/logo.svg`. Raster versions used by the web manifest are in the same assets folder. This is the same canonical logo now used by the desktop application and Owner License Manager.


## GitHub Pages path reliability

The public navigation uses explicit `.html` files for Pricing, Privacy, and Terms. This intentionally avoids relying on directory index resolution, so GitHub Pages receives a literal file path for every important navigation target. The old directory URLs are kept only as compatibility redirects.
