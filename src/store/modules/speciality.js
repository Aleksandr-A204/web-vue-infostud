import SpecialityClient from "@/API/specialityClient.js";

import _ from "lodash";

const specialityClient = new SpecialityClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    specialities: []
  },

  mutations: {
    setSpecialityData(state, allSpecialities) {
      state.specialities = allSpecialities;
    }
  },

  actions: {
    async getSpecialityData({ commit }) {
      const specialities = await specialityClient.getSpecialityData();

      commit("setSpecialityData", specialities);
    }
  },

  getters: {
    specialities(state) {
      return state.specialities;
    },

    mapedSpecialities(state) {
      return _.map(state.specialities, speciality => ({
        display: speciality.speciality,
        value: speciality.id })
      );
    }
  }
};
