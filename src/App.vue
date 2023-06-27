<template>
  <v-header class="container" />
  <v-main-wrapper />
</template>

<script>
import vMainWrapper from './components/v-main-wrapper.vue';
import vHeader from './components/v-header.vue';
export default {
  name: 'app',
  components: {
    vMainWrapper,
    vHeader,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
</style>
