# ResQ Organics — Cart Bridge Architecture Decision Record

**Status:** ADOPTED  
**Decision Date:** 2026-05-24  
**Owner:** ResQ Engineering  

---

## Executive Summary

ResQ adopts **Option A: Next.js API Route Proxy (Backend-for-Frontend Pattern)** as the exclusive architecture for the Headless WooCommerce Cart Bridge. This decision commits us to server-side authentication, eliminating browser-level CORS/SameSite constraints while maintaining strict separation of concerns between the frontend client and WooCommerce backend.

---

## Decision Rationale

### Why Option A (Not B or C)

| Criterion | Option A (Proxy) | Option B (CORS) | Option C (Subdomain) |
|-----------|------------------|-----------------|----------------------|
| **Security** | WC keys never touch browser | Keys must be exposed in SameSite=None | Keys server-side only |
| **Setup Complexity** | Zero WordPress config | Requires Nexcess plugin/config | Requires DNS + domain routing |
| **Browser Compatibility** | Universal (no SameSite issues) | Fragile across policy updates | Universal once set up |
| **Maintenance Burden** | Low (contained in Next.js) | High (WP config dependency) | Moderate (DNS/domain config) |
| **Timeline to Launch** | Fast (ship this sprint) | Slow (Nexcess coordination) | Slow (DNS provisioning) |

**Our Choice:** Option A maximizes security, minimizes operational risk, and ships immediately. Options B and C are backlog candidates for long-term architectural improvements.

---

## Implementation Pattern: Backend-for-Frontend (BFF)

```
Browser Client (Next.js App Router)
         ↓
    [Zustand Cart Store]
         ↓
   POST /api/cart/add          ← Frontend calls OUR API
         ↓
   [Next.js API Route Handler]  ← Server-side only
         ↓
   Base64(key:secret)           ← Encode credentials securely
         ↓
   WOOCOMMERCE_CONSUMER_KEY/SECRET from process.env (server vault)
         ↓
   POST /wp-json/wc/store/v1/cart   ← Server-to-server (no CORS)
         ↓
   Nexcess WooCommerce API      ← Responds with order session
         ↓
   [Response Sanitization]       ← Strip sensitive fields
         ↓
   NextResponse.json({ safe_data })  ← Return to browser
```

### Key Invariants

1. **WOOCOMMERCE_CONSUMER_KEY** and **WOOCOMMERCE_CONSUMER_SECRET** are NEVER visible to the browser.
   - Must be server-only environment variables (no `NEXT_PUBLIC_` prefix).
   - Only read in `/app/api/cart/**` route handlers.
   - Never passed as props, route params, or stored in Zustand.

2. **Server-to-Server HTTP Basic Auth**
   - All WC API calls use `Authorization: Basic ${Buffer.from(`${KEY}:${SECRET}`).toString('base64')}`.
   - No cookies, no SameSite concerns—HTTP Basic is transport-agnostic.

3. **Optimistic Client Updates**
   - Zustand state updates immediately on user action (fast UI).
   - Background POST to `/api/cart/add` syncs with WooCommerce.
   - On error: rollback Zustand state and show error toast.

4. **Checkout Flow Handoff**
   - User clicks "Proceed to Checkout" in CartDrawer.
   - Frontend calls `POST /api/cart/checkout`.
   - API returns real WC checkout URL (`checkout_url` field).
   - Frontend does `router.push(checkoutUrl)` to redirect to WC-hosted checkout.
   - WooCommerce handles payment and order creation.
   - Order confirmation webhook hits `POST /api/revalidate` → cache invalidation.

---

## File Structure (Complete)

```
app/
  api/
    cart/
      route.ts              GET  /api/cart           ← Retrieve active session cart from WC
      add/
        route.ts            POST /api/cart/add       ← Add single item, sync to WC
      remove/
        route.ts            POST /api/cart/remove    ← Remove item from cart
      update/
        route.ts            POST /api/cart/update    ← Update quantity for item
      checkout/
        route.ts            POST /api/cart/checkout  ← Create WC checkout session
    revalidate/
      route.ts              POST /api/revalidate     ← Webhook handler for inventory sync

types/
  woocommerce-cart.ts       ← TypeScript interfaces for WC API shapes

store/
  useCartStore.ts           ← Update with syncToWC() action (already in place)

lib/
  api.ts                    ← Add sanitization for product.description (RF-14)
```

---

## Environment Configuration

### Required `.env.local` (Staging)

```bash
# WordPress Staging Gateway
NEXT_PUBLIC_WORDPRESS_URL=https://50eacb477d.nxcli.io

# WooCommerce REST API Keys (Server-side only, do NOT use NEXT_PUBLIC_ prefix)
WOOCOMMERCE_CONSUMER_KEY=ck_...
WOOCOMMERCE_CONSUMER_SECRET=cs_...

# Node Environment
NODE_ENV=development
```

### Vercel Vault (Production)

Before any production traffic:
- [ ] Rotate staging keys in Nexcess admin panel
- [ ] Generate new keys for production environment
- [ ] Store in Vercel **Environment Variables** (encrypted, server-side only)
- [ ] Verify no `NEXT_PUBLIC_` prefix in project settings

---

## API Endpoint Contracts

### GET `/api/cart`

