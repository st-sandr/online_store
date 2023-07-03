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
import { ref, computed } from 'vue';

export default {
  name: 'v-filters-menu',

  setup() {
    const store = useStore();
    const categories = computed(() => store.state.categories);
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
  }
}
</style>
