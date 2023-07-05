<template>
  <div class="v-filters-menu">
    <v-accordion
      :options="categories"
      :selected="selected"
      @select="sortByCategories"
    />
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import vAccordion from '@/components/UI/v-accordion.vue';

const store = useStore();
const categories = computed(() => store.state.categories);
const selected = ref('Все');

const sortByCategories = (option) => {
  store.commit('sortByCategories', option);
  selected.value = option;
};
</script>

<style lang="scss" scoped>
@import '/src/assets/styles/components/v-filters-menu.scss';
</style>
