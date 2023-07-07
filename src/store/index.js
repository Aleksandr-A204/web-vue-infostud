import addressModule from "./modules/address.js";
import contactModule from "./modules/contact.js";
import curriculumModule from "./modules/curriculum.js";
import studentModule from "./modules/student.js";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    addressModule,
    contactModule,
    curriculumModule,
    studentModule
  }
});