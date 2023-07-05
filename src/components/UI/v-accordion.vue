<template>
  <div class="v-accordion">
    <p
      class="v-accordion__title"
      @click="areOptionsVisible = !areOptionsVisible"
    >
      {{ selected }}
    </p>
    <div class="v-accordion__options" v-if="areOptionsVisible">
      <p
        class="v-accordion__options__element"
        v-for="option in options"
        :key="option.value"
        @click="emit('select', option)"
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
  selected: {
    type: String,
    default: '',
  },
});

const areOptionsVisible = ref(true);

const emit = defineEmits(['select']);
</script>

<style lang="scss">
@import '/src/assets/styles/components/UI/v-accordion.scss';
</style>
