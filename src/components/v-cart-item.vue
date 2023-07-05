<template>
  <div class="v-cart-item">
    <div class="v-cart-item__content">
      <img
        class="v-cart-item__content__image"
        :src="
          require('@/assets/images/' +
            cartItem.category +
            '/' +
            cartItem.article +
            '/' +
            cartItem.image)
        "
        alt="img"
      />
      <div class="v-cart-item__content__info">
        <div class="v-cart-item__content__info__title">
          <div>
            <h3>{{ cartItem.name }}</h3>
            <small>Артикул: {{ cartItem.article }}</small>
          </div>
          <div class="v-cart-item__content__info__feature">
            <p>Цена: {{ cartItem.price }} ₽</p>
          </div>
        </div>
        <div class="v-cart-item__content__info__quantity">
          <p>Кол-во</p>
          <span>
            <span class="v-cart-item__quantity_btn" @click="emit('decrement')"
              >-</span
            >
            {{ cartItem.quantity }}
            <span class="v-cart-item__quantity_btn" @click="emit('increment')"
              >+</span
            >
          </span>
        </div>
      </div>
    </div>
    <div class="v-cart-item__cost">
      <button class="v-cart-item__btn" @click="emit('removeFromCart')"></button>
      <h3>{{ cartItem.price * cartItem.quantity }}</h3>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cartItem: {
    type: Object,
    default() {
      return {};
    },
  },
});
const emit = defineEmits(['removeFromCart', 'increment', 'decrement']);
</script>

<style lang="scss" scoped>
@import '/src/assets/styles/components/v-cart-item.scss';
</style>
