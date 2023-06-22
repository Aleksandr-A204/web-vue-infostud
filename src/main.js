import App from "./App.vue";
import router from "./routes/routes.js";
import Vue from "vue";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");