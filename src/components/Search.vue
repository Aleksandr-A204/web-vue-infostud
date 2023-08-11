<template>
  <div>
    <input
      :value="value"
      class="input-filter"
      placeholder="Поиск"
      @input="setKeyword"
    >
    <slot />
  </div>
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
    setKeyword(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
.input-filter{
  border: 1px;
  border-radius: 10px;
  border-style: solid;
  border-color: black;
  height: 25px;
  margin-right: 15px;
  max-width: 300px;
  width: 100%;
}
</style>