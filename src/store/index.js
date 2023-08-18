import addressModule from "./modules/address.js";
import cityModule from "./modules/city.js";
import courseModule from "./modules/course.js";
import curriculumModule from "./modules/curriculum.js";
import facultyModule from "./modules/faculty.js";
import groupModule from "./modules/group.js";
import postindexModule from "./modules/postindex.js";
import specialityModule from "./modules/speciality.js";
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
    curriculumModule,
    studentModule,
    facultyModule,
    specialityModule,
    courseModule,
    groupModule
  }
});