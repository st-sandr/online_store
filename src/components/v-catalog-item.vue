<template>
  <div class="v-catalog-item">
    <img
      class="v-catalog-item__image"
      :src="require('@/assets/images/' + product.image)"
      alt="img"
    />
    <p class="v-catalog-item__name">{{ product.name }}</p>
    <p class="v-catalog-item__price">{{ product.price }} ₽</p>
    <button class="v-catalog-item__card_btn btn" @click="sendDataToParent">
      Add to cart
    </button>
  </div>
</template>

<script>
export default {
  name: "v-catalog-item",
  props: {
    product: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    sendDataToParent() {
      this.$emit("sendDataToParent", this.product.article);
    },
  },
};
</script>

<style lang="scss">
.v-catalog-item {
  flex-basis: 30%;
  box-sizing: border-box;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding * 2;
  margin-bottom: $margin * 4;
  &__image {
    width: 100px;
  }
}
</style>