**Request:**
```http
GET /api/cart
Content-Type: application/json
```

**Response (200 OK):**
```json
{
  "items": [
    {
      "key": "abc123",
      "product_id": 42,
      "variation_id": 0,
      "quantity": 2,
      "name": "Organic Turmeric Root",
      "price": "24.99",
      "images": [{ "src": "https://..." }]
    }
  ],
  "items_count": 2,
  "totals": {
    "total_items": "2",
    "total_shipping": "5.00",
    "total_tax": "2.15",
    "total_price": "56.13",
    "currency_code": "USD"
  },
  "coupons": []
}
```

**Error (401/500):**
```json
{ "error": "WooCommerce API error", "status": 401 }
```

---

### POST `/api/cart/add`

**Request:**
```json
{
  "id": 42,
  "quantity": 2,
  "variation_id": 0
}
```

**Response (200 OK):**
```json
{
  "key": "abc123",
  "product_id": 42,
  "quantity": 2,
  "added": true
}
```

---

### POST `/api/cart/remove`

**Request:**
```json
{
  "key": "abc123"
}
```

**Response (200 OK):**
```json
{
  "removed": true
}
```

---

### POST `/api/cart/update`

**Request:**
```json
{
  "key": "abc123",
  "quantity": 5
}
```

**Response (200 OK):**
```json
{
  "key": "abc123",
  "quantity": 5,
  "updated": true
}
```

---

### POST `/api/cart/checkout`

**Request:**
```json
{
  "items": [
    { "product_id": 42, "quantity": 2 }
  ]
}
```

**Response (200 OK):**
```json
{
  "checkout_url": "https://50eacb477d.nxcli.io/checkout/?key=...",
  "session_token": "wc_cart_...",
  "expires_at": 1716574800
}
```

---

## Security Guarantees

### Non-Negotiable Rules

1. **Secret Isolation**
   - `WOOCOMMERCE_CONSUMER_KEY` and `WOOCOMMERCE_CONSUMER_SECRET` exist only in:
     - `.env.local` (staging, never committed)
     - Vercel vault (production, encrypted)
     - Runtime memory of `/api/cart/**` handlers
   - Never in: client code, props, URL params, response bodies, logs

2. **XSS Prevention**
   - Product description (`dangerouslySetInnerHTML` risk) is sanitized server-side.
   - Dependency: `isomorphic-dompurify` in `lib/api.ts`.
   - Fix for RF-14 is a blocker before cart/checkout pages go live.

3. **Optimistic Rollback**
   - If `POST /api/cart/add` fails, Zustand reverts to pre-action state immediately.
   - Error toast shows: "Failed to add item. Please try again."
   - No phantom items left in the UI.

4. **Session Isolation**
   - Each browser session has its own WC cart session (cookie-based on WC side).
   - Frontend Zustand state is localStorage-isolated per browser context.
   - No cross-session leakage.

---

## Deployment & Rollout

### Phase 1: Foundation (This Sprint)
- [ ] Create `/api/cart/**` skeleton routes
- [ ] Write `types/woocommerce-cart.ts` TypeScript interfaces
- [ ] Add `syncToWC()` action to Zustand
- [ ] Test GET/POST endpoints against staging WC API
- [ ] Verify keys are not exposed in browser DevTools

### Phase 2: Integration (Next Sprint)
- [ ] Wire "Add to Cart" button to `syncToWC()`
- [ ] Wire "Proceed to Checkout" to `/api/cart/checkout`
- [ ] Test full checkout flow on staging
- [ ] Fix RF-14 (product description sanitization)

### Phase 3: Production Launch
- [ ] Rotate WC API keys on Nexcess
- [ ] Store new keys in Vercel vault (encrypted)
- [ ] Deploy to production
- [ ] Monitor `/api/cart/*` error rates for 24h
- [ ] Trigger order confirmation webhook to validate revalidate hook

---

## Monitoring & Observability

### Key Metrics

- `POST /api/cart/add` latency and error rate
- `POST /api/cart/checkout` checkout URL generation success rate
- WC API response times (proxied through our endpoints)
- Browser Console errors (XSS, CORS—should be zero on production)

### Logging Strategy

- Server: Log sanitized request/response payloads (no keys in logs)
- Client: Toast errors on API failures; never log response bodies containing order data

---

## Rollback & Contingency

If the WooCommerce API becomes unavailable:
1. Frontend catches error from `/api/cart/add` → shows toast
2. Zustand state remains on client (offline persistence)
3. User can continue browsing and adding items locally
4. When WC API recovers, sync happens automatically on next action
5. If checkout is pressed before recovery: error toast, don't redirect

---

## Future Improvements (Backlog)

1. **Option C (Subdomain Unification)** — Long-term: point both Next.js and WC to subdomains of `resqorganics.com` for native same-site cookies.
2. **Session Rehydration** — Sync WC cart into Zustand on page load so cart persists across sessions.
3. **Coupon Integration** — Add `/api/cart/apply-coupon` endpoint for discount codes.
4. **Order History** — Expose WC orders REST endpoint behind `/api/orders` for logged-in users.

---

## Sign-Off

This architecture is approved for immediate implementation. All WooCommerce integration code must follow this pattern. Any deviation requires explicit architecture review.

**Approved:** 2026-05-24
