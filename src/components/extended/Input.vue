<template>
  <input
    :value="value"
    type="text"
    class="input"
    @input="event => $emit('input', event.target.value)"
  >
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    }
  }
};
</script>

<style scoped>
.input {
  height: 28px;
  min-width: 308px;
  border: 1px solid #959292;
  border-radius: 5px;
  padding: 0px 5px 0px 5px;
  text-align: left;
}
</style>
