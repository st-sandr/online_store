<template>
  <div class="v-catalog-item">
    <img
      @click="emit('productClick', product.article)"
      class="v-catalog-item__image"
      :src="
        require('@/assets/images/' +
          product.category +
          '/' +
          product.article +
          '/' +
          product.image)
      "
      alt="img"
    />
    <div class="v-catalog-item__info">
      <p class="v-catalog-item__info__name">{{ product.name }}</p>
      <p class="v-catalog-item__info__price">{{ product.price }} ₽</p>
    </div>
    <button
      class="v-catalog-item__card_btn btn"
      @click="emit('addToCart', product)"
    >
      Добавить в корзину
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
  },
});
const emit = defineEmits(['addToCart', 'productClick']);
</script>

<style lang="scss" scoped>
@import '/src/assets/styles/components/v-catalog-item.scss';
</style>
