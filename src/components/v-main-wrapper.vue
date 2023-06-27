<template>
  <div class="v-main-wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'v-name-wrapper',
  props: {},
  data() {
    return {
      title: 'Main wrapper',
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
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
