<template>
  <div id="app">
    <header>Welcome to the site!</header>
    <div class="div-alig">
      <p>Student information card</p>
      <!-- <StudentComp />
      <AddressComp /> -->
      <nav class="navbar">
        <ul class="navbar-nav">
          <li class="nav-item m-1">
            <RouterLink
              class="btn"
              to="/studinfo"
            >
              StudInfo
            </RouterLink>
          </li>
          <li class="nav-item m-1">
            <RouterLink
              class="btn"
              to="/student"
            >
              Student
            </RouterLink>
          </li>
          <li class="nav-item m-1">
            <RouterLink
              class="btn"
              to="/address"
            >
              Address
            </RouterLink>
          </li>
          <li class="nav-item m-1">
            <RouterLink
              class="btn"
              to="/curriculum"
            >
              Curriculum
            </RouterLink>
          </li>
          <li class="nav-item m-1">
            <RouterLink
              class="btn"
              to="/contact"
            >
              Contact
            </RouterLink>
          </li>
        </ul>
      </nav>
      <RouterView />
    </div>
    <!-- <AddressComp />
    <ContactComp />
    <CurriculumComp />
    <StudentComp /> -->
  </div>
</template>

<script>
// import AddressComp from "./components/AddressComp.vue";
// import ContactComp from "./components/ContactComp.vue";
// import CurriculumComp from "./components/CurriculumComp.vue";
// import StudentComp from "./components/StudentComp.vue";

export default {
  components: {
    // AddressComp,
    // ContactComp,
    // CurriculumComp,
    // StudentComp
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style>
header {
  border-bottom: 1px solid #000;
  font-size: 40px;
  margin-bottom:12px;
}
.div-alig {
  text-align: center;
}
p {
  font-size: 22px;
}
</style>
