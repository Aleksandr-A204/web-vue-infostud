import SpecialityClient from "@/API/specialityClient.js";

const specialityClient = new SpecialityClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    specialities: []
  },

  mutations: {
    updateSpecialityData(state, allSpecialities) {
      state.specialities = allSpecialities;
    }
  },

  actions: {
    async getSpecialityData({ commit }) {
      const specialities = await specialityClient.getSpecialityData();

      commit("updateSpecialityData", specialities);
    }
  },

  getters: {
    specialities(state) {
      return state.specialities;
    }
  }
};