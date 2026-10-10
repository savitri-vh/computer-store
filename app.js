const products = [
  {id:"everyday-14",name:"Aspire 14 — Ready for everyday",category:"Laptop",maker:"Acer",price:42990,oldPrice:46990,badge:"GOOD FOR STUDY",badgeStyle:"tag-blue",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=82",alt:"Slim silver laptop for everyday study and work",specs:["Intel Core i5","16 GB RAM","512 GB SSD"],details:{Processor:"Intel Core i5-1235U",Memory:"16 GB DDR4",Storage:"512 GB NVMe SSD",Display:'14" Full HD IPS',Graphics:"Intel Iris Xe",Warranty:"1 year manufacturer warranty"},description:"A dependable, easy-to-carry laptop for class notes, video calls, spreadsheets, and everything in between."},
  {id:"ideapad-slim",name:"IdeaPad Slim 3 — More room to think",category:"Laptop",maker:"Lenovo",price:38990,oldPrice:null,badge:"EVERYDAY PICK",badgeStyle:"",image:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=700&q=82",alt:"Open laptop on a desk, ready for work",specs:["AMD Ryzen 5","8 GB RAM","512 GB SSD"],details:{Processor:"AMD Ryzen 5 7520U",Memory:"8 GB LPDDR5",Storage:"512 GB NVMe SSD",Display:'15.6" Full HD',Graphics:"AMD Radeon 610M",Warranty:"1 year manufacturer warranty"},description:"An excellent day-to-day companion with a roomy screen, quick storage, and a budget that's kind."},
  {id:"gaming-15",name:"Nitro V 15 — Ready when you are",category:"Gaming",maker:"Acer",price:74990,oldPrice:79990,badge:"GAMING FAVOURITE",badgeStyle:"tag-orange",image:"https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=700&q=82",alt:"Powerful laptop for gaming and creative work",specs:["Intel Core i5","16 GB RAM","RTX 4050"],details:{Processor:"Intel Core i5-13420H",Memory:"16 GB DDR5",Storage:"512 GB NVMe SSD",Display:'15.6" FHD 144 Hz',Graphics:"NVIDIA GeForce RTX 4050 6 GB",Warranty:"1 year manufacturer warranty"},description:"A well-balanced gaming laptop with plenty of graphics punch for your games and creative projects."},
  {id:"studio-monitor",name:"ViewFinity 24 — A clearer view",category:"Monitor",maker:"Samsung",price:12990,oldPrice:null,badge:"DESK UPGRADE",badgeStyle:"tag-yellow",image:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=82",alt:"Minimal computer monitor on a clean desk",specs:['24" Full HD',"IPS panel","Eye comfort"],details:{Display:'24" Full HD IPS',Resolution:"1920 × 1080",Refresh:"75 Hz",Connectivity:"HDMI, DisplayPort",Features:"Eye Saver Mode, flicker-free",Warranty:"3 year manufacturer warranty"},description:"An easy-on-the-eyes, crisp Full HD monitor for homework, home offices, and second screens."},
  {id:"mechanical-keyboard",name:"Keychron C3 Pro — Type your way",category:"Accessories",maker:"Keychron",price:5990,oldPrice:null,badge:"A NICE LITTLE EXTRA",badgeStyle:"tag-blue",image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=82",alt:"Mechanical keyboard ready for a tidy desktop",specs:["Mechanical keys","TKL layout","USB-C"],details:{Switches:"Red mechanical switches",Layout:"87-key TKL",Connectivity:"Wired USB-C",Lighting:"White backlight",Compatibility:"Windows, macOS, Linux",Warranty:"1 year shop support"},description:"A satisfying mechanical keyboard that keeps your desk tidy and your typing comfortable."},
  {id:"custom-desktop",name:"Everyday desktop — Room to grow",category:"Desktop",maker:"SK Computers",price:34990,oldPrice:null,badge:"BUILT FOR YOU",badgeStyle:"",image:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=700&q=82",alt:"Custom desktop PC with a clear side panel",specs:["Intel Core i3","8 GB RAM","512 GB SSD"],details:{Processor:"Intel Core i3-12100",Memory:"8 GB DDR4",Storage:"512 GB NVMe SSD",Graphics:"Intel UHD 730",OperatingSystem:"Available with or without Windows",Warranty:"1 year local shop support"},description:"A thoughtfully assembled desktop for home, studies, and the everyday office. Ask us about upgrades."},
  {id:"wireless-mouse",name:"Pebble Mouse 2 — Small but mighty",category:"Accessories",maker:"Logitech",price:2495,oldPrice:null,badge:"EVERYDAY PICK",badgeStyle:"tag-yellow",image:"https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=700&q=82",alt:"Wireless mouse on a clean desk",specs:["Bluetooth","Silent clicks","Up to 24 months"],details:{Connectivity:"Bluetooth Low Energy",Buttons:"3 quiet-click buttons",Battery:"Up to 24 months",Compatibility:"Windows, macOS, ChromeOS, iPadOS",Warranty:"1 year manufacturer warranty"},description:"A comfortable, quiet wireless mouse for your laptop bag, desk, or work-from-home setup."},
  {id:"portable-ssd",name:"T7 Shield — Keep your files close",category:"Storage",maker:"Samsung",price:8999,oldPrice:null,badge:"BACK UP & GO",badgeStyle:"tag-blue",image:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=700&q=82",alt:"Compact portable storage device for backing up files",specs:["1 TB storage","USB 3.2","Rugged design"],details:{Capacity:"1 TB",Interface:"USB 3.2 Gen 2",Speed:"Up to 1,050 MB/s read",Protection:"IP65 water & dust resistance",Compatibility:"Windows, macOS, Android",Warranty:"3 year manufacturer warranty"},description:"Fast, pocket-sized backup storage for photos, work files, and everything you'd rather not lose."},
  {id:"wireless-headphones",name:"Tune 720BT — Find your focus",category:"Accessories",maker:"JBL",price:4999,oldPrice:null,badge:"STUDY ESSENTIAL",badgeStyle:"tag-blue",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=82",alt:"Comfortable over-ear wireless headphones",specs:["Wireless Bluetooth","Up to 76 hours","Foldable design"],details:{Connectivity:"Bluetooth 5.3",Battery:"Up to 76 hours",Charging:"USB-C fast charge",Microphone:"Built-in hands-free calls",Design:"Foldable, lightweight",Warranty:"1 year manufacturer warranty"},description:"Comfortable wireless headphones with long battery life for study sessions, calls, and commutes."},
  {id:"home-printer",name:"EcoTank L3210 — Print more, worry less",category:"Printer",maker:"Epson",price:13990,oldPrice:null,badge:"HOME & STUDY",badgeStyle:"tag-orange",image:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=700&q=82",alt:"All-in-one ink tank printer for home and small offices",specs:["Print, scan, copy","Refillable ink tank","USB connection"],details:{Functions:"Print, scan, copy",Technology:"Ink tank, colour inkjet",Connectivity:"USB 2.0",Paper:"A4, A5, A6, envelopes",Use:"Home, student, small office",Warranty:"1 year manufacturer warranty"},description:"An economical all-in-one printer for school projects, forms, and everyday home-office essentials."},
  {id:"wifi-router",name:"Archer AX23 — Better Wi-Fi, room to room",category:"Networking",maker:"TP-Link",price:5990,oldPrice:null,badge:"STAY CONNECTED",badgeStyle:"tag-green",image:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=700&q=82",alt:"Home Wi-Fi router for a stable connected household",specs:["Wi-Fi 6","Dual-band","Easy setup"],details:{Standard:"Wi-Fi 6 (802.11ax)",Speed:"Up to 1.8 Gbps combined",Bands:"Dual-band, 2.4 GHz + 5 GHz",Ports:"4 × Gigabit LAN, 1 × Gigabit WAN",Security:"WPA3, parental controls",Warranty:"3 year manufacturer warranty"},description:"A straightforward Wi-Fi 6 upgrade for smoother streaming, work calls, and connected homes."},
  {id:"laptop-ssd",name:"Crucial P3 Plus — A speedier start",category:"Storage",maker:"Crucial",price:6499,oldPrice:null,badge:"PC UPGRADE",badgeStyle:"tag-blue",image:"https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=700&q=82",alt:"Solid state drive for upgrading a computer",specs:["1 TB capacity","NVMe Gen 4","Easy upgrade"],details:{Capacity:"1 TB",Interface:"M.2 NVMe PCIe Gen 4",Speed:"Up to 5,000 MB/s read",FormFactor:"M.2 2280",Compatibility:"Compatible desktops and laptops",Warranty:"5 year limited manufacturer warranty"},description:"A roomy, speedy NVMe drive for extra storage or a fresh upgrade. Bring your laptop in and we'll check compatibility."},
  {id:"desktop-memory",name:"Crucial 16 GB — Give your PC some room",category:"Memory",maker:"Crucial",price:3299,oldPrice:null,badge:"PC UPGRADE",badgeStyle:"tag-green",image:"https://images.unsplash.com/photo-1562976540-1502c49b5f4a?auto=format&fit=crop&w=700&q=82",alt:"Desktop memory module for a computer upgrade",specs:["16 GB capacity","DDR4 3200 MHz","Desktop memory"],details:{Capacity:"16 GB",Type:"DDR4 UDIMM",Speed:"3200 MHz",Compatibility:"Compatible desktop motherboards",Use:"Multitasking and system upgrades",Warranty:"Limited manufacturer warranty"},description:"A straightforward memory upgrade for compatible desktops. Bring your PC or model details and we'll check the right fit."},
  {id:"hp-pavilion-15",name:"Pavilion 15 — Ready for your next project",category:"Laptop",maker:"HP",price:56990,oldPrice:59990,badge:"WORK & STUDY",badgeStyle:"tag-blue",image:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=700&q=82",alt:"HP laptop for productivity and everyday use",specs:["Intel Core i5","16 GB RAM","512 GB SSD"],details:{Processor:"Intel Core i5",Memory:"16 GB RAM",Storage:"512 GB SSD",Display:'15.6" Full HD',Warranty:"Check current manufacturer coverage"},description:"A versatile everyday laptop for documents, browsing, video calls and study. Confirm the current model and specification with the shop."},
  {id:"dell-inspiron-desktop",name:"Inspiron Desktop — A dependable home base",category:"Desktop",maker:"Dell",price:52990,oldPrice:null,badge:"HOME & OFFICE",badgeStyle:"tag-blue",image:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=700&q=82",alt:"Desktop computer setup for home and office work",specs:["Intel Core i5","16 GB RAM","512 GB SSD"],details:{Processor:"Intel Core i5",Memory:"16 GB RAM",Storage:"512 GB SSD",Graphics:"Integrated graphics",Warranty:"Check current manufacturer coverage"},description:"A compact desktop example for office tasks, home admin and everyday browsing. Ask the shop to confirm the available configuration."},
  {id:"asus-rog-desktop",name:"ROG Strix G — Built for game night",category:"Gaming",maker:"ASUS",price:124990,oldPrice:null,badge:"GAMING DESKTOP",badgeStyle:"tag-orange",image:"https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=700&q=82",alt:"Gaming desktop computer with a performance-focused setup",specs:["Intel Core i7","16 GB RAM","GeForce RTX"],details:{Processor:"Intel Core i7",Memory:"16 GB RAM",Storage:"1 TB SSD",Graphics:"NVIDIA GeForce RTX series",Warranty:"Check current manufacturer coverage"},description:"A gaming desktop example for high-refresh play and creative workloads. Confirm the exact GPU, configuration and stock with the shop."},
  {id:"macbook-air-13",name:"MacBook Air 13 — Light, quiet, capable",category:"Laptop",maker:"Apple",price:99900,oldPrice:null,badge:"LIGHT & PORTABLE",badgeStyle:"tag-purple",image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=82",alt:"Apple MacBook laptop on a desk",specs:["Apple silicon","8 GB unified memory","256 GB SSD"],details:{Processor:"Apple silicon",Memory:"8 GB unified memory",Storage:"256 GB SSD",Display:'13.6" Liquid Retina',Warranty:"Check current manufacturer coverage"},description:"A lightweight Mac notebook example for mobile work and study. Confirm the current generation, configuration and availability before ordering."}
];

const currency = new Intl.NumberFormat("en-IN", {style:"currency",currency:"INR",maximumFractionDigits:0});
const getSaved = (key, fallback) => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch (error) { console.warn(`Could not read ${key} from local storage.`, error); return fallback; }
};
const MAX_QUANTITY = 20;
const knownIds = new Set(products.map(product => product.id));

// Cart/wishlist come from localStorage, which can hold old or edited data. Keep only known products and sane quantities.
function cleanCart(value) {
  if (!Array.isArray(value)) return [];
  const merged = new Map();
  for (const entry of value) {
    if (!entry || !knownIds.has(entry.id)) continue;
    const quantity = Math.min(MAX_QUANTITY, Math.max(1, Math.floor(Number(entry.quantity)) || 1));
    merged.set(entry.id, Math.min(MAX_QUANTITY, (merged.get(entry.id) || 0) + quantity));
  }
  return [...merged].map(([id, quantity]) => ({id, quantity}));
}
const savedWishlist = getSaved("neighbourhood-wishlist", []);
let cart = cleanCart(getSaved("neighbourhood-cart", []));
let wishlist = Array.isArray(savedWishlist) ? savedWishlist.filter(id => knownIds.has(id)) : [];
let compare = [];
let activeFilter = "All";
let searchTerm = "";
let toastTimer;
let wishlistOnly = false;
let lastFocused = null;
let activePanel = null;

const productGrid = document.querySelector("#product-grid");
const emptyResults = document.querySelector("#empty-results");
const overlay = document.querySelector("#overlay");
const cartDrawer = document.querySelector("#cart-drawer");
const productModal = document.querySelector("#product-modal");
const compareModal = document.querySelector("#compare-modal");
const checkoutModal = document.querySelector("#checkout-modal");
const toast = document.querySelector("#toast");

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch (error) { console.warn(`Could not save ${key} to local storage.`, error); showToast("Your changes couldn't be saved on this device."); return false; }
}

// Retriggerable CSS-animation helper: removes the class, forces reflow, re-adds it,
// then cleans up once the animation ends (so toggled styles like .added don't stick).
function playBounce(element, className) {
  if (!element) return;
  element.classList.remove(className);
  void element.offsetWidth; // restart the animation even if it's already playing
  element.classList.add(className);
  element.addEventListener("animationend", function onEnd(event) {
    if (event.target !== element) return;
    element.classList.remove(className);
    element.removeEventListener("animationend", onEnd);
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  if (!product) return false;
  const existing = cart.find(item => item.id === id);
  if (existing && existing.quantity >= MAX_QUANTITY) {
    showToast(`You can order up to ${MAX_QUANTITY} of each product at a time.`);
    return false;
  }
  if (existing) existing.quantity += 1; else cart.push({id, quantity:1});
  updateCart();
  bumpCart();
  showToast(`${product.name} added to your cart.`);
  return true;
}

function productCard(product) {
  const wished = wishlist.includes(product.id);
  const checked = compare.includes(product.id);
  return `<article class="product-card" data-product="${product.id}">
    <div class="product-picture" data-view="${product.id}" role="button" tabindex="0" aria-label="View ${product.name}">
      <img src="${product.image}" alt="${product.alt}" loading="lazy">
      <span class="product-tag ${product.badgeStyle}">${product.badge}</span>
      <div class="product-actions">
        <button class="product-icon-btn ${wished ? "wished" : ""}" data-wishlist="${product.id}" aria-label="${wished ? "Remove from" : "Add to"} wishlist" aria-pressed="${wished}">${wished ? "♥" : "♡"}</button>
        <label class="compare-check" title="Add ${product.name} to comparison"><input type="checkbox" data-compare="${product.id}" ${checked ? "checked" : ""}> Compare</label>
      </div>
    </div>
    <div class="product-info"><span class="product-category">${product.maker} · ${product.category}</span>
      <h3>${product.name}</h3>
      <div class="product-rating" aria-label="Sample rating, 4.8 out of 5"><span aria-hidden="true">★★★★★</span><small>4.8 <em>sample</em></small></div>
      <div class="product-specs">${product.specs.map(spec => `<span>${spec}</span>`).join("")}</div>
      <div class="product-buy"><span class="product-price">${currency.format(product.price)}${product.oldPrice ? `<small><s>${currency.format(product.oldPrice)}</s></small>` : ""}</span>
      <div class="product-actions-row"><button class="details-btn" data-view="${product.id}">View details</button><button class="add-cart-btn" data-add="${product.id}">Add to cart</button></div></div>
    </div></article>`;
}

function renderProducts() {
  const sort = document.querySelector("#sort-select").value;
  let shown = products.filter(product => {
    const matchesCategory = activeFilter === "All" || product.category === activeFilter;
    const text = `${product.name} ${product.category} ${product.maker} ${product.specs.join(" ")}`.toLowerCase();
    const matchesWishlist = !wishlistOnly || wishlist.includes(product.id);
    return matchesCategory && matchesWishlist && text.includes(searchTerm.toLowerCase());
  });
  if (sort === "price-low") shown.sort((a, b) => a.price - b.price);
  if (sort === "price-high") shown.sort((a, b) => b.price - a.price);
  productGrid.innerHTML = shown.map(productCard).join("");
  productGrid.hidden = shown.length === 0;
  emptyResults.hidden = shown.length > 0;
  document.querySelectorAll(".filter-tab").forEach(tab => {
    const selected = tab.dataset.filter === activeFilter;
    tab.classList.toggle("selected", selected);
    if (selected) tab.setAttribute("aria-current", "true"); else tab.removeAttribute("aria-current");
  });
  updateCompare();
}

function updateCart() {
  const count = cart.reduce((sum, entry) => sum + entry.quantity, 0);
  document.querySelector("#cart-count").textContent = count || "";
  document.querySelector("#drawer-count").textContent = `(${count})`;
  document.querySelector("#cart-subtotal").textContent = currency.format(cart.reduce((sum, entry) => {
    const product = products.find(item => item.id === entry.id);
    return sum + (product ? product.price * entry.quantity : 0);
  }, 0));
  const items = document.querySelector("#cart-items");
  if (!cart.length) {
    items.innerHTML = '<div class="cart-empty"><span>⌁</span><strong>Your cart is taking a little break.</strong><small>Find something good for your setup.</small></div>';
  } else {
    items.innerHTML = cart.map(entry => {
      const product = products.find(item => item.id === entry.id);
      if (!product) return "";
      return `<article class="cart-line"><img src="${product.image}" alt=""><div><h3>${product.name}</h3><strong>${currency.format(product.price * entry.quantity)}</strong><div class="quantity-control"><button data-quantity="${product.id}" data-change="-1" aria-label="Remove one ${product.name}">−</button><span>${entry.quantity}</span><button data-quantity="${product.id}" data-change="1" aria-label="Add one ${product.name}">+</button></div></div><button class="remove-item" data-remove="${product.id}" aria-label="Remove ${product.name} from cart">×</button></article>`;
    }).join("");
  }
  document.querySelector("#cart-footer").hidden = cart.length === 0;
  save("neighbourhood-cart", cart);
}

function updateWishlist() {
  document.querySelector("#wishlist-count").textContent = wishlist.length || "";
  save("neighbourhood-wishlist", wishlist);
  productGrid.querySelectorAll("[data-wishlist]").forEach(button => {
    const wished = wishlist.includes(button.dataset.wishlist);
    button.classList.toggle("wished", wished);
    button.textContent = wished ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(wished));
    button.setAttribute("aria-label", `${wished ? "Remove from" : "Add to"} wishlist`);
  });
}

function updateCompare() {
  const bar = document.querySelector("#compare-bar");
  bar.hidden = compare.length === 0;
  document.querySelector("#compare-label").textContent = `${compare.length} product${compare.length === 1 ? "" : "s"} selected`;
  document.querySelector("#compare-button").disabled = compare.length < 2;
  document.querySelector("#compare-button").style.opacity = compare.length < 2 ? ".55" : "1";
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function showPanel(panel) {
  if (!activePanel) lastFocused = document.activeElement;
  activePanel = panel;
  overlay.hidden = false;
  if (panel === cartDrawer) {
    panel.inert = false;
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
  } else {
    panel.hidden = false;
  }
  document.body.classList.add("no-scroll");
  const first = panel.querySelector(FOCUSABLE);
  if (first) first.focus({preventScroll:true});
}

function closePanels() {
  const wasOpen = activePanel !== null;
  overlay.hidden = true;
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartDrawer.inert = true;
  productModal.hidden = true;
  compareModal.hidden = true;
  checkoutModal.hidden = true;
  document.body.classList.remove("no-scroll");
  activePanel = null;
  if (wasOpen && lastFocused && lastFocused.isConnected) lastFocused.focus({preventScroll:true});
  lastFocused = null;
}

function openCheckout() {
  if (!cart.length) return showToast("Your cart is empty.");
  const total = cart.reduce((sum, entry) => {
    const product = products.find(item => item.id === entry.id);
    return sum + (product ? product.price * entry.quantity : 0);
  }, 0);
  checkoutModal.innerHTML = `<div class="checkout-content"><button class="close-button checkout-close" data-close-modal aria-label="Close checkout">×</button><span class="section-kicker">A FEW DETAILS AND YOU'RE SET</span><h2>Place an order</h2><p class="checkout-note">This sends an order request to your local shop. The shop will confirm stock and payment with you directly.</p><div class="checkout-summary">${cart.map(entry => {
    const product = products.find(item => item.id === entry.id);
    return product ? `<div><span>${product.name} × ${entry.quantity}</span><strong>${currency.format(product.price * entry.quantity)}</strong></div>` : "";
  }).join("")}<div class="checkout-total"><span>Total</span><strong>${currency.format(total)}</strong></div></div><form id="checkout-form"><div class="form-row"><label>Your name<input name="name" type="text" placeholder="e.g. Priya Sharma" required minlength="2"></label><label>Phone number<input name="phone" type="tel" placeholder="+91 98765 43210" pattern="[+0-9\\(\\)\\- ]{8,18}" required></label></div><label class="checkout-field">How would you like your order?<select name="fulfilment" required><option value="Store pickup">Pick up at the store</option><option value="Local delivery">Ask about local delivery</option></select></label><label class="checkout-field address-field" hidden>Delivery address<input name="address" type="text" placeholder="Area, street and city"></label><div class="visually-hidden" aria-hidden="true"><label>Leave this field empty<input name="website" type="text" tabindex="-1" autocomplete="off"></label></div><p class="form-privacy">No online payment is taken here. We’ll call to confirm your order.</p><button class="button button-primary form-submit" type="submit">Send order request <span>→</span></button></form></div>`;
  showPanel(checkoutModal);
}

function openProduct(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;
  productModal.innerHTML = `<div class="modal-product"><div class="modal-product-image"><img src="${product.image}" alt="${product.alt}"></div><div class="modal-product-info"><button class="close-button" data-close-modal aria-label="Close product details">×</button><span class="section-kicker">${product.maker} · ${product.category}</span><h2>${product.name}</h2><p>${product.description}</p><ul class="modal-details">${Object.entries(product.details).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join("")}</ul><span class="product-price">${currency.format(product.price)}${product.oldPrice ? `<small><s>${currency.format(product.oldPrice)}</s></small>` : ""}</span><button class="button button-primary" data-add="${product.id}">Add to cart <span>→</span></button></div></div>`;
  showPanel(productModal);
}

function openComparison() {
  if (compare.length < 2) return showToast("Choose at least two products to compare.");
  const selected = compare.map(id => products.find(product => product.id === id)).filter(Boolean);
  const attributes = [...new Set(selected.flatMap(product => Object.keys(product.details)))];
  compareModal.innerHTML = `<div class="compare-modal-head"><span class="section-kicker">SIDE BY SIDE, NO GUESSWORK</span><h2>Compare your picks</h2><button class="close-button" data-close-modal aria-label="Close comparison">×</button></div><div style="overflow-x:auto"><table class="compare-table"><thead><tr><th>Product</th>${selected.map(product => `<th><img src="${product.image}" alt="">${product.name}</th>`).join("")}</tr></thead><tbody><tr><td>Price</td>${selected.map(product => `<td class="compare-price">${currency.format(product.price)}</td>`).join("")}</tr>${attributes.map(attribute => `<tr><td>${attribute}</td>${selected.map(product => `<td>${product.details[attribute] || "—"}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  showPanel(compareModal);
}

productGrid.addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  if (add) {
    addToCart(add.dataset.add);
    playBounce(add, "added");
    return;
  }
  const wish = event.target.closest("[data-wishlist]");
  if (wish) {
    const id = wish.dataset.wishlist;
    wishlist = wishlist.includes(id) ? wishlist.filter(item => item !== id) : [...wishlist, id];
    updateWishlist();
    playBounce(productGrid.querySelector(`[data-wishlist="${id}"]`), "pop");
    if (wishlistOnly) renderProducts();
    showToast(wishlist.includes(id) ? "Added to your wishlist." : "Removed from your wishlist.");
    return;
  }
  if (event.target.closest("[data-compare], .compare-check")) return;
  const picture = event.target.closest("[data-view]");
  if (picture) openProduct(picture.dataset.view);
});

productModal.addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  if (!add) return;
  playBounce(add, "added");
  if (addToCart(add.dataset.add)) setTimeout(closePanels, 260);
});

productGrid.addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-view]")) {
    event.preventDefault();
    openProduct(event.target.dataset.view);
  }
});

productGrid.addEventListener("change", event => {
  const checkbox = event.target.closest("[data-compare]");
  if (!checkbox) return;
  const id = checkbox.dataset.compare;
  if (checkbox.checked && compare.length >= 3) {
    checkbox.checked = false;
    showToast("Compare up to three products at a time.");
    return;
  }
  compare = checkbox.checked ? [...compare, id] : compare.filter(item => item !== id);
  playBounce(checkbox.closest(".compare-check"), "bounce");
  updateCompare();
});

document.querySelector("#cart-items").addEventListener("click", event => {
  const quantity = event.target.closest("[data-quantity]");
  const remove = event.target.closest("[data-remove]");
  if (remove) cart = cart.filter(item => item.id !== remove.dataset.remove);
  if (quantity) {
    const item = cart.find(entry => entry.id === quantity.dataset.quantity);
    if (item) item.quantity = Math.min(MAX_QUANTITY, item.quantity + Number(quantity.dataset.change));
    cart = cart.filter(entry => entry.quantity > 0);
  }
  updateCart();
});

document.querySelector(".filter-tabs").addEventListener("click", event => {
  const tab = event.target.closest("[data-filter]");
  if (!tab) return;
  activeFilter = tab.dataset.filter;
  wishlistOnly = false;
  renderProducts();
  playBounce(tab, "bounce");
});

document.querySelector("#sort-select").addEventListener("change", renderProducts);
document.querySelectorAll("[data-category]").forEach(button => button.addEventListener("click", () => {
  wishlistOnly = false;
  activeFilter = button.dataset.category === "Service" ? "All" : button.dataset.category;
  renderProducts();
  document.querySelector("#products").scrollIntoView({behavior:"smooth"});
  if (button.dataset.category === "Service") document.querySelector("#services").scrollIntoView({behavior:"smooth"});
}));
document.querySelectorAll("[data-category-link]").forEach(link => link.addEventListener("click", () => {
  wishlistOnly = false;
  activeFilter = link.dataset.categoryLink;
  renderProducts();
  document.querySelector("#main-nav").classList.remove("nav-open");
  document.querySelector("#menu-toggle").setAttribute("aria-expanded", "false");
}));
document.querySelectorAll("#main-nav a").forEach(link => link.addEventListener("click", () => {
  document.querySelector("#main-nav").classList.remove("nav-open");
  document.querySelector("#menu-toggle").setAttribute("aria-expanded", "false");
}));

document.querySelector("#search-input").addEventListener("input", event => {
  searchTerm = event.target.value.trim();
  wishlistOnly = false;
  activeFilter = "All";
  renderProducts();
});
document.querySelector("#search-form").addEventListener("submit", event => {
  event.preventDefault();
  document.querySelector("#products").scrollIntoView({behavior:"smooth"});
});
document.querySelector("#clear-search").addEventListener("click", () => {
  wishlistOnly = false;
  searchTerm = "";
  document.querySelector("#search-input").value = "";
  activeFilter = "All";
  renderProducts();
});
document.querySelector("#all-products-link").addEventListener("click", () => {
  wishlistOnly = false;
  activeFilter = "All";
  searchTerm = "";
  document.querySelector("#search-input").value = "";
  renderProducts();
});

document.querySelector("#cart-button").addEventListener("click", () => showPanel(cartDrawer));
document.querySelector("#close-cart").addEventListener("click", closePanels);
document.querySelector("#continue-shopping").addEventListener("click", closePanels);
overlay.addEventListener("click", closePanels);
document.addEventListener("click", event => {
  if (event.target.closest("[data-close-modal]")) closePanels();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closePanels();
  if (event.key === "Tab" && activePanel) {
    const items = [...activePanel.querySelectorAll(FOCUSABLE)].filter(element => element.getClientRects().length > 0);
    if (items.length) {
      const first = items[0];
      const last = items[items.length - 1];
      const outside = !activePanel.contains(document.activeElement);
      if (event.shiftKey && (outside || document.activeElement === first)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (outside || document.activeElement === last)) { event.preventDefault(); first.focus(); }
    }
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    const input = document.querySelector("#search-input");
    if (window.innerWidth <= 760) input.classList.add("mobile-visible");
    input.focus();
  }
});

document.querySelector("#compare-button").addEventListener("click", openComparison);
document.querySelector("#clear-compare").addEventListener("click", () => {
  compare = [];
  renderProducts();
});
document.querySelector("#wishlist-button").addEventListener("click", () => {
  if (!wishlist.length) return showToast("Your wishlist is ready for a favourite.");
  activeFilter = "All";
  searchTerm = "";
  wishlistOnly = true;
  document.querySelector("#search-input").value = "";
  renderProducts();
  document.querySelector("#products").scrollIntoView({behavior:"smooth"});
  showToast("Showing your saved favourites.");
});

document.querySelector("#menu-toggle").addEventListener("click", event => {
  const nav = document.querySelector("#main-nav");
  const expanded = nav.classList.toggle("nav-open");
  event.currentTarget.setAttribute("aria-expanded", String(expanded));
});
document.querySelector("#mobile-search-button").addEventListener("click", () => {
  const input = document.querySelector("#search-input");
  input.classList.toggle("mobile-visible");
  if (input.classList.contains("mobile-visible")) input.focus();
});
document.querySelector("#checkout-button").addEventListener("click", openCheckout);
checkoutModal.addEventListener("change", event => {
  if (event.target.name === "fulfilment") {
    const address = checkoutModal.querySelector(".address-field");
    address.hidden = event.target.value !== "Local delivery";
    address.querySelector("input").required = !address.hidden;
  }
});
checkoutModal.addEventListener("submit", event => {
  if (event.target.id !== "checkout-form") return;
  event.preventDefault();
  if (!event.target.reportValidity()) return;
  const formElement = event.target;
  const submitButton = formElement.querySelector('[type="submit"]');
  const form = new FormData(formElement);
  submitButton.disabled = true;
  submitButton.textContent = "Sending order request…";
  fetch("/api/orders", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      name:String(form.get("name")).trim(),
      phone:String(form.get("phone")).trim(),
      fulfilment:String(form.get("fulfilment")),
      address:String(form.get("address") || "").trim(),
      items:cart.map(({id, quantity}) => ({id, quantity})),
      website:String(form.get("website") || "")
    })
  }).then(async response => {
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "The order could not be sent.");
    cart = [];
    updateCart();
    checkoutModal.innerHTML = `<div class="checkout-success"><span class="success-icon">✓</span><span class="section-kicker">THANK YOU FOR SHOPPING LOCAL</span><h2>Order request received.</h2><p>Your reference is <strong>${result.reference}</strong>. The shop will call you to confirm product availability and payment. No payment has been taken online.</p><button class="button button-primary" data-close-modal>Back to the shop <span>→</span></button></div>`;
    const done = checkoutModal.querySelector("[data-close-modal]");
    if (done) done.focus({preventScroll:true});
  }).catch(error => {
    console.error("Order submission failed:", error);
    showToast(`${error.message} Please try again or call the shop.`);
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send order request <span>→</span>';
  });
});
document.querySelectorAll("[data-service]").forEach(link => link.addEventListener("click", () => {
  document.querySelector("#booking-form select[name=service]").value = link.dataset.service;
}));

document.querySelector("#booking-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const formElement = event.currentTarget;
  const submitButton = formElement.querySelector('[type="submit"]');
  const customer = new FormData(formElement);
  const name = String(customer.get("name")).trim();
  const phone = String(customer.get("phone")).trim();
  const service = String(customer.get("service"));
  submitButton.disabled = true;
  submitButton.textContent = "Sending service request…";
  try {
    const response = await fetch("/api/service-requests", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name, phone, service, message:String(customer.get("message") || "").trim(), website:String(customer.get("website") || "")})
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "The service request could not be sent.");
    formElement.reset();
    showToast(`Request ${result.reference} sent to the shop. We'll be in touch.`);
  } catch (error) {
    console.error("Service request submission failed:", error);
    showToast(`${error.message} Please try again or call the shop.`);
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send service request <span>→</span>';
  }
});

document.querySelector("#newsletter-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  document.querySelector("#newsletter-status").textContent =
    "Thanks! Email validation works in this preview. Connect a mailing-list service to send updates.";
  form.reset();
});

// Theme toggle: dark/light, persisted, respects the OS preference on first visit
const themeToggle = document.querySelector("#theme-toggle");
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.setAttribute("aria-checked", String(theme === "dark"));
  themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
  themeToggle.querySelector(".toggle-knob").textContent = theme === "dark" ? "☾" : "☀";
}
const savedTheme = (() => {
  try { return localStorage.getItem("neighbourhood-theme"); }
  catch { return null; }
})();
applyTheme(savedTheme === "dark" || savedTheme === "light" ? savedTheme : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeToggle.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("neighbourhood-theme", next); } catch (error) { console.warn("Could not save theme preference.", error); }
});

// Hero image slider: auto-rotates, with dots for manual control
const heroSlider = document.querySelector("#hero-slider");
if (heroSlider) {
  const slides = [...heroSlider.querySelectorAll("img")];
  const dots = [...heroSlider.querySelectorAll(".hero-slider-dots button")];
  let activeSlide = 0;
  let slideTimer;
  function goToSlide(index) {
    slides[activeSlide].classList.remove("active");
    dots[activeSlide].classList.remove("active");
    dots[activeSlide].setAttribute("aria-selected", "false");
    activeSlide = (index + slides.length) % slides.length;
    slides[activeSlide].classList.add("active");
    dots[activeSlide].classList.add("active");
    dots[activeSlide].setAttribute("aria-selected", "true");
  }
  function startAutoSlide() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => goToSlide(activeSlide + 1), 5000);
  }
  dots.forEach((dot, index) => dot.addEventListener("click", () => {
    goToSlide(index);
    startAutoSlide();
  }));
  heroSlider.addEventListener("mouseenter", () => clearInterval(slideTimer));
  heroSlider.addEventListener("mouseleave", startAutoSlide);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) startAutoSlide();
}

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector(".tab-count").textContent = products.length;
cartDrawer.inert = true;
updateCart();
updateWishlist();
renderProducts();
// Fade sections in as they scroll into view
const revealTargets = document.querySelectorAll(
  ".benefit-strip, .category-section, .products-section, .help-section, .about-section, .clients-section, .services-section, .gaming-section, .testimonials-section, .newsletter-section, .booking-section"
);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // animate once only
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
  });
}

// Bounce the cart badge
function bumpCart() {
  const badge = document.querySelector("#cart-count");
  badge.classList.remove("bump");
  void badge.offsetWidth; // forces the browser to restart the animation
  badge.classList.add("bump");
}