import { ref, onMounted, watch, computed } from 'vue';

export function useCart(product) {
  const cart = computed(() => JSON.parse(localStorage.getItem('cart')) || []);
  // const addToCart = () => {
  if (!product.value['quantity']) {
    product.value['quantity'] = 1;
  }

  if (cart.length) {
    let isProductExists = false;
    cart.forEach(function (item) {
      if (item.article === product.value.article) {
        isProductExists = true;
        product.value.quantity++;
      }
    });
    if (!isProductExists) {
      cart.push(product.value);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  } else {
    cart.push(product.value);
    localStorage.setItem('cart', JSON.stringify(cart));
    // }
  }

  return { cart };
}
