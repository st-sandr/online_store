<template>
  <div class="v-catalog-item">
    <img
      @click="productClick"
      class="v-catalog-item__image"
      :src="require('@/assets/images/' + product.image)"
      alt="img"
    />
    <div class="v-catalog-item__info">
      <p class="v-catalog-item__name">{{ product.name }}</p>
      <p class="v-catalog-item__price">{{ product.price }} ₽</p>
    </div>
    <button class="v-catalog-item__card_btn btn" @click="addToCart">
      Добавить в корзину
    </button>
  </div>
</template>

<script>
export default {
  name: 'v-catalog-item',
  props: {
    product: {
      type: Object,
    },
  },
  setup(props, context) {
    const addToCart = () => {
      if (!props.product['quantity']) {
        props.product['quantity'] = 1;
      }
      context.emit('addToCart', props.product);
    };

    const productClick = () =>
      context.emit('productClick', props.product.article);

    return { addToCart, productClick };
  },
};
</script>

<style lang="scss">
.v-catalog-item {
  display: flex;
  flex: 1 1 30%;
  max-width: 30%;
  flex-direction: column;
  height: 320px;
  box-sizing: border-box;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding * 2 $padding * 2 $padding;
  margin-bottom: 30px;
  justify-content: space-between;
  &__info {
    display: flex;
    justify-content: space-between;
    margin: $margin 20px;
  }
  &__image {
    object-fit: contain;
    height: 200px;
  }
  &__card_btn {
    box-sizing: border-box;
    border: none;
    background-color: #ffffff;
    width: 100%;
    &:hover {
      background-color: $is_hover;
    }
    &:active {
      background-color: $is_activ;
    }
  }
}
// .v-catalog-item:not(:nth-child(3n + 3)) {
//   margin-right: 30px;
// }
@media (min-width: 600px) and (max-width: 992px) {
  .v-catalog-item {
    flex: 1 1 47%;
    max-width: 47%;
  }
  // .v-catalog-item:not(:nth-child(2n + 1)) {
  //   margin-right: 10px;
  // }
}
@media (max-width: 599px) {
  .v-catalog-item {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
