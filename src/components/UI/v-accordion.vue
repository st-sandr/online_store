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
.v-accordion {
  position: relative;
  width: 100%;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  &__title {
    border: solid 1px $border_color;
    padding: $padding * 2 $padding * 4;
  }
  &__options {
    border: solid 1px $border_color;
    position: absolute;
    top: 40px;
    right: 0;
    width: 100%;
    padding: $padding * 2 $padding * 4;
    background-color: white;
    &__element {
      margin: 0;
      padding: $padding * 2;
      border-radius: 5px;
      &:hover {
        color: white;
        background: $is_hover;
      }
      &:active {
        color: white;
        background: $is_activ;
      }
    }
  }
}
</style>
