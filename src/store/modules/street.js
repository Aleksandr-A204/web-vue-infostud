import StreetClient from "@/API/streetClient.js";

const streetClient = new StreetClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    streets: []
  },

  mutations: {
    updateStreetData(state, allStreets) {
      state.streets = allStreets;
    }
  },

  actions: {
    async getStreetData({ commit }) {
      const streets = await streetClient.getStreetData();

      commit("updateStreetData", streets);
    }
  },

  getters: {
    streets(state) {
      return state.streets;
    }
  }
};