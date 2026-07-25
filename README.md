# Boshen Auto

A static marketing website for a Singapore used-car listings business. Plain HTML/CSS/JS — no build step, no framework, no dependencies.

Live site: https://boshen-blip.github.io/claude-lesson/

## Running locally

Serve the directory root with any static file server and open `index.html`:

```bash
ruby -run -e httpd . -p 8123   # or: python3 -m http.server 8123, or npx serve
```

Opening `index.html` directly via `file://` mostly works too, but query-string based routing on `car.html?id=N` is more reliable over `http://`.

## Structure

- `index.html` — homepage: hero, car listing grid, about section, contact form.
- `car.html` — single reusable detail-page template for every car; reads `?id=` from the URL.
- `js/cars-data.js` — single source of truth for car inventory data.
- `js/main.js` / `js/car-detail.js` — render the grid and detail views from `cars-data.js`.
- `css/styles.css` — shared stylesheet for both pages.

See [CLAUDE.md](CLAUDE.md) for more on the architecture and Singapore-specific domain conventions (COE, plate numbers, WhatsApp contact, etc).

## Deployment

Pushes to `main` auto-deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.
