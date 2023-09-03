<template>
  <div
    :key="customKey"
    class="block-group"
    :class="{disabled: disabled}"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    customKey: {
      type: String,
      default: null
    },

    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.block-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
  font-size: 14px;
}
.disabled{
    pointer-events: none;
    opacity: 0.4;
  }
</style>
