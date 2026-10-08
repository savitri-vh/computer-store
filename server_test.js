const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const net = require("node:net");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const {createServer, PRODUCT_PRICES} = require("./server");

async function startTestServer(t, options = {}) {
  const dataDir = await fs.mkdtemp(path.join(os.tmpdir(), "computer-shop-"));
  const server = createServer({dataDir, rateLimit: {windowMs: 60000, max: 1000}, ...options});
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => {
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    await fs.rm(dataDir, {recursive: true, force: true});
  });
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  return {baseUrl, dataDir, port: server.address().port};
}

function post(baseUrl, route, body, headers = {"Content-Type": "application/json"}) {
  return fetch(`${baseUrl}${route}`, {method: "POST", headers, body: typeof body === "string" ? body : JSON.stringify(body)});
}

const validOrder = (overrides = {}) => ({
  name: "Priya Sharma",
  phone: "+91 98765 43210",
  fulfilment: "Store pickup",
  items: [{id: "everyday-14", quantity: 1}],
  ...overrides
});

async function readRecords(dataDir, file) {
  return JSON.parse(await fs.readFile(path.join(dataDir, file), "utf8"));
}

test("accepts orders, calculates catalog prices, and persists them on the server", async t => {
  const {baseUrl, dataDir} = await startTestServer(t);
  const response = await post(baseUrl, "/api/orders", validOrder({items: [{id: "everyday-14", quantity: 2}]}));
  const result = await response.json();
  const orders = await readRecords(dataDir, "orders.json");
  assert.equal(response.status, 201);
  assert.match(result.reference, /^ORD-[A-F0-9]{10}$/);
  assert.equal(orders[0].total, 85980);
  assert.equal(orders[0].items[0].unitPrice, 42990);
});

test("ignores client-supplied prices and does not publicly expose saved customer records", async t => {
  const {baseUrl, dataDir} = await startTestServer(t);
  const homeResponse = await fetch(baseUrl);
  assert.equal(homeResponse.status, 200);
  assert.match(homeResponse.headers.get("content-type"), /text\/html/);
  const orderResponse = await post(baseUrl, "/api/orders", validOrder({items: [{id: "everyday-14", quantity: 1, unitPrice: 1}]}));
  assert.equal(orderResponse.status, 201);
  assert.equal((await readRecords(dataDir, "orders.json"))[0].total, 42990);
  assert.equal((await fetch(`${baseUrl}/data/orders.json`)).status, 404);
  assert.equal((await fetch(`${baseUrl}/server.js`)).status, 404);
  assert.equal((await fetch(`${baseUrl}/package.json`)).status, 404);
});

test("accepts and persists service requests", async t => {
  const {baseUrl, dataDir} = await startTestServer(t);
  const response = await post(baseUrl, "/api/service-requests", {
    name: "Rahul Mehta", phone: "9876543210", service: "Laptop / PC repair", message: "Laptop does not start."
  });
  assert.equal(response.status, 201);
  assert.match((await response.json()).reference, /^SRV-[A-F0-9]{10}$/);
  assert.equal((await readRecords(dataDir, "service-requests.json"))[0].service, "Laptop / PC repair");
});

test("a malformed request URL returns 400 and does not crash the server", async t => {
  const {baseUrl, port} = await startTestServer(t);
  const firstLine = await new Promise((resolve, reject) => {
    const socket = net.connect(port, "127.0.0.1", () => socket.write("GET // HTTP/1.1\r\nHost: x\r\nConnection: close\r\n\r\n"));
    let data = "";
    socket.on("data", chunk => { data += chunk; });
    socket.on("end", () => resolve(data.split("\r\n")[0]));
    socket.on("error", reject);
  });
  assert.match(firstLine, /400/);
  assert.equal((await fetch(baseUrl)).status, 200);
});

test("rejects bad content types, bad JSON and oversized bodies", async t => {
  const {baseUrl} = await startTestServer(t);
  const wrongType = await post(baseUrl, "/api/orders", JSON.stringify(validOrder()), {"Content-Type": "text/plain"});
  assert.equal(wrongType.status, 415);
  const badJson = await post(baseUrl, "/api/orders", "{not json");
  assert.equal(badJson.status, 400);
  const notObject = await post(baseUrl, "/api/orders", "[1,2,3]");
  assert.equal(notObject.status, 400);
  const tooBig = await post(baseUrl, "/api/service-requests", JSON.stringify({message: "x".repeat(70000)}), {"Content-Type": "application/json"});
  assert.equal(tooBig.status, 413);
});

