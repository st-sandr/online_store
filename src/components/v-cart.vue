<template>
  <div class="v-cart">
    <h1>Корзина</h1>
    <p class="v-cart__empty-cart-text" v-if="!cart.length">
      Добавьте товар в корзину...
    </p>
    <v-cart-item
      v-for="(item, index) in cart"
      :key="item.article"
      :cartItem="item"
      @removeFromCart="removeFromCart(index)"
      @increment="increment(index)"
      @decrement="decrement(index)"
    />
    <div v-if="cart.length" class="v-cart__total">
      <div class="v-cart__total__price">Итого: {{ cartTotalCost }} ₽</div>
    </div>
  </div>
</template>

<script>
import vCartItem from './v-cart-item.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'v-cart',
  components: { vCartItem },

  setup() {
    const store = useStore();
    console.log;

    const increment = (index) => store.commit('increment', index);
    const decrement = (index) => store.commit('decrement', index);
    const removeFromCart = (index) => store.commit('removeFromCart', index);

    const cart = computed(() => store.getters.cart);

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

    return {
      increment,
      decrement,
      removeFromCart,
      cart,
      cartTotalCost,
    };
  },
};
</script>

<style lang="scss">
.v-cart {
  &__total {
    display: flex;
    justify-content: flex-end;
    margin-top: $margin * 2;
    &__price {
      border: 1px solid #e4e4e4;
      padding: $padding * 2;
    }
  }
  &__empty-cart-text {
    margin-top: 20px;
    color: #e0e0e0;
  }
}
</style>
