<template>
  <div class="v-filters-menu">
    <v-accordion
      :options="categories"
      :selected="selected"
      @select="sortByCategories"
    />
  </div>
</template>

<script>
import vAccordion from './v-accordion .vue';
import { mapActions } from 'vuex';

export default {
  name: 'v-filters-menu',
  components: {
    vAccordion,
  },
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
    ...mapActions(['SORT_BY_CATEGORIES']),
    sortByCategories(option) {
      this.SORT_BY_CATEGORIES(option);
      this.selected = option.name;
      this.$emit('change_category');
    },
  },
};
</script>

<style lang="scss" scoped>
.v-filters-menu {
  display: flex;
  flex-direction: column;
  width: 22%;
}
</style>
