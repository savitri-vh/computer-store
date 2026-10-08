# [SHOP NAME] — Neighbourhood Computer Store

A responsive storefront for a local computer shop, with a small zero-dependency Node.js backend that receives and saves order requests and service bookings. No online payment: the shop phones the customer to confirm.

## Features

**Storefront (vanilla HTML/CSS/JS)**
- 13 products across 9 categories, with search, category filter, price sort, compare (up to 3), wishlist and cart
- Cart and wishlist live in the browser (`localStorage`) and are validated on load
- Prices in ₹, Indian phone format, shop hours, mobile-first layout (down to 380px)
- Keyboard-friendly dialogs: focus moves into a dialog, stays trapped inside it, and returns when it closes

**Backend (`server.js`, Node built-ins only)**
- `POST /api/orders` and `POST /api/service-requests`
- Server-side validation; **order totals are recalculated from the server's own price list**, so client-sent prices are ignored
- Atomic, queued JSON-file writes (`data/orders.json`, `data/service-requests.json`)
- Per-IP rate limiting (20 submissions / 15 min), honeypot spam trap, 64 KB body limit, `application/json` required
- Only allow-listed static files are served; `server.js` and `data/` are never exposed
- Security headers including a Content-Security-Policy

## Run it

```bash
node server.js          # then open http://localhost:3000
npm test                # 13 backend tests
npm run check           # syntax check
```

Requires Node.js 18+. Stop with `Ctrl+C`.

### Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `3000` | Port to listen on |
| `HOST` | `127.0.0.1` | Keep this when Nginx/Caddy runs on the same machine. Use `0.0.0.0` only inside Docker |
| `TRUST_PROXY` | off | Set to `1` when behind exactly one reverse proxy so rate limiting sees real client IPs |

## Before you launch

Search the whole project for these placeholders and replace them (in VS Code: `Ctrl+Shift+F`):

| Placeholder | Where |
|---|---|
| `[SHOP NAME]` | `index.html`, `app.js`, `privacy.html` |
| `[SHOP ADDRESS]`, `[CITY]` | footer, JSON-LD block in `<head>`, `privacy.html` |
| `+91 00000 00000` / `tel:` links | footer, JSON-LD, `privacy.html` |
| `[SHOP EMAIL]`, `[DATE]`, `[RETENTION PERIOD]` | `privacy.html` |

Also check by hand:
- Replace the Unsplash stock photos with your own product photos.
- Only keep claims in the page that are true for your shop (e.g. "genuine products", "authorised brands", "inclusive of taxes").
- Have the privacy notice reviewed; it is a template, not legal advice.
- Real customer reviews can be added later; none are shown now on purpose.

## Changing products or prices

Prices exist in **two** places: the `products` array in `app.js` and `PRODUCT_PRICES` in `server.js`. Change both. `npm test` fails if they differ.

To add a product, add an object to `products` in `app.js` and its id and price to `PRODUCT_PRICES`:

```javascript
{
  id: "unique-id", name: "Product Name — Brief tagline", category: "Laptop", maker: "Brand",
  price: 9999, oldPrice: null, badge: "Optional label", badgeStyle: "",
  image: "https://...", alt: "Descriptive alt text",
  specs: ["Spec 1", "Spec 2", "Spec 3"],
  details: {"Key": "Value"},
  description: "Customer-facing description"
}
```

## Data and privacy

- Orders and service requests are stored in `data/` on the machine running the server (git-ignored). They contain customer names and phone numbers: back them up and restrict access.
- Only the cart and wishlist stay in the customer's browser.
- Review submissions by opening the JSON files. There is no admin dashboard or owner notification yet.

## Known limitations

- JSON-file storage suits a small shop; move to PostgreSQL/SQLite for growth. The whole file is rewritten on every order.
- Rate limiting is in-memory and resets when the server restarts.
- Product data is duplicated between frontend and backend (guarded by a test).
- Fonts load from Google Fonts and images from Unsplash.
- HTTPS must be provided by a reverse proxy (Caddy/Nginx).

## Roadmap

1. Admin login + order/request dashboard with status tracking
2. Owner notification (Telegram / email) on each new order
3. Single `products.json` served by `/api/products`
4. Database (PostgreSQL/SQLite), Docker, CI/CD deployment
5. Lighthouse and accessibility pass; real customer reviews
