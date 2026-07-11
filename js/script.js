// DonXL - lógica del sitio

const HOTDOGS = {
  "doble-pecado": {
    name: "Doble Pecado",
    tagline: "Si esto es un pecado, que no nos perdonen.",
    description: "Salchicha americana premium reducida en una salsa de café, sobre una cama de queso cheddar, papitas crujientes, nuestra irresistible mermelada de bacon con notas de café y la inconfundible salsa de ajo de la casa. Un exceso de sabores que vale cada pedazo.",
    image: "assets/menu/doble-pecado.png",
    prices: { 1: 17000, 2: 19500, 3: 22000 }
  },
  "don-peperoni": {
    name: "Don Pepperoni",
    tagline: "Si la pizza tuviera un primo peligroso, sería este Don.",
    description: "Salchicha americana premium sobre doble cama de queso fundido, base de tomate, pepperoni dorado, Doritos crujientes, salsa dulce ahumada y una mezcla de especias italianas que le dan su personalidad inconfundible.",
    image: "assets/menu/don-peperoni.png",
    prices: { 1: 17000, 2: 19500, 3: 22000 }
  },
  "el-bandido": {
    name: "El Bandido",
    tagline: "No es ilegal… pero debería serlo.",
    description: "Salchicha americana premium sobre una cama de queso fundido, guacamole con un atrevido toque picante, doritos crujientes, jalapeños, pico de gallo y huevos de codorniz, salsa picante de la casa. Un sabor que llega sin avisar y te roba el paladar.",
    image: "assets/menu/el-bandido.png",
    prices: { 1: 18000, 2: 20500, 3: 23000 }
  },
  "el-que-resuelve": {
    name: "El Que Resuelve",
    tagline: "No promete mucho… pero siempre cumple.",
    description: "Salchicha americana premium, queso fundido, cebolla salteada en salsa soya, papitas crocantes, huevos de codorniz, salsas. La solución perfecta para cualquier antojo.",
    image: "assets/menu/el-que-resuelve.png",
    prices: { 1: 13500, 2: 16000, 3: 19500 }
  },
  "rancherito-xl": {
    name: "Rancherito XL",
    tagline: "El sabor ranchero, pero en versión gigante.",
    description: "Salchicha americana premium, queso fundido, cebolla salteada en salsa soya, maduro doradito, tocineta premium, papitas crujientes, huevos de codorniz, salsa bbq y piña. Todo servido en un suave pan de ajonjolí.",
    image: "assets/menu/rancherito-xl.png",
    prices: { 1: 17000, 2: 19500, 3: 22000 }
  }
};

const FREE_SAUCES = ["Tomate", "BBQ", "Mayonesa", "Ajo", "Piña", "Tomate Picante"];

const PAID_ADDONS = [
  { name: "Extra queso", price: 1500 },
  { name: "Extra Queso Cheddar", price: 2500 },
  { name: "Extra Bacon", price: 1000 }
];

const DRINKS = [
  { name: "Coca Cola 3L", price: 11000, image: "assets/gaseosas/coca-cola-3l.jpg" },
  { name: "Coca Cola 2.5L", price: 8500, image: "assets/gaseosas/coca-cola-2-5l.jpg" },
  { name: "Coca Cola 1.5L", price: 6500, image: "assets/gaseosas/coca-cola-1-5l.jpg" },
  { name: "Coca Cola 1L", price: 4500, image: "assets/gaseosas/coca-cola-1l.png" },
  { name: "Coca Cola 400ml", price: 3200, image: "assets/gaseosas/coca-cola-400ml.webp" },
  { name: "Coca Cola 250ml", price: 2100, image: "assets/gaseosas/coca-cola-250ml.png" },
  { name: "Jugo Hit 500ml", price: 3000, image: "assets/gaseosas/jugo-hit-500ml.jpg" },
  { name: "Sprite 1.5L", price: 4500, image: "assets/gaseosas/sprite-1-5l.jpg" }
];

const money = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

const WHATSAPP_NUMBER = "573227209034";
const cart = [];

