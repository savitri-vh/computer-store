const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");

const PORT = Number(process.env.PORT || 3000);
// Keep 127.0.0.1 when Nginx/Caddy runs on the same machine. Use 0.0.0.0 only inside Docker or if you must expose Node directly.
const HOST = process.env.HOST || "127.0.0.1";
// Set TRUST_PROXY=1 only when running behind exactly one reverse proxy (Nginx/Caddy) so rate limiting sees real client IPs.
const TRUST_PROXY = process.env.TRUST_PROXY === "1";
const ROOT = __dirname;
const MAX_BODY_BYTES = 65536;
const PHONE_PATTERN = /^[+0-9() -]{8,18}$/;

// IMPORTANT: keep these prices identical to the `products` array in app.js.
// server.test.js fails if they ever drift apart.
const PRODUCT_PRICES = new Map([
  ["everyday-14", 42990],
  ["ideapad-slim", 38990],
  ["gaming-15", 74990],
  ["studio-monitor", 12990],
  ["mechanical-keyboard", 5990],
  ["custom-desktop", 34990],
  ["wireless-mouse", 2495],
  ["portable-ssd", 8999],
  ["wireless-headphones", 4999],
  ["home-printer", 13990],
  ["wifi-router", 5990],
  ["laptop-ssd", 6499],
  ["desktop-memory", 3299],
  ["hp-pavilion-15", 56990],
  ["dell-inspiron-desktop", 52990],
  ["asus-rog-desktop", 124990],
  ["macbook-air-13", 99900]
]);
const SERVICES = new Set([
  "Laptop / PC repair",
  "RAM / SSD upgrade",
  "OS / software installation",
  "Virus / malware removal",
  "Laptop cleaning",
  "Custom PC build",
  "Help me choose a laptop",
  "Something else"
]);
const STATIC_FILES = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/privacy.html", ["privacy.html", "text/html; charset=utf-8"]],
  ["/styles.css", ["styles.css", "text/css; charset=utf-8"]],
  ["/app.js", ["app.js", "text/javascript; charset=utf-8"]],
  ["/favicon.svg", ["favicon.svg", "image/svg+xml"]]
]);
const CONTENT_SECURITY_POLICY = "default-src 'self' https://images.unsplash.com https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' https://images.unsplash.com data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'";

function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

const inputError = message => httpError(400, message);

function validateContact(body) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const digits = phone.replace(/\D/g, "");
  if (name.length < 2 || name.length > 100) throw inputError("Enter a name between 2 and 100 characters.");
  if (!PHONE_PATTERN.test(phone) || digits.length < 8 || digits.length > 15) {
    throw inputError("Enter a valid phone number.");
  }
  return {name, phone};
}

async function readJsonBody(request) {
  const contentType = String(request.headers["content-type"] || "").split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") throw httpError(415, "Requests must be sent as application/json.");
  // Collect raw Buffers and decode once, so multi-byte characters (e.g. Hindi names) are never split across chunks.
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw httpError(413, "Request body is too large.");
    chunks.push(chunk);
  }
  let body;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw inputError("Request must contain valid JSON.");
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) throw inputError("Request must contain a JSON object.");
  return body;
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  response.end(JSON.stringify(payload));
}

// Simple in-memory limiter: at most `max` requests per `windowMs` for each client IP.
function createRateLimiter({windowMs, max}) {
  const hits = new Map();
  return key => {
    const now = Date.now();
    if (hits.size > 5000) {
      for (const [storedKey, entry] of hits) if (entry.resetAt <= now) hits.delete(storedKey);
    }
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, {count: 1, resetAt: now + windowMs});
      return {allowed: true};
    }
    entry.count += 1;
    return {allowed: entry.count <= max, retryAfter: Math.ceil((entry.resetAt - now) / 1000)};
  };
}

function clientIp(request, trustProxy) {
  if (trustProxy) {
    const forwarded = String(request.headers["x-forwarded-for"] || "").split(",").map(part => part.trim()).filter(Boolean);
    if (forwarded.length) return forwarded[forwarded.length - 1];
  }
  return request.socket.remoteAddress || "unknown";
}

