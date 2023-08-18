<template>
  <div id="app">
    <header class="header">
      Добро пожаловать!
    </header>
    <div class="body">
      <p class="table-title">
        Информационная карточка студентов
      </p>
      <nav class="navigation">
        <RouterLink
          class="button-nav"
          to="/student"
        >
          Студент
        </RouterLink>
        <RouterLink
          class="button-nav"
          to="/address"
        >
          Адрес
        </RouterLink>
        <!-- <RouterLink
          class="button-nav"
          to="/curriculum"
        >
          Курс обучения
        </RouterLink> -->
        <!-- <RouterLink
          class="button-nav"
          to="/contact"
        >
          Контакт
        </RouterLink> -->
      </nav>
      <RouterView class="wrapper" />
    </div>
  </div>
</template>

<script>
export default {
  // mounted() {
  //   document.title = "student";
  // }
};
</script>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid #000;
  font-size: 40px;
  margin-bottom:12px;
}
.body{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .table-title {
    font-size: 22px;
  }

  .navigation{
    display: flex;

    .button-nav{
      background-color: #87CEEB;
      border: 1px;
      border-style: solid;
      border-radius: 7px;
      box-sizing: border-box;
      color: black;
      font-size: 20px;
      margin: 10px;
      padding: 7px;
      text-align: center;
      text-decoration: none;
    }
    .button-nav:hover{
      background: #1915f7;
      border: 1px;
      border-style: solid;
      border-color: #000;
      color: white;
    }
  }
  .wrapper{
    text-align: -webkit-center;
  }
}
</style>
