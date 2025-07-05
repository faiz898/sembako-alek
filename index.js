function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  // Reset keranjang
  localStorage.removeItem('cart');
  updateCartCount();
  renderCart();

  alert("Terima kasih! Pesanan Anda sedang diproses.");
}