function createServer({
  dataDir = path.join(ROOT, "data"),
  rateLimit = {windowMs: 15 * 60 * 1000, max: 20},
  trustProxy = TRUST_PROXY
} = {}) {
  let writeQueue = Promise.resolve();
  const checkRateLimit = createRateLimiter(rateLimit);

  function appendRecord(filename, record) {
    const write = writeQueue.then(async () => {
      const filePath = path.join(dataDir, filename);
      let records = [];
      try {
        records = JSON.parse(await fs.readFile(filePath, "utf8"));
        if (!Array.isArray(records)) throw new Error(`${filename} must contain a JSON array.`);
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
      records.push(record);
      await fs.mkdir(dataDir, {recursive: true});
      const temporaryPath = `${filePath}.${crypto.randomUUID()}.tmp`;
      await fs.writeFile(temporaryPath, `${JSON.stringify(records, null, 2)}\n`, {flag: "wx"});
      await fs.rename(temporaryPath, filePath);
    });
    writeQueue = write.catch(() => {});
    return write;
  }

  async function handleApi(request, response, pathname) {
    if (request.method !== "POST") {
      response.setHeader("Allow", "POST");
      sendJson(response, 405, {error: "Method not allowed."});
      return;
    }
    const limit = checkRateLimit(clientIp(request, trustProxy));
    if (!limit.allowed) {
      response.setHeader("Retry-After", String(limit.retryAfter));
      sendJson(response, 429, {error: "Too many requests. Please wait a few minutes or call the shop."});
      return;
    }
    const body = await readJsonBody(request);
    const isOrder = pathname === "/api/orders";
    const reference = `${isOrder ? "ORD" : "SRV"}-${crypto.randomBytes(5).toString("hex").toUpperCase()}`;

    // Honeypot: real visitors never see or fill this hidden field, bots usually do.
    // Pretend success so bots learn nothing, but save nothing.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      sendJson(response, 201, {reference});
      return;
    }

    const contact = validateContact(body);
    const createdAt = new Date().toISOString();

    if (isOrder) {
      if (!["Store pickup", "Local delivery"].includes(body.fulfilment)) {
        throw inputError("Choose store pickup or local delivery.");
      }
      const address = typeof body.address === "string" ? body.address.trim() : "";
      if (body.fulfilment === "Local delivery" && (address.length < 5 || address.length > 300)) {
        throw inputError("Enter a delivery address between 5 and 300 characters.");
      }
      if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 30) {
        throw inputError("Your cart must contain between 1 and 30 products.");
      }
      const items = body.items.map(item => {
        if (!item || typeof item.id !== "string" || !PRODUCT_PRICES.has(item.id)) {
          throw inputError("Your cart includes a product that is no longer available.");
        }
        if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) {
          throw inputError("Product quantities must be between 1 and 20.");
        }
        const unitPrice = PRODUCT_PRICES.get(item.id);
        return {id: item.id, quantity: item.quantity, unitPrice, lineTotal: unitPrice * item.quantity};
      });
      const order = {
        reference,
        ...contact,
        fulfilment: body.fulfilment,
        address: body.fulfilment === "Local delivery" ? address : "",
        items,
        total: items.reduce((total, item) => total + item.lineTotal, 0),
        createdAt
      };
      await appendRecord("orders.json", order);
      sendJson(response, 201, {reference});
      console.log(`Received order ${reference}`);
      return;
    }

    const service = typeof body.service === "string" ? body.service : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!SERVICES.has(service)) throw inputError("Choose one of the listed services.");
    if (message.length > 1000) throw inputError("The service description must be 1,000 characters or fewer.");
    const requestRecord = {...contact, reference, service, message, createdAt};
    await appendRecord("service-requests.json", requestRecord);
    sendJson(response, 201, {reference});
    console.log(`Received service request ${reference}`);
  }

  return http.createServer(async (request, response) => {
    try {
      // Parsed inside the try block: a malformed URL such as "//" must produce a 400, never crash the process.
      let pathname;
      try {
        pathname = new URL(request.url, "http://localhost").pathname;
      } catch {
        throw inputError("Invalid request URL.");
      }
      if (pathname === "/api/orders" || pathname === "/api/service-requests") {
        await handleApi(request, response, pathname);
        return;
      }
      const asset = STATIC_FILES.get(pathname);
      if (request.method !== "GET" && request.method !== "HEAD") {
        response.writeHead(405, {Allow: "GET, HEAD"});
        response.end("Method not allowed.");
        return;
      }
      if (!asset) {
        response.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
        response.end("Not found.");
        return;
      }
      const content = await fs.readFile(path.join(ROOT, asset[0]));
      response.writeHead(200, {
        "Content-Type": asset[1],
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Content-Security-Policy": CONTENT_SECURITY_POLICY
      });
      response.end(request.method === "HEAD" ? undefined : content);
    } catch (error) {
      if (response.headersSent) {
        response.destroy(error);
        return;
      }
      if (!error.statusCode) console.error("Backend request failed:", error);
      sendJson(response, error.statusCode || 500, {
        error: error.statusCode ? error.message : "The server could not save your request. Please try again."
      });
    }
  });
}

if (require.main === module) {
  createServer().listen(PORT, HOST, () => {
    console.log(`Storefront running at http://${HOST}:${PORT}`);
  });
}

module.exports = {createServer, PRODUCT_PRICES};
