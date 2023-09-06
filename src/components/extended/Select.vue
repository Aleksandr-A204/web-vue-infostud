<template>
  <select
    class="select"
    @input="event => $emit('input', event.target.value)"
  >
    <option
      selected
      hidden
    >
      {{ customLabel }}
    </option>
    <option
      v-for="(option, index) of options"
      :key="index"
      :value="trackBy ? option[trackBy] : option"
    >
      {{ label ? option[label] : option }}
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

    label: {
      type: String,
      default: null
    },

    trackBy: {
      type: String,
      default: null
    },

    value: {
      type: [String, Object, Number],
      default: null
    }
  },

  computed: {
    selected() {
      if (this.trackBy) {
        return _.find(this.options, { value: Number(this.value) });
      }
      return this.value;
    },

    customLabel() {
      if (this.trackBy) {
        return _.get(this.selected, this.label);
      }
      return this.value;
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