const overlay = document.getElementById("modalOverlay");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalTagline = document.getElementById("modalTagline");
const modalDesc = document.getElementById("modalDesc");
const qtyGroup = document.getElementById("qtyGroup");
const saucesGroup = document.getElementById("saucesGroup");
const addonsGroup = document.getElementById("addonsGroup");
const modalInstructions = document.getElementById("modalInstructions");
const modalPrice = document.getElementById("modalPrice");
const modalAdd = document.getElementById("modalAdd");
const modalClose = document.getElementById("modalClose");
const cartBar = document.getElementById("cartBar");
const cartSummary = document.getElementById("cartSummary");
const checkoutBtn = document.getElementById("checkoutBtn");
const reviewBtn = document.getElementById("reviewBtn");
const cartModalOverlay = document.getElementById("cartModalOverlay");
const cartModalClose = document.getElementById("cartModalClose");
const cartItemsList = document.getElementById("cartItemsList");
const cartModalTotal = document.getElementById("cartModalTotal");
const cartModalCheckout = document.getElementById("cartModalCheckout");
const paymentModalOverlay = document.getElementById("paymentModalOverlay");
const paymentModalClose = document.getElementById("paymentModalClose");
const paymentGroup = document.getElementById("paymentGroup");
const paymentConfirmBtn = document.getElementById("paymentConfirmBtn");

let currentHotdog = null;
let selectedQty = null;
let selectedAddons = new Set();

function openModal(id) {
  const hotdog = HOTDOGS[id];
  if (!hotdog) return;

  currentHotdog = id;
  selectedQty = null;
  selectedAddons = new Set();

  modalImg.src = hotdog.image;
  modalImg.alt = hotdog.name;
  modalName.textContent = hotdog.name;
  modalTagline.textContent = hotdog.tagline;
  modalDesc.textContent = hotdog.description;
  modalInstructions.value = "";

  qtyGroup.innerHTML = "";
  [1, 2, 3].forEach((qty) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pill";
    btn.textContent = `+${qty}`;
    btn.dataset.qty = qty;
    btn.addEventListener("click", () => {
      selectedQty = qty;
      qtyGroup.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      updatePrice();
    });
    qtyGroup.appendChild(btn);
  });

  saucesGroup.innerHTML = "";
  FREE_SAUCES.forEach((sauce) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.textContent = sauce;
    chip.addEventListener("click", () => chip.classList.toggle("active"));
    saucesGroup.appendChild(chip);
  });

  addonsGroup.innerHTML = "";
  PAID_ADDONS.forEach((addon) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.textContent = `${addon.name} +${money.format(addon.price)}`;
    chip.addEventListener("click", () => {
      chip.classList.toggle("active");
      if (selectedAddons.has(addon.name)) {
        selectedAddons.delete(addon.name);
      } else {
        selectedAddons.add(addon.name);
      }
      updatePrice();
    });
    addonsGroup.appendChild(chip);
  });

  updatePrice();
  overlay.classList.add("open");
}

function currentUnitPrice() {
  const base = HOTDOGS[currentHotdog].prices[selectedQty];
  const addonsTotal = PAID_ADDONS
    .filter((a) => selectedAddons.has(a.name))
    .reduce((sum, a) => sum + a.price, 0);
  return base + addonsTotal;
}

function updatePrice() {
  if (!currentHotdog || !selectedQty) {
    modalPrice.textContent = "Selecciona la cantidad";
    modalAdd.disabled = true;
    return;
  }
  modalPrice.textContent = money.format(currentUnitPrice());
  modalAdd.disabled = false;
}

function closeModal() {
  overlay.classList.remove("open");
  currentHotdog = null;
}

document.querySelectorAll(".menu-add").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".menu-card");
    openModal(card.dataset.hotdog);
  });
});

modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.unitPrice, 0);
}

function formatQty(item) {
  return item.type === "hotdog" ? `x${item.qty}_Salch` : `x${item.qty}`;
}

function updateCartBar() {
  if (cart.length === 0) {
    cartBar.classList.remove("visible");
    cartModalOverlay.classList.remove("open");
    return;
  }
  cartSummary.textContent = `${cart.length} producto${cart.length === 1 ? "" : "s"} · ${money.format(cartTotal())}`;
  cartBar.classList.add("visible");
}

function renderCartReview() {
  cartItemsList.innerHTML = "";

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<p class="cart-empty">Tu pedido está vacío.</p>';
    cartModalTotal.textContent = "";
    cartModalCheckout.disabled = true;
    return;
  }

  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "cart-item-row";

    const metaParts = [];
    if (item.sauces.length) metaParts.push(`Salsas: ${item.sauces.join(", ")}`);
    if (item.addons.length) metaParts.push(`Extras: ${item.addons.map((a) => a.name).join(", ")}`);
    if (item.instructions) metaParts.push(`Instrucciones: ${item.instructions}`);

    row.innerHTML = `
      <button type="button" class="cart-item-remove" aria-label="Quitar" data-index="${index}">&times;</button>
      <div class="cart-item-name">${item.name} ${formatQty(item)}</div>
      ${metaParts.length ? `<div class="cart-item-meta">${metaParts.join(" · ")}</div>` : ""}
      <div class="cart-item-price">${money.format(item.unitPrice)}</div>
    `;
    cartItemsList.appendChild(row);
  });

  cartModalTotal.textContent = `Total: ${money.format(cartTotal())}`;
  cartModalCheckout.disabled = false;

  cartItemsList.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      cart.splice(Number(btn.dataset.index), 1);
      updateCartBar();
      renderCartReview();
    });
  });
}

