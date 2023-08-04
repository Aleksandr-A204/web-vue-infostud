<template>
  <div
    class="wrapper"
    tabs
    align="center"
  >
    <slot />
  </div>
</template>

<script>
export default {

};
</script>

<style scoped lang="scss">
.wrapper{
  margin: 20px;

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

  @import "../assets/button.css";

  .table {
    border-collapse: collapse;
    margin-top: 7px;
    background: #ceeff3;
    border: 15px solid #ceeff3;

    &__head-cell, &__body-cell{
      border-right: 1px solid #b5b5b582;
      border-bottom: 1px solid #b5b5b582;
      padding: 4px;
    }
  }
}
</style>