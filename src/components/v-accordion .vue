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
        class="options__element"
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
export default {
  name: 'v-accordion ',
  props: {
    options: {
      type: Array,
    },
    selected: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      areOptionsVisible: true,
    };
  },
  methods: {
    selectOption(option) {
      this.$emit('select', option);
    },
    hideSelect() {
      this.areOptionsVisible = false;
    },
  },
};
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
    padding: $padding $padding * 2;
  }
  &__options {
    border: solid 1px $border_color;
    position: absolute;
    top: 40px;
    right: 0;
    width: 100%;
    padding: $padding $padding * 2;
    background-color: white;
    &__element {
      margin: 0;
      padding: $padding;
      border-radius: 5px;
      &:hover {
        background: $is_hover;
      }
      &:active {
        background: $is_activ;
      }
    }
  }
}
</style>
