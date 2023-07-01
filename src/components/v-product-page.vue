<template>
  <div v-if="product" class="v-product-page">
    <div class="v-product-page__content">
      <img
        class="v-product-page__image"
        :src="require('@/assets/images/' + product.image)"
        alt="img"
      />
      <div class="v-product-page__content__info">
        <div class="v-product-page__content__info__title">
          <div>
            <h3>{{ product.name }}</h3>
            <small>Артикул: {{ product.article }}</small>
          </div>
        </div>
      </div>
      <!-- <div class="v-product-page__content__info__quantity">
        <p>Кол-во</p>
        <span>
          <span class="v-product-page_quantity_btn" @click="decrementItem"
            >-</span
          >
          {{ cartItem.quantity }}
          <span class="v-product-page__quantity_btn" @click="incrementItem"
            >+</span
          >
        </span>
      </div> -->
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
</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';

export default {
  name: 'v-product-page',
  props: {},
  setup() {
    const store = useStore();
    const route = useRoute();

    const getProducts = () => store.dispatch('getProductsFromApi');
    const addToCart = () => {
      if (!product.value['quantity']) {
        product.value['quantity'] = 1;
      }
      store.commit('addToCart', product.value);
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

<style lang="scss" scoped>
.v-product-page {
  display: flex;
  padding: $padding * 2 $padding * 2 $padding;
  margin-bottom: 30px;
  justify-content: space-between;
  &__content {
    display: flex;
    &__info {
      margin-left: $margin * 8;
    }
  }
  &__image {
    object-fit: contain;
    height: 400px;
  }
  &__buy {
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
</style>
