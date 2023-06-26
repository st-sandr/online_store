<template>
  <div class="v-catalog">
    <v-filters-menu class="v-catalog__filters" />
    <div class="v-catalog__list">
      <v-catalog-item
        v-for="product in filteredProducts"
        :key="product.article"
        :product="product"
        @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import vCatalogItem from './v-catalog-item.vue';
import vFiltersMenu from './v-filters-menu.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'v-catalog',
  components: {
    vCatalogItem,
    vFiltersMenu,
  },
  props: {},
  data() {
    return {
      categories: [
        { name: 'Все', value: 'all' },
        { name: 'Мужские', value: 'м' },
        { name: 'Женские', value: 'ж' },
      ],
      selected: 'Все',
      page: 1,
      limit: 9,
    };
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API', 'ADD_TO_CART']),
    addToCart(data) {
      this.ADD_TO_CART(data);
    },
  },
  computed: {
    ...mapGetters(['PRODUCTS', 'CART', 'SORTED_PRODUCTS']),
    filteredProducts() {
      if (this.SORTED_PRODUCTS.length) {
        return this.SORTED_PRODUCTS;
      } else {
        return this.PRODUCTS;
      }
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API();
  },
};
</script>

<style lang="scss">
.v-catalog {
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
  &__list {
    display: flex;
    flex-wrap: wrap;
    width: 75%;
  }
  &__filters {
    width: 20%;
  }
}
</style>
