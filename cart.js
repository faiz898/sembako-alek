function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateTotal() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('totalPrice').innerText = total;
}

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

function changeQuantity(index, delta) {
  let cart = getCart();
  cart[index].quantity += delta;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

window.onload = () => {
  renderCart();
};

