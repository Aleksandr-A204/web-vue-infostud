<template>
  <button
    class="button"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot>
      <Icon :icon="icon" />
    </slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    icon: {
      type: String,
      default: null
    }
  }
};
</script>

<style scoped lang="scss">
.button {
  background-color: #87CEEB;
  border: 1px solid;
  border-radius: 7px;
  box-sizing: border-box;
  color: black;
  text-align: center;
  height: 25px;

  &:disabled {
    pointer-events: none;
    opacity: 0.4;
  }

  &:hover {
    background: #1915f7;
    border: 1px solid black;
    color: white;
    cursor: pointer;
  }
}
</style>
