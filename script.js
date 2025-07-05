const products = [
  { id: 1, name: "Beras SPHP", price: 75000 },
  { id: 2, name: "Minyak Goreng Rose Brand", price: 27000 },
  { id: 3, name: "Gula Pasir CSR", price: 18000 },
  { id: 4, name: "Tepung FS", price: 13000 },
  { id: 5, name: "Mie gelas", price: 4000 },
  { id: 6, name: "Daging Perenn", price: 38000 },
  { id: 7, name: "Telur Omega", price: 45000 },
  { id: 8, name: "Garam Pyramid", price: 4000 },
  { id: 9, name: "Susu SGM", price: 90000 },
];

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
  let cart = getCart();
  const product = products.find(p => p.id === productId);
  const existing = cart.find(p => p.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').innerText = count;
}

function renderProducts(filtered = products) {
  const container = document.getElementById('productList');
  container.innerHTML = '';
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Rp ${product.price}</p>
      <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
    `;
    container.appendChild(card);
  });
}

document.getElementById('searchInput').addEventListener('input', function() {
  const term = this.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  renderProducts(filtered);
});

window.onload = () => {
  renderProducts();
  updateCartCount();
};

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').innerText = count;
}

function addToCart(productId) {
  let cart = getCart();
  const product = products.find(p => p.id === productId);
  const existing = cart.find(p => p.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
}

function renderProducts(filtered = products) {
  const container = document.getElementById('productList');
  container.innerHTML = '';
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Rp ${product.price}</p>
      <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
    `;
    container.appendChild(card);
  });
}

document.getElementById('searchInput').addEventListener('input', function() {
  const term = this.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  renderProducts(filtered);
});

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cartItems');
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p>Keranjang kosong.</p>';
    document.getElementById('totalPrice').innerText = '0';
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <strong>${item.name}</strong><br>
      Rp ${item.price} x 
      <button onclick="changeQuantity(${index}, -1)">−</button>
      ${item.quantity}
      <button onclick="changeQuantity(${index}, 1)">+</button>
      = Rp ${item.price * item.quantity}
      <button onclick="removeItem(${index})">🗑️</button>
    `;
    container.appendChild(div);
  });

  updateTotal();
}

function updateTotal() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('totalPrice').innerText = total;
}

function changeQuantity(index, delta) {
  let cart = getCart();
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function showSection(section) {
  const productSection = document.getElementById('productSection');
  const cartSection = document.getElementById('cartSection');

  if (section === 'products') {
    productSection.style.display = 'block';
    cartSection.style.display = 'none';
  } else {
    productSection.style.display = 'none';
    cartSection.style.display = 'block';
    renderCart();
  }
}

window.onload = () => {
  renderProducts();
  updateCartCount();
};

