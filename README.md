# ZelSpark — Don’t just know it. Make it.

A complete, responsive prelaunch website built with semantic HTML, CSS, vanilla JavaScript, and Three.js. The homepage is an original scroll-driven four-chapter journey inspired by the experiential structure of the Kage reference. No Kage code or artwork is included. Course outlines remain labelled sample concepts.

## Start locally

Install Node.js 22 LTS or later. Extract this project, open a terminal in its folder, and run:

```sh
npm ci
npm run dev
```

Open `http://localhost:4173`. Stop with Ctrl+C. No account, API key, or environment file is required.

After changing content in `src/data.js` or templates in `scripts/generate.mjs`, run `node scripts/generate.mjs` to refresh the HTML used by the development server.

## Build and check

```sh
npm run build
npm run check
npm run preview
```

`dist/` contains the complete deployable website. It is included in the download. You can also serve it without Node using `python -m http.server 8080 --directory dist` and open `http://localhost:8080`. Use an HTTP server; opening HTML directly with `file://` will not load module scripts correctly.

Upload the contents of `dist/` to a static host configured to serve directory `index.html` files and use `404.html` for missing pages. Do not configure every unknown URL to return the homepage. No Worker or application backend is required for this version.

## What is included

- Home with a continuous Three.js learning world, scroll-driven camera and geometry, four narrative chapters, jump navigation, and a CSS fallback when WebGL is unavailable.
- Programs with subject filters, search, result counts, empty state, and four detailed sample paths.
- Approach, studio, about, institutional/industry/mentor partner journeys, contact, privacy/site information, and a 404 page.
- Three self-guided studio challenges with independent temporary checklists, progress, reset, and downloadable briefs.
- Validated student/parent/partner enquiries with query-prefilled interests, conditional organization fields, accessible errors, draft review, edit, and download.
- Local fonts, optimized WebP imagery, responsive layouts, keyboard controls, reduced-motion support, and a static Three.js SVG fallback when WebGL is unavailable.
- Per-page metadata, canonical URLs, Open Graph metadata, WebSite structured data, a sitemap, and an SVG favicon.

The private prelaunch site intentionally has `noindex,nofollow` and a robots exclusion. Remove these only when the approved public content and policies are ready.

## Update the content

| File | Purpose |
| --- | --- |
| `src/data.js` | Central program, module, skill, FAQ, challenge, and methodology content |
| `scripts/generate.mjs` | Shared header/footer, page templates, metadata, sitemap, and robots generation |
| `src/styles.css` | Design tokens and responsive styles |
| `src/main.js` | Navigation, filters, keyboard behavior, challenges, and enquiries |
| `src/journey.js` | Homepage Three.js world, scroll camera, and animation |
| `src/spark.js` | Earlier standalone spark component retained for later reuse |
| `src/config.js` | Optional live enquiry endpoint and timeout |
| `public/images/studio.webp` | Clearly labelled illustrative studio image |
| `public/favicon.svg` | Proposed spark monogram |
| `vite.config.js` | Multi-page build inputs; add new route inputs here |

Run `npm run build` after updates. Do not edit generated HTML as your long-term content source; rebuilding replaces it.

To change the domain, set `SITE_URL` when running the build or update the default `origin` in `scripts/generate.mjs`. On Windows PowerShell: `$env:SITE_URL="https://your-confirmed-domain"; npm run build`. On macOS/Linux: `SITE_URL=https://your-confirmed-domain npm run build`.

## Enquiries: current behavior

`src/config.js` contains an empty endpoint. In this mode **nothing is submitted**. Form entries stay in memory in the current page and can be downloaded by the visitor. No cookies, localStorage, analytics, or database records are created by the application. Hosting may have its own operational logging/authentication.

A live HTTPS adapter is implemented with pending, success, timeout, and failure states. It is inactive until configured. The backend, spam protection, notification service, and real privacy notice must be supplied before enabling it. See `docs/INTEGRATIONS.md`.

No account, payment, LMS, student dashboard, certificate, internship, or placement system is represented as functional.

## Creative direction

ZelSpark is a maker’s studio: bright, specific, and open to experimentation. Cobalt blue brings energy; acid yellow marks the next action; black and near-white make reading calm. Space Grotesk carries the identity, with DM Sans for longer text. The spark is an abstract idea taking shape as a visitor explores Discover → Develop → Demonstrate → Evolve.

Student journey: discover a direction → inspect the project and proposed learning outline → try a mini challenge or prepare a program enquiry.

Parent journey: understand the purpose and method → read FAQs and explicit availability information → prepare a parent enquiry.

Partner journey: choose institution, industry, or mentoring → understand possible collaboration scope → prepare a context-specific enquiry.

## Before public launch

Read `docs/LAUNCH-CHECKLIST.md` for the exact company details and decisions needed, and `docs/QA.md` for verification and limits. The design includes a proposed wordmark; the SOP references an approved monogram, but no approved logo asset was attached.

## Assets and dependencies

The studio photograph is AI-generated illustrative artwork, not actual ZelSpark students. Its disclosure is visible on the site. Space Grotesk and DM Sans are self-hosted via Fontsource; font licensing files are in `docs/licenses/`. Three.js is MIT licensed; its notice is also included. Dependency versions are pinned by `package-lock.json`.
