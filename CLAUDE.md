# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static marketing website for a Singapore used-car listings business ("Boshen Auto"). Plain HTML/CSS/JS — no build step, no package.json, no framework, no dependencies.

## Running it

There is no dev server or build command. Serve the directory root with any static file server and open `index.html`:

```bash
ruby -run -e httpd . -p 8123   # or: python3 -m http.server 8123, or npx serve
```

Opening `index.html` directly via `file://` mostly works too, but query-string based routing on `car.html?id=N` is more reliable over `http://`.

There are no tests, linter, or build/CI pipeline configured.

## Architecture

Two HTML pages share one data source and one stylesheet:

- **`index.html`** — single scrolling page: hero, car listing grid (`#car-grid`), about section, contact form. Populated by `js/main.js`.
- **`car.html`** — one reusable detail-page template for *every* car. It has no car-specific markup; `js/car-detail.js` reads `id` from `location.search` (i.e. `car.html?id=3`), looks up the matching entry, and injects the full detail view. Adding a new listing never means adding a new HTML page.
- **`js/cars-data.js`** — the single source of truth: one `CARS` array of plain objects (make, model, year, price, mileage, plateNumber, coeExpiry, description, image URL, etc). Both `main.js` (grid) and `car-detail.js` (detail view) read from this same array — update inventory only here.
- **`css/styles.css`** — one shared stylesheet for both pages.

Car photos are hotlinked directly from Wikimedia Commons (`upload.wikimedia.org`), not stored locally — each entry carries `image`, `imageCredit`, and `imageCreditUrl` for attribution, rendered as a small credit line on the detail page.

## Domain conventions (Singapore car market)

This is deliberately localized for Singapore, not a generic template — keep these conventions when editing or adding listings:

- Prices are **SGD**, mileage is in **km** (not miles).
- Every car has a `coeExpiry` (COE = Certificate of Entitlement, the vehicle's usage-rights expiry date) and a `plateNumber` — both are standard fields on any Singapore car listing and are shown in the spec table on the detail page.
- Contact is dual-channel: a `mailto:` link built client-side from the contact form, and a WhatsApp deep link (`https://wa.me/<number>?text=...`) — WhatsApp is the primary channel Singapore buyers expect, not email.
- `CONTACT_EMAIL` and `WHATSAPP_NUMBER` are placeholder constants duplicated at the top of both `js/main.js` and `js/car-detail.js` — update both when wiring up real contact details.
