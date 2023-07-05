<template>
  <header class="v-header">
    <div class="v-header__container">
      <nav>
        <ul class="v-header__nav-list">
          <!-- <li class="v-header__nav-item">
            <a href="" class="nav-link">Главная</a>
          </li> -->
          <li class="v-header__nav-item">
            <router-link :to="{ name: 'catalog' }" class="nav-link"
              >Каталог</router-link
            >
          </li>
        </ul>
      </nav>
      <div class="v-header__container__menu">
        <router-link :to="{ name: 'cart' }" class="nav-link"
          ><button class="v-header__icon"></button
        ></router-link>
        <v-burger
          class="v-header__container__menu__burger"
          :options="categories"
          :selected="selected"
          @select="sortByCategories"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import vBurger from './UI/v-burger.vue';

const store = useStore();
const categories = computed(() => store.state.categories);
const selected = ref('Все');

const sortByCategories = (option) => {
  store.commit('sortByCategories', option);
  selected.value = option.name;
};
</script>

<style lang="scss" scoped>
@import '/src/assets/styles/components/v-header.scss';
</style>
