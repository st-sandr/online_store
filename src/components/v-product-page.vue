<template>
  <div v-if="product" class="v-product-page">
    <Splide :options="{ rewind: true }" class="v-product-page__slider">
      <SplideSlide>
        <img
          class="v-product-page__image"
          :src="
            require('@/assets/images/' +
              product.category +
              '/' +
              product.article +
              '/' +
              '1.jpg')
          "
          alt="img"
        />
      </SplideSlide>
      <SplideSlide>
        <img
          class="v-product-page__image"
          :src="
            require('@/assets/images/' +
              product.category +
              '/' +
              product.article +
              '/' +
              '2.jpg')
          "
          alt="img"
        />
      </SplideSlide>
      <SplideSlide>
        <img
          class="v-product-page__image"
          :src="require('@/assets/images/' + product.category + '/' + '3.jpg')"
          alt="img"
        />
      </SplideSlide>
      <SplideSlide>
        <img
          class="v-product-page__image"
          :src="require('@/assets/images/' + product.category + '/' + '4.jpg')"
          alt="img"
        />
      </SplideSlide>
      <SplideSlide>
        <img
          class="v-product-page__image"
          :src="require('@/assets/images/' + product.category + '/' + '5.jpg')"
          alt="img"
        />
      </SplideSlide>
    </Splide>
    <div class="v-product-page__info">
      <div>
        <div class="v-product-page__info__title">
          <h3>{{ product.name }}</h3>
          <small>Артикул: {{ product.article }}</small>
        </div>
        <p>Описание: {{ product.description }}</p>
      </div>
      <div class="v-product-page__buy">
        <div class="v-product-page__buy__price">
          <p>Цена: {{ product.price }} ₽</p>
        </div>
        <button @click="addToCart" class="v-product-page__buy__btn btn">
          Добавить в корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
// import '@splidejs/vue-splide/css/core';
import '@splidejs/vue-splide/css/sea-green';

const store = useStore();
const route = useRoute();
const toast = useToast();

const getProducts = () => store.dispatch('getProductsFromApi');
const addToCart = () => {
  if (!product.value['quantity']) {
    product.value['quantity'] = 1;
  }
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length) {
    let isProductExists = false;
    cart.forEach(function (item) {
      if (item.article === product.value.article) {
        isProductExists = true;
        toast('Товар уже в корзине', {
          position: 'top-right',
          timeout: 2000,
          draggablePercent: 0.6,
          hideProgressBar: true,
          closeButton: 'button',
        });
      }
    });
    if (!isProductExists) {
      cart.push(product.value);
      localStorage.setItem('cart', JSON.stringify(cart));
      toast.success('Товар добавлен!', {
        position: 'top-right',
        timeout: 2000,
        draggablePercent: 0.6,
        hideProgressBar: true,
        closeButton: 'button',
      });
    }
  } else {
    cart.push(product.value);
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Товар добавлен!', {
      position: 'top-right',
      timeout: 2000,
      draggablePercent: 0.6,
      hideProgressBar: true,
      closeButton: 'button',
    });
  }
};

const product = computed(() => store.getters.product(route.query.product));
onMounted(() => getProducts());
</script>

<style lang="scss">
@import '/src/assets/styles/components/v-product-page.scss';
</style>
