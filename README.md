# SK Computers — Laptops, PCs & Accessories

A responsive storefront for SK Computers, with a small zero-dependency Node.js backend that receives and saves order requests and service bookings. No online payment is taken: the shop confirms orders directly.

## Features

**Storefront (vanilla HTML/CSS/JS)**
- 17 example products across 9 categories, with search, category filter, price sort, compare (up to 3), wishlist and cart
- Responsive product, category, gaming, customer-feedback, newsletter and shop-information sections
- Product ratings and customer reviews are visibly marked as samples; replace them with verified feedback before launch
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

The real logo (`logo-mark.png`, `favicon.png`), phone (+91 97422 50035), email (skcomputers035@gmail.com) and "Established 2018 / Muttappa Badiger" credit are already filled in, pulled from the shop's one-page profile. Still check by hand:

| Item | Where |
|---|---|
| Store address and opening hours | `index.html`, `privacy.html` |
| Instagram and Facebook profile URLs | social links in the `index.html` footer |
| Esteemed-clients list | `.clients-section` in `index.html` — update if the client roster changes |

Also check by hand:
- Replace the Unsplash stock photos with your own product photos.
- Only keep claims in the page that are true for your shop (e.g. "genuine products", "authorised brands", "inclusive of taxes").
- Replace the clearly labelled sample reviews and ratings with verified customer feedback.
- Have the privacy notice reviewed; it is a template, not legal advice.
- Newsletter submission currently validates the email and explains that a mailing-list service must be connected before updates can be sent.

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

### Customising the storefront

- **Colours:** edit the CSS custom properties in the `:root` rule near the top of `styles.css`. The main theme uses `--blue`, `--blue-dark`, `--navy`, `--purple`, `--ink`, `--canvas` and `--shadow`.
- **Products:** edit the `products` array near the top of `app.js`. Keep every product `id` unique, and add or update its price in `PRODUCT_PRICES` in `server.js`.
- **Images:** replace a product's `image` URL in `app.js` and update its `alt` text. Use an image you have permission to use.
- **Shop name:** update the title, logo text and footer in `index.html`, the custom-built product maker in `app.js`, the structured data in `index.html`, and the privacy notice in `privacy.html`.
- **Logo:** replace `logo-mark.png` (header/footer) and `favicon.png` (browser tab) with a new image of the same aspect ratio, and add it to `STATIC_FILES` in `server.js` if you rename the file.
- **Contact details:** replace the contact and retention placeholders in `privacy.html`; add the shop's real social profile URLs in the footer of `index.html`.
- **Newsletter:** connect the form in `index.html` to a mailing-list service before using it to collect subscribers. The current form is a front-end validation demo and does not store or send addresses.

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