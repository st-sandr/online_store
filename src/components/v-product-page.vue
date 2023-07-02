<template>
  <div v-if="product" class="v-product-page">
    <div class="v-product-page__content">
      <Splide
        :teg="section"
        :options="{ rewind: true }"
        class="v-product-page__content__slider"
      >
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
            :src="
              require('@/assets/images/' + product.category + '/' + '3.jpg')
            "
            alt="img"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            class="v-product-page__image"
            :src="
              require('@/assets/images/' + product.category + '/' + '4.jpg')
            "
            alt="img"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            class="v-product-page__image"
            :src="
              require('@/assets/images/' + product.category + '/' + '5.jpg')
            "
            alt="img"
          />
        </SplideSlide>
      </Splide>
      <div class="v-product-page__content__info">
        <div>
          <div class="v-product-page__content__info__title">
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
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';
import '@splidejs/vue-splide/css/core';

export default {
  name: 'v-product-page',

  setup() {
    const store = useStore();
    const route = useRoute();

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
      }
    };

    const product = computed(() => store.getters.product(route.query.product));
    onMounted(() => getProducts());
    return {
      addToCart,
      product,
    };
  },
};
</script>

<style lang="scss">
.v-product-page {
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
  &__content {
    display: flex;
    justify-content: space-between;
    &__slider {
      flex-direction: column;
      flex: 1 1 25%;
    }
    &__info {
      display: flex;
      flex-direction: column;
      flex: 1 1 25%;
      margin-left: $margin * 4;
      justify-content: space-between;
      &__title {
        margin-bottom: $margin * 2;
      }
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &__buy {
    width: 180px;
    &__price {
      font-size: 20px;
      margin-bottom: $margin * 2;
    }
    &__btn {
      box-sizing: border-box;
      border: none;
      background-color: teal;
      color: white;
      &:hover {
        background-color: rgb(2, 112, 112);
      }
      &:active {
        background-color: rgb(2, 49, 49);
      }
    }
  }
}
.splide {
  height: 60hw;
}
.splide__arrow.splide__arrow {
  display: none;
}
.splide__pagination {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  pointer-events: none;
}
.splide__pagination li {
  display: inline-block;
  margin: 0;
  pointer-events: auto;
}
.splide__pagination__page {
  background: #ccc;
  border: 0;
  border-radius: 2.5px;
  display: inline-block;
  height: 5px;
  margin: 3px;
  padding: 0;
  position: relative;
  transition: background-color 0.2s linear;
  width: 20px;
  cursor: pointer;
  &:hover {
    background-color: $is_hover;
  }
  &:active {
    background-color: $is_activ;
  }
}
</style>
