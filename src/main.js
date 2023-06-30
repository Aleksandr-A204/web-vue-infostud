import App from "./App.vue";
import ClickOutside from "v-click-outside";
import router from "./routes/routes.js";
import store from "./store/index.js";
import Vue from "vue";
import "material-design-icons-iconfont";

Vue.config.productionTip = false;

Vue.use(ClickOutside);

export default new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");