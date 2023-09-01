<template>
  <input
    :value="value"
    class="input-filter"
    placeholder="Поиск..."
    @input="setValue"
  >
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },

  methods: {
    setValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
.input-filter{
  border: 1px solid black;
  border-radius: 10px;
  height: 25px;
  margin-right: 15px;
  max-width: 300px;
  width: 100%;
  margin-bottom: 5px;
}
</style>
