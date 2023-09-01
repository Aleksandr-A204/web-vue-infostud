<template>
  <div
    :key="customKey"
    class="block-group"
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
</style>
