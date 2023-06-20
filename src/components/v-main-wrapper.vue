<template>
  <div class="v-main-wrapper">
    <!-- <v-catalog />
    <v-cart v-if="CART.length" :cart_data="CART" /> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import vCatalog from './v-catalog.vue';
// import vCart from './v-cart.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'v-name-wrapper',
  // components: { vCart, vCatalog },
  props: {},
  data() {
    return {
      title: 'Main wrapper',
    };
  },
  computed: {
    ...mapGetters(['CART']),
  },
  methods: {},
  watch: {},
  mounted() {},
};
</script>

<style>
.v-main-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
