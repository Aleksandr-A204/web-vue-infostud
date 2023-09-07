<template>
  <Multiselect
    :show-labels="false"
    :allow-empty="false"
    :placeholder="null"
    :options="options"
    :label="label"
    :track-by="trackBy"
    :value="selected"
    @input="value => $emit('input', trackBy ? value[trackBy] : value)"
  />
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

import _ from "lodash";

export default {
  components: {
    Multiselect
  },

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
    }
  }
};
</script>

<style scoped lang="scss">
.multiselect{
  width: 320px;
}
</style>
