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
        @click="selectOption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'v-burger',
  props: {
    options: {
      type: Array,
    },
    selected: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const areOptionsVisible = ref(false);

    const selectOption = (option) => {
      context.emit('select', option);
      areOptionsVisible.value = false;
    };

    return {
      areOptionsVisible,
      selectOption,
    };
  },
};
</script>

<style lang="scss">
.v-burger {
  position: relative;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  &__image {
    border: none;
    margin: 10px;
    display: inline-block;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    background-position: center center;
    width: 25px;
    height: 25px;
    background-image: url('@/assets/icons/burger.svg');
    cursor: pointer;
  }
  &__options {
    border: solid 1px $border_color;
    position: absolute;
    top: 64px;
    right: 0;
    width: 200px;
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
