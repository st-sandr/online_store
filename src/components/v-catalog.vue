<template>
  <div class="v-catalog">
    <h1>Catalog</h1>
    <v-select
      :options="categories"
      :selected="selected"
      @select="sortByCategories"
    />
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
import vSelect from './v-select.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'v-catalog',
  components: {
    vCatalogItem,
    vSelect,
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
      sortedProducts: [],
    };
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API', 'ADD_TO_CART']),
    addToCart(data) {
      this.ADD_TO_CART(data);
    },
    sortByCategories(option) {
      this.sortedProducts = [];
      this.PRODUCTS.map((item) => {
        if (item.category === option.name) {
          this.sortedProducts.push(item);
        }
      });
      this.selected = option.name;
    },
  },
  computed: {
    ...mapGetters(['PRODUCTS', 'CART']),
    filteredProducts() {
      if (this.sortedProducts.length) {
        return this.sortedProducts;
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
    margin-top: 20px;
  }
}
</style>
