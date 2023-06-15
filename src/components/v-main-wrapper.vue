<template>
  <div class="v-main-wrapper">
    <v-catalog />
    <v-cart />
  </div>
</template>

<script>
import vCatalog from "./v-catalog.vue";
import vCart from "./v-cart.vue";

export default {
  name: "v-name-wrapper",
  components: { vCart, vCatalog },
  props: {},
  data() {
    return {
      title: "Main wrapper",
    };
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {},
};
</script>

<style>
.v-main-wrapper {
  max-width: 900px;
  margin: 0 auto;
}
</style>
