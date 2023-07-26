<template>
  <div id="app">
    <header>Добро пожаловать!</header>
    <div>
      <nav
        tabs
        align="center"
      >
        <p>Информационная карточка студентов</p>
        <RouterLink
          class="btn-nav"
          to="/student"
        >
          Студент
        </RouterLink>
        <RouterLink
          class="btn-nav"
          to="/address"
        >
          Адрес
        </RouterLink>
        <!-- <RouterLink
          class="btn-nav"
          to="/curriculum"
        >
          Курс обучения
        </RouterLink>
        <RouterLink
          class="btn-nav"
          to="/contact"
        >
          Контакт
        </RouterLink> -->
      </nav>
      <RouterView />
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
header {
  border-bottom: 1px solid #000;
  font-size: 40px;
  margin-bottom:12px;
}
.btn-nav{
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
.btn-nav:hover{
  background: #1915f7;
  border: 1px;
  border-style: solid;
  border-color: #000;
  color: white;
}
p {
  font-size: 22px;
}
</style>