test("validates order fields", async t => {
  const {baseUrl, dataDir} = await startTestServer(t);
  const bad = [
    validOrder({name: "A"}),
    validOrder({phone: "12345"}),
    validOrder({phone: "abcdefghij"}),
    validOrder({fulfilment: "Teleport"}),
    validOrder({fulfilment: "Local delivery", address: "x"}),
    validOrder({items: []}),
    validOrder({items: [{id: "not-a-product", quantity: 1}]}),
    validOrder({items: [{id: "everyday-14", quantity: 21}]}),
    validOrder({items: [{id: "everyday-14", quantity: 1.5}]}),
    validOrder({items: [{id: "everyday-14", quantity: 0}]})
  ];
  for (const body of bad) {
    const response = await post(baseUrl, "/api/orders", body);
    assert.equal(response.status, 400, JSON.stringify(body));
  }
  await assert.rejects(fs.readFile(path.join(dataDir, "orders.json")), {code: "ENOENT"});
  const delivery = await post(baseUrl, "/api/orders", validOrder({fulfilment: "Local delivery", address: "12 MG Road, Bengaluru"}));
  assert.equal(delivery.status, 201);
  assert.equal((await readRecords(dataDir, "orders.json"))[0].address, "12 MG Road, Bengaluru");
});

test("validates service requests", async t => {
  const {baseUrl} = await startTestServer(t);
  const base = {name: "Rahul Mehta", phone: "9876543210", service: "Laptop cleaning", message: ""};
  assert.equal((await post(baseUrl, "/api/service-requests", {...base, service: "Hack NASA"})).status, 400);
  assert.equal((await post(baseUrl, "/api/service-requests", {...base, message: "x".repeat(1001)})).status, 400);
  assert.equal((await post(baseUrl, "/api/service-requests", base)).status, 201);
});

test("the honeypot field silently drops bot submissions without saving them", async t => {
  const {baseUrl, dataDir} = await startTestServer(t);
  const response = await post(baseUrl, "/api/orders", validOrder({website: "http://spam.example"}));
  assert.equal(response.status, 201);
  await assert.rejects(fs.readFile(path.join(dataDir, "orders.json")), {code: "ENOENT"});
});

test("rate limits repeated submissions from one client", async t => {
  const {baseUrl} = await startTestServer(t, {rateLimit: {windowMs: 60000, max: 2}});
  assert.equal((await post(baseUrl, "/api/orders", validOrder())).status, 201);
  assert.equal((await post(baseUrl, "/api/orders", validOrder())).status, 201);
  const limited = await post(baseUrl, "/api/orders", validOrder());
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get("retry-after")) > 0);
});

test("concurrent orders are all saved without corrupting the file", async t => {
  const {baseUrl, dataDir} = await startTestServer(t);
  const responses = await Promise.all(Array.from({length: 15}, () => post(baseUrl, "/api/orders", validOrder())));
  assert.ok(responses.every(response => response.status === 201));
  const orders = await readRecords(dataDir, "orders.json");
  assert.equal(orders.length, 15);
  assert.equal(new Set(orders.map(order => order.reference)).size, 15);
});

test("non-English names survive storage intact", async t => {
  const {baseUrl, dataDir} = await startTestServer(t);
  const response = await post(baseUrl, "/api/orders", validOrder({name: "प्रिया शर्मा"}));
  assert.equal(response.status, 201);
  assert.equal((await readRecords(dataDir, "orders.json"))[0].name, "प्रिया शर्मा");
});

test("serves the privacy page and favicon, and only allow-listed files", async t => {
  const {baseUrl} = await startTestServer(t);
  assert.equal((await fetch(`${baseUrl}/privacy.html`)).status, 200);
  assert.equal((await fetch(`${baseUrl}/favicon.svg`)).status, 200);
  assert.equal((await fetch(`${baseUrl}/server_test.js`)).status, 404);
});

test("prices in app.js match the server price list", async () => {
  const source = await fs.readFile(path.join(__dirname, "app.js"), "utf8");
  const start = source.indexOf("const products = [");
  const end = source.indexOf("const currency");
  assert.ok(start >= 0 && end > start, "could not find the products array in app.js");
  const products = vm.runInNewContext(`${source.slice(start, end)}; products`);
  assert.equal(products.length, PRODUCT_PRICES.size);
  for (const product of products) {
    assert.equal(PRODUCT_PRICES.get(product.id), product.price, `price mismatch for ${product.id}`);
  }
});
