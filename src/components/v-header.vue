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

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import vBurger from './UI/v-burger.vue';

export default {
  name: 'v-header',
  components: { vBurger },
  setup() {
    const store = useStore();
    const categories = computed(() => store.state.categories);
    const selected = ref('Все');

    const sortByCategories = (option) => {
      store.commit('sortByCategories', option);
      selected.value = option.name;
    };

    return { selected, categories, sortByCategories };
  },
};
</script>

<style lang="scss">
.nav-link:visited {
  color: inherit;
}
.v-header {
  height: 80px;
  box-sizing: border-box;
  border-bottom: 1px solid #e4e4e4;
  &__container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    padding-left: $padding * 2;
    padding-right: $padding * 2;
    &__menu {
      display: flex;
      &__burger {
        display: none;
      }
    }
  }
  &__nav-list {
    display: flex;
    margin: auto;
    list-style: none;
  }
  &__nav-item {
    font-size: 16px;
    line-height: 1;
    &:not(:last-child) {
      margin-right: 50px;
    }
    &:hover {
      color: #0c625a;
    }
    &:active {
      color: #08443e;
    }
  }
  &__icon {
    width: 30px;
  }
  &__icon {
    border: none;
    margin: 10px;
    display: inline-block;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    background-position: center center;
    width: 25px;
    height: 25px;
    background-image: url('@/assets/icons/cart.svg');
    cursor: pointer;
  }
}
@media (max-width: 599px) {
  .v-header__container__menu__burger {
    display: block;
  }
}
</style>
