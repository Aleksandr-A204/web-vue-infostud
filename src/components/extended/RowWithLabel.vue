<template>
  <div
    class="block-group"
    :class="{disabled: disabled}"
  >
    <label class="form-label">{{ label }}</label>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },

    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.block-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
  font-size: 14px;

  .form-label{
    margin-right: 2px;
  }
}
.disabled{
  pointer-events: none;
  opacity: 0.4;
}

</style>
