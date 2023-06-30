import studentModule from "./modules/studentModule.js";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    studentModule
  }
});