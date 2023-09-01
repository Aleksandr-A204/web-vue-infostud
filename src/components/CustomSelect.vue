<template>
  <select
    class="select"
    :value="value"
    @input="event => $emit('input', event)"
  >
    <option
      selected
      hidden
    >
      {{ value }}
    </option>
    <option
      v-for="(option, index) of options"
      :key="index"
      class="option"
      :value="isId ? option.id : option"
    >
      {{ isId ? getValue(option) : option }}
    </option>
  </select>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    options: {
      type: Array,
      required: true
    },

    isId: {
      type: Boolean,
      default: false
    },

    value: {
      type: String,
      default: null
    },

    property: {
      type: String,
      default: null
    }
  },

  methods: {
    getValue(option) {
      return _.get(option, this.property);
    }
  }
};
</script>

<style scoped lang="scss">
.select{
  width: 320px;
  height: 30px;
  border: 1px solid #959292;
  border-radius: 5px;
  text-align: left;

  &:focus{
    border-end-end-radius: 0;
    border-end-start-radius: 0;
  }
}
</style>
