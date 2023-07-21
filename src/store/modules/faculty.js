import FacultyClient from "@/API/facultyClient.js";

const facultyClient = new FacultyClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    faculties: []
  },

  mutations: {
    updateFacultyData(state, allFaculties) {
      state.faculties = allFaculties;
    }
  },

  actions: {
    async getFacultyData({ commit }) {
      const faculties = await facultyClient.getFacultyData();

      commit("updateFacultyData", faculties);
    }
  },

  getters: {
    faculties(state) {
      return state.faculties;
    }
  }
};