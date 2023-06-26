<template>
  <div class="v-cart">
    <h1>Корзина</h1>
    <p class="v-cart__empty-cart-text" v-if="!CART.length">
      Добавьте товар в корзину...
    </p>
    <v-cart-item
      v-for="(item, index) in CART"
      :key="item.article"
      :cart_item_data="item"
      @deleteFromCart="deleteFromCart(index)"
      @increment="increment(index)"
      @decrement="decrement(index)"
    />
    <div v-if="CART.length" class="v-cart__total">
      <div class="v-cart__total__price">Итого: {{ cartToralCost }} ₽</div>
    </div>
  </div>
</template>

<script>
import vCartItem from './v-cart-item.vue';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {
  name: 'v-cart',
  components: { vCartItem },
  // props: {
  //   cart_data: {
  //     type: Array,
  //   },
  // },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
      'INCREMENT_CART_ITEM',
      'DECREMENT_CART_ITEM',
    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    },
    increment(index) {
      this.INCREMENT_CART_ITEM(index);
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index);
    },
  },
  computed: {
    ...mapGetters(['CART']),
    cartToralCost() {
      let result = [];

      if (this.CART.length) {
        for (let item of this.CART) {
          result.push(item.price * item.quantity);
        }
        result = result.reduce(function (sum, el) {
          return sum + el;
        });
        return result;
      } else {
        return 0;
      }
    },
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
