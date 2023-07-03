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
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  name: 'v-filters-menu',

  setup() {
    const store = useStore();
    const categories = [
      { name: 'Все', value: 'all' },
      { name: 'Прозрачный', value: 'п' },
      { name: 'Черный', value: 'ж' },
    ];

    const selected = ref('Все');

    const sortByCategories = (option) => {
      store.commit('sortByCategories', option);
      selected.value = option.name;
    };

    return {
      categories,
      selected,
      sortByCategories,
    };
  },
};
</script>

<style lang="scss" scoped>
.v-filters-menu {
  display: flex;
  flex-direction: column;
  width: 22%;
}
@media (max-width: 599px) {
  .v-filters-menu {
    display: none;
    // margin-bottom: $margin * 2;
    // width: 40%;
  }
}
</style>
