<template>
  <div class="v-burger">
    <span
      class="v-burger__image"
      @click="areOptionsVisible = !areOptionsVisible"
    >
    </span>
    <div class="v-burger__options" v-if="areOptionsVisible">
      <p
        class="v-burger__options__element"
        v-for="option in options"
        :key="option.value"
        @click="emit('select', option), closeList()"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  options: {
    type: Array,
  },
});

const areOptionsVisible = ref(false);

const closeList = () => {
  areOptionsVisible.value = false;
};

const emit = defineEmits(['select']);
</script>

<style lang="scss">
@import '/src/assets/styles/components/UI/v-burger.scss';
</style>
