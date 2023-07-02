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
            <span class="v-cart-item__quantity_btn" @click="decrementItem"
              >-</span
            >
            {{ cartItem.quantity }}
            <span class="v-cart-item__quantity_btn" @click="incrementItem"
              >+</span
            >
          </span>
        </div>
      </div>
    </div>
    <div class="v-cart-item__cost">
      <button class="v-cart-item__btn" @click="removeFromCart"></button>
      <h3>{{ cartItem.price * cartItem.quantity }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-cart-item',
  props: {
    cartItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props, context) {
    const removeFromCart = () => context.emit('removeFromCart');
    const incrementItem = () => context.emit('increment');
    const decrementItem = () => context.emit('decrement');
    return {
      removeFromCart,
      incrementItem,
      decrementItem,
    };
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

  &__btn {
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

  &__cost {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }

  &__content {
    display: flex;

    &__image {
      object-fit: contain;
      height: 168px;
      width: 150px;
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
  }
  &__quantity_btn {
    cursor: pointer;
  }
}
</style>
