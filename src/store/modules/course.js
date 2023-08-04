import CourseClient from "@/API/courseClient.js";

const courseClient = new CourseClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    courses: []
  },

  mutations: {
    updateCourseData(state, allCourses) {
      state.courses = allCourses;
    }
  },

  actions: {
    async getCourseData({ commit }) {
      const courses = await courseClient.getCourseData();

      commit("updateCourseData", courses);
    }
  },

  getters: {
    courses(state) {
      return state.courses;
    }
  }
};