<template>
  <header class="v-header">
    <div class="v-header__container">
      <nav>
        <ul class="v-header__nav-list">
          <li class="v-header__nav-item">
            <a href="" class="nav-link">Главная</a>
          </li>
          <li class="v-header__nav-item">
            <a href="" class="nav-link">Каталог</a>
          </li>
        </ul>
      </nav>
      <router-link :to="{ name: 'cart', params: { cart_data: CART } }"
        ><span class="v-header__icon"><div></div></span
      ></router-link>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'v-navbar',
  computed: {
    ...mapGetters(['CART']),
  },
};
</script>

<style lang="scss">
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
    padding-left: 15px;
    padding-right: 15px;
  }
  &__nav-list {
    display: flex;
    margin: auto;
    list-style: none;
  }
  &__nav-item {
    font-size: 15px;
    line-height: 1;
  }
  &__nav-item:not(:last-child) {
    margin-right: 50px;
  }
  &__icon {
    width: 30px;
  }
  &__icon {
    display: inline-block;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    background-position: center center;
    width: 25px;
    height: 25px;
    background-image: url('@/assets/icons/cart.svg');
  }
}
</style>
