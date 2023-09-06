import FacultyClient from "@/API/facultyClient.js";

import _ from "lodash";

const facultyClient = new FacultyClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    faculties: []
  },

  mutations: {
    setFacultyData(state, allFaculties) {
      state.faculties = allFaculties;
    }
  },

  actions: {
    async getFacultyData({ commit }) {
      const faculties = await facultyClient.getFacultyData();

      commit("setFacultyData", faculties);
    }
  },

  getters: {
    faculties(state) {
      return state.faculties;
    },

    mapedFaculties(state) {
      return _.map(state.faculties, faculty => ({
        display: faculty.faculty,
        value: faculty.id
      }));
    }
  }
};