function openCartReview() {
  renderCartReview();
  cartModalOverlay.classList.add("open");
}

function closeCartReview() {
  cartModalOverlay.classList.remove("open");
}

reviewBtn.addEventListener("click", openCartReview);
cartModalClose.addEventListener("click", closeCartReview);
cartModalOverlay.addEventListener("click", (e) => {
  if (e.target === cartModalOverlay) closeCartReview();
});

modalAdd.addEventListener("click", () => {
  const sauces = Array.from(saucesGroup.querySelectorAll(".chip.active")).map((c) => c.textContent);
  const addons = PAID_ADDONS.filter((a) => selectedAddons.has(a.name));

  cart.push({
    name: HOTDOGS[currentHotdog].name,
    qty: selectedQty,
    type: "hotdog",
    sauces,
    addons,
    instructions: modalInstructions.value.trim(),
    unitPrice: currentUnitPrice()
  });

  updateCartBar();

  modalAdd.textContent = "¡Agregado!";
  setTimeout(() => {
    modalAdd.textContent = "Agregar al pedido";
    closeModal();
  }, 700);
});

function sendOrderToWhatsApp(paymentMethod) {
  if (cart.length === 0) return;

  const lines = cart.map((item, i) => {
    let line = `${i + 1}) ${item.name} ${formatQty(item)}`;
    if (item.sauces.length) line += `\n   Salsas: ${item.sauces.join(", ")}`;
    if (item.addons.length) line += `\n   Extras: ${item.addons.map((a) => a.name).join(", ")}`;
    if (item.instructions) line += `\n   Instrucciones: ${item.instructions}`;
    line += `\n   Precio: ${money.format(item.unitPrice)}`;
    return line;
  });

  const message = `¡Hola DonXL! Quiero hacer este pedido:\n\n${lines.join("\n\n")}\n\nTotal: ${money.format(cartTotal())}\nMétodo de pago: ${paymentMethod}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

let selectedPayment = null;

function openPaymentModal() {
  if (cart.length === 0) return;
  selectedPayment = null;
  paymentGroup.querySelectorAll(".payment-pill").forEach((p) => p.classList.remove("active"));
  paymentConfirmBtn.disabled = true;
  closeCartReview();
  paymentModalOverlay.classList.add("open");
}

function closePaymentModal() {
  paymentModalOverlay.classList.remove("open");
}

paymentGroup.querySelectorAll(".payment-pill").forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedPayment = btn.dataset.method;
    paymentGroup.querySelectorAll(".payment-pill").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    paymentConfirmBtn.disabled = false;
  });
});

paymentConfirmBtn.addEventListener("click", () => {
  if (!selectedPayment) return;
  sendOrderToWhatsApp(selectedPayment);
  closePaymentModal();
});

paymentModalClose.addEventListener("click", closePaymentModal);
paymentModalOverlay.addEventListener("click", (e) => {
  if (e.target === paymentModalOverlay) closePaymentModal();
});

checkoutBtn.addEventListener("click", openCartReview);
cartModalCheckout.addEventListener("click", openPaymentModal);

const drinksGrid = document.getElementById("drinksGrid");

function renderDrinks() {
  drinksGrid.innerHTML = "";
  DRINKS.forEach((drink) => {
    const card = document.createElement("div");
    card.className = "drink-card";

    const imgHtml = drink.image
      ? `<img src="${drink.image}" alt="${drink.name}">`
      : `<span class="drink-placeholder">🧃</span>`;

    card.innerHTML = `
      <div class="drink-card-img">${imgHtml}</div>
      <div class="drink-card-info">
        <div>
          <div class="drink-name">${drink.name}</div>
          <div class="drink-price">${money.format(drink.price)}</div>
        </div>
        <button type="button" class="drink-add" aria-label="Agregar ${drink.name}">+</button>
      </div>
    `;

    card.querySelector(".drink-add").addEventListener("click", (e) => {
      cart.push({
        name: drink.name,
        qty: 1,
        type: "drink",
        sauces: [],
        addons: [],
        instructions: "",
        unitPrice: drink.price
      });
      updateCartBar();

      const btn = e.currentTarget;
      btn.textContent = "✓";
      setTimeout(() => (btn.textContent = "+"), 700);
    });

    drinksGrid.appendChild(card);
  });
}

renderDrinks();
