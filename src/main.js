import App from "./App.vue";
import ClickOutside from "v-click-outside";
import router from "./route/routes.js";
import store from "./store/index.js";
import Vue from "vue";
import "material-design-icons-iconfont";

import "./assets/scss/fonts.scss";

import components from "@/components/extended/components.js";

Vue.config.productionTip = false;

Vue.use(ClickOutside);
Vue.use(components);

export default new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
