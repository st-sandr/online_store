<template>
  <div class="v-main-wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'v-name-wrapper',
};
</script>

<style>
.v-main-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
