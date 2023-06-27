<template>
  <div class="v-accordion">
    <p class="title" @click="areOptionsVisible = !areOptionsVisible">
      {{ selected }}
    </p>
    <div class="options" v-if="areOptionsVisible">
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

<style lang="scss" scoped>
.v-accordion {
  position: relative;
  width: 100%;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
}
.title {
  border: solid 1px #e4e4e4;
  padding: $padding $padding * 2;
}
.v-accordion p {
  margin: 0;
}
.options {
  border: solid 1px #e4e4e4;
  position: absolute;
  top: 40px;
  right: 0;
  width: 100%;
  padding: $padding $padding * 2;
  &__element {
    padding: $padding;
    border-radius: 5px;
    &:hover {
      background: #e0e0e0;
    }
    &:active {
      background: #d3d0d0;
    }
  }
}
</style>
