<template>
  <div class="v-cart" :class="{ no_scroll: isDialogVisible }">
    <h1>Корзина</h1>
    <p class="v-cart__empty-cart-text" v-if="!cart.length">
      Добавьте товар в корзину...
    </p>
    <v-credit-card v-model:show="isDialogVisible" />
    <v-cart-item
      v-for="(item, index) in cart"
      :key="item.article"
      :cartItem="item"
      @removeFromCart="removeFromCart(index)"
      @increment="increment(index)"
      @decrement="decrement(index)"
    />
    <div v-if="cart.length" class="v-cart__total">
      <button @click="showDialog" class="v-cart__total__btn btn">Купить</button>
      <div class="v-cart__total__price">Итого: {{ cartTotalCost }} ₽</div>
    </div>
  </div>
</template>

<script setup>
import vCartItem from './v-cart-item.vue';
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import vCreditCard from './v-credit-card.vue';

const cart = useStorage('cart', []);
const isDialogVisible = ref(false);

const cartTotalCost = computed(() => {
  let result = [];

  if (cart.value.length) {
    for (let item of cart.value) {
      result.push(item.price * item.quantity);
    }
    result = result.reduce(function (sum, el) {
      return sum + el;
    });
    return result;
  } else {
    return 0;
  }
});
const showDialog = () => {
  (isDialogVisible.value = true), window.scrollTo(0, 0);
};

const removeFromCart = (index) => {
  cart.value.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart.value));
};

const increment = (index) => {
  cart.value[index].quantity++;
  localStorage.setItem('cart', JSON.stringify(cart.value));
};

const decrement = (index) => {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity--;
  } else cart.value.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart.value));
};
</script>

<style lang="scss" scoped>
@import '/src/assets/styles/components/v-cart.scss';
</style>
