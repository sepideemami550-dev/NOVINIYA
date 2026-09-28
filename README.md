# Noviniya customer website

The public entry point is `src/components/CustomerHome.tsx`, mounted by `src/main.tsx`.
`src/customerConfig.ts` contains the confirmed contact number, service labels and plan descriptions.
Earlier dashboard components remain in source but are not part of the public bundle.

## Build

Use Node.js 22+ and pnpm. Run `pnpm install --frozen-lockfile`, `pnpm lint` and `pnpm build`.
The publishable static site is `dist/`. Keep `public/CNAME`, sitemap, robots and service pages.
Publish the contents of `dist/` to `gh-pages`, with `404.html` copied from `dist/index.html`.
Remove obsolete public JS bundles during deployment; do not expose old build artifacts.

## Request behavior

The request dialog prepares a message locally. It does not create an order or send SMS automatically.
The customer opens the prefilled WhatsApp chat at 989127050799 and sends the request, or contacts Noviniya directly. Confirmation SMS must be sent by Noviniya after actual registration; automatic confirmation still requires a secure backend.
Do not display successful delivery until a real backend confirms delivery. No API credentials belong
in browser code. The previously published SMS credential must be rotated by its owner before reuse.

Demonstration calculators use fictional example data and never send requests, reserve services or
charge money. Their completion states explicitly say so. The growth example is a user-selected
arithmetic scenario, not a sales forecast. Prices, delivery commitments and portfolio references
must be confirmed before adding them to the customer site.

## Validation for the customer-clarity update

- TypeScript check and production build pass.
- All ten demos render without page overflow at 390px and 360px viewport widths.
- Moving vehicle selection changes the quote; demo completion never sends a request.
- Selected industry carries into the request dialog, including cleaning and accounting.
- Dialog supports native modal focus, Escape, close, scroll and return of focus.
- Prepared request includes the selected plan and industry and targets 09127050799; no test message sent.
- Mobile navigation, desktop layout and preserved SEO service pages checked.
