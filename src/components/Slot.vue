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
  .button {
    background-color: #87CEEB;
    border: 1px;
    border-style: solid;
    border-radius: 7px;
    box-sizing: border-box;
    color: black;
    text-align: center;
    height: 25px;
    margin: 1px;
  }
  .button:hover {
    background: #1915f7;
    border: 1px;
    border-style: solid;
    border-color: #000;
    color: white;
  }
  .button-option{
    align-self: center;
  }


//   .table, .table *{
//     background: white;
//     border: 1px solid black;
//     border-collapse: collapse;
//     margin-top: 7px;
//   }
//   .table {
//     background: white;
//     border-collapse: collapse;
//     border-color: gray;
//     font-family: sans-serif;
//     font-size: 14px;
//     margin-top: 7px;
//   }
//   .table-head {
//     border-color: gray;
//     border-style: solid;
//     border-width: 1px;
//     text-align: center;
//     font-size: 16px;
//     padding: 5px;
//   }
//   td {
//     background: white;
//     border-color: lightgray;
//     border-style: solid;
//     border-width: 1px;
//     font-size: 15px;
//     padding: 5px;
//     text-align: left;
//   }
}
</style>