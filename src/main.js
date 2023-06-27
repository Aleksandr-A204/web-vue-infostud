import App from "./App.vue";
import ClickOutside from "v-click-outside";
import router from "./routes/routes.js";
import Vue from "vue";
import "material-design-icons-iconfont";

Vue.config.productionTip = false;

Vue.use(ClickOutside);

export default new Vue({
  router,
  render: h => h(App)
}).$mount("#app");