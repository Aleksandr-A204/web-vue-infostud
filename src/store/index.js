import addressModule from "./modules/address.js";
import cityModule from "./modules/city.js";
import contactModule from "./modules/contact.js";
import curriculumModule from "./modules/curriculum.js";
import postindexModule from "./modules/postindex.js";
import streetModule from "./modules/street.js";
import studentModule from "./modules/student.js";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    addressModule,
    cityModule,
    postindexModule,
    streetModule,
    contactModule,
    curriculumModule,
    studentModule
  }
});