<template>
  <i
    :class="stringFormat()"
    @click="$emit('click')"
  />
</template>

<script>
export default {
  props: {
    iconstyle: {
      type: String,
      default: "regular"
    },

    icon: {
      type: String,
      required: true
    },

    animation: {
      type: String,
      default: null
    },

    size: {
      type: String,
      default: null
    }
  },

  methods: {
    stringFormat() {
      let str = `fa-${this.iconstyle} fa-${this.icon}`;

      if (this.animation) {
        str += ` fa-${this.animation}`;
      }
      if (this.size) {
        str += ` fa-${this.size}`;
      }
      return str;
    }
  }
};
</script>

<style scoped>
  .fa-xmark:hover{
    cursor: pointer;
  }
</style>
