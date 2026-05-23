# RESQ Frontend Next.js (Headless WooCommerce)

Production-ready starter storefront built with **Next.js 16 App Router**, **TypeScript**, **Tailwind CSS**, **WPGraphQL**, and **Zustand** cart state management.

## Project Structure

- `app/` - App Router pages and layouts (Server Components by default)
- `components/` - Reusable UI components (product UI, cart UI, site shell)
- `lib/` - API and utility modules (`lib/api.ts`, Zustand cart store)
- `types/` - Shared TypeScript interfaces for products and cart state

## Environment Variables

Copy `.env.example` to `.env.local` and set:

- `WP_GRAPHQL_URL`
- `WC_CONSUMER_KEY`
- `WC_CONSUMER_SECRET`

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Included Boilerplate

- **PLP**: `app/products/page.tsx`
- **PDP**: `app/products/[slug]/page.tsx`
- Typed, cached WPGraphQL fetch utilities in `lib/api.ts`
- Client-side shopping cart state via Zustand (`lib/cart-store.ts`)
