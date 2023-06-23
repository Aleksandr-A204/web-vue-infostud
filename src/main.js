import App from "./App.vue";
import router from "./routes/routes.js";
import Vue from "vue";
import "material-design-icons-iconfont";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");