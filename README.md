# Kavach website

Static marketing site for Kavach, built with [Astro](https://astro.build). Every page is plain HTML and CSS at build time. The only JavaScript is the small amount needed for the interactive demos and the pilot form.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs the static site to dist/
npm run check-links
```

Needs Node 22 or newer.

## Where things live

| What you want to change | File |
| --- | --- |
| Use cases on the home page | `src/data/usecases.js` |
| Benchmark table | `src/data/benchmark.js` |
| Language picker samples | `src/data/languages.js` |
| Navigation and site name | `src/data/site.ts` |
| Pilot form email / endpoint | `src/config.ts` |
| Colours and fonts | `src/styles/tokens.css` |
| Animations | `src/styles/motion.css` |
| Header, footer, background grid, alphabet ribbon | `src/layouts/Base.astro` |
| Page content | `src/pages/*.astro` |
| Interactive demo markup | `src/templates/<page>/*.html` |
| Interactive demo behaviour | `src/logic/<page>.js` |

Most content edits only touch `src/data/` or the text in `src/pages/`.

### Design rules

- **Indigo `#1E2C6B` means protected:** redaction bars, tokens, the primary button. Don't use it for decoration.
- **Vermilion `#C2410C` means detected or needs attention:** raw PII highlights, the stamp, focus rings. Never use it for hover states.
- **Khadi `#F4F1E8` is the ground.**
- **One primary action site-wide:** "Book a pilot".
- **Every demo toggle uses the labels "Original / Protected".**
- **Copy style:** no em dashes.

## Publishing

Every push to `main` builds and deploys to GitHub Pages through `.github/workflows/deploy.yml`. Pull requests are built and link-checked but not deployed.

**First-time setup:** in the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**. The site will then be at `https://<user>.github.io/<repo>/`.

**Custom domain:** add it under **Settings → Pages → Custom domain** and point a DNS `CNAME` at `<user>.github.io`. The workflow picks up the new address automatically, so no code change is needed.

## Before going live

- [ ] Set the real address in `src/config.ts` (`contactEmail`), or a `formEndpoint` that accepts the pilot form as JSON.
- [ ] Replace `[PRICE]` on the pilot page.
- [ ] Replace `[LINK TO HARNESS]` on the home page.
- [ ] Quarterly: check the DPDP dates, benchmark numbers and pricing are still current.

## Browser support

The scroll-linked animations (pinned story, armour plates, product walkthrough) use CSS scroll timelines. These work in Chrome, Edge and Safari 26 and later. Other browsers, and visitors with reduced motion turned on, see each section in its finished state.

Fonts are self-hosted through Fontsource, so visitors' browsers make no requests to Google or any other third party.
