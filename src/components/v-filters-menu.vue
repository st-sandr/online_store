<template>
  <div class="v-filters-menu">
    <v-select
      :options="categories"
      :selected="selected"
      @select="sortByCategories"
    />
  </div>
</template>

<script>
import vSelect from './v-select.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'v-filters-menu',
  components: {
    vSelect,
  },
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
    ...mapActions(['SORT_BY_CATEGORIES']),
    sortByCategories(option) {
      this.SORT_BY_CATEGORIES(option);
      this.selected = option.name;
    },
  },
  computed: {
    ...mapGetters(['PRODUCTS', 'SORTED_PRODUCTS']),
    filteredProducts() {
      if (this.SORTED_PRODUCTS.length) {
        return this.SORTED_PRODUCTS;
      } else {
        return this.PRODUCTS;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-filters-menu {
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-right: 50px;
}
</style>
