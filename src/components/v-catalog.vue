<template>
  <div class="v-catalog">
    <div class="v-catalog__filters">
      <v-filters-menu />
      <div class="v-catalog__list">
        <v-catalog-item
          v-for="product in filteredProducts"
          :key="product.article"
          :product="product"
          @addToCart="addToCart"
        />
      </div>
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
  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex: 1 1 auto;
  }
  &__filters {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
  }
}
</style>
