<template>
  <div class="v-cart-item">
    <div class="v-cart-item__content">
      <img
        class="v-cart-item__image"
        :src="require('@/assets/images/' + cart_item_data.image)"
        alt="img"
      />
      <div class="v-cart-item__info">
        <div class="v-cart-item__info__title">
          <div>
            <h3>{{ cart_item_data.name }}</h3>
            <small>Артикул: {{ cart_item_data.article }}</small>
          </div>
          <div class="v-cart-item__info__feature">
            <p>Цена: {{ cart_item_data.price }} ₽</p>
          </div>
        </div>
        <div class="v-cart-item__quantity">
          <p>Кол-во</p>
          <span>
            <span class="v-cart-item__quantity_btn" @click="decrementItem"
              >-</span
            >
            {{ cart_item_data.quantity }}
            <span class="v-cart-item__quantity_btn" @click="incrementItem"
              >+</span
            >
          </span>
        </div>
      </div>
    </div>
    <div class="v-cart-item__cost">
      <button class="v-cart-item__btn" @click="deleteFromCart"></button>
      <h3>{{ cart_item_data.price * cart_item_data.quantity }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-cart-item',
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    deleteFromCart() {
      this.$emit('deleteFromCart');
    },
    incrementItem() {
      this.$emit('increment');
    },
    decrementItem() {
      this.$emit('decrement');
    },
  },
};
</script>

<style lang="scss" scoped>
.v-cart-item {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding * 2;
  margin-top: $margin * 4;
  height: 200px;
  &__cost {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
  &__content {
    display: flex;
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: $margin * 4;
    align-items: flex-start;
    &__title {
      text-align: start;
    }
    &__feature {
      margin-top: $margin * 2;
      font-size: 15px;
    }
  }
  &__image {
    object-fit: contain;
    height: 168px;
    width: 150px;
  }
  &__quantity_btn {
    cursor: pointer;
  }
}
.v-cart-item__btn {
  border: none;
  margin: $margin;
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: center center;
  width: 25px;
  height: 25px;
  background-image: url('@/assets/icons/remove__cart.svg');
  cursor: pointer;
}
</style>
