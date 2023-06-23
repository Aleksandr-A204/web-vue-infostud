<template>
  <div id="app">
    <header>Welcome to the site!</header>
    <div>
      <nav
        tabs
        align="center"
      >
        <p>Student information card</p>
        <RouterLink
          class="btn-nav"
          to="/home"
        >
          Home
        </RouterLink>
        <RouterLink
          class="btn-nav"
          to="/student"
        >
          Student
        </RouterLink>
        <RouterLink
          class="btn-nav"
          to="/address"
        >
          Address
        </RouterLink>
        <RouterLink
          class="btn-nav"
          to="/curriculum"
        >
          Curriculum
        </RouterLink>
        <RouterLink
          class="btn-nav"
          to="/contact"
        >
          Contact
        </RouterLink>
      </nav>
      <RouterView />
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
    };
  },
  methods: {
  }
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
