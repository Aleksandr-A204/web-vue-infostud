<template>
  <div class="main-layout">
    <header class="header">
      Добро пожаловать!
    </header>
    <div class="main">
      <p class="table-title">
        Информационная карточка студентов
      </p>
      <nav class="navigation">
        <RouterLink
          v-for="link in links"
          :key="link.url"
          class="button-nav"
          :to="link.url"
          :exact="link.exact"
        >
          {{ link.context }}
        </RouterLink>
      </nav>
      <RouterView class="wrapper" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { context: "Студент", url: "/students", exact: true },
        { context: "Адрес", url: "/addresses" },
        { context: "Курс обучения", url: "/curriculums" }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid #000;
  font-size: 40px;
  margin-bottom:12px;
}
.main{
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
