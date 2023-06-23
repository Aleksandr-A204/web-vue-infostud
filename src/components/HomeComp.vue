<template>
  <div class="v-home">
    <div class="v-home__header">
      <span>Home name</span>
      <span>
        <i class="material-icons">close</i>
      </span>
    </div>
    <div class="v-home__content">
      <slot />
    </div>
    <div class="v-home__footer">
      <button class="close_modal">
        Close
      </button>
      <button class="btn">
        Create student
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "VHome",
  props: {},
  data() {
    return {
    };
  },
  computed: {

  }
};
</script>

<style lang="scss">
.v-home{
    padding: 16px;
    &__header, &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    };
    &__content {
        display: flex;
        justify-content: center;
        align-items: center;
    };
    .btn {
        padding: 8px;
        color: white;
        background: #26ae68;
    }
    .close_modal {
        padding: 8px;
        color: white;
        background: red;
    }
}
</style>
