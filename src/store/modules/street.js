import StreetClient from "@/API/streetClient.js";

import _ from "lodash";

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
    },

    mapedStreets(state) {
      return _.map(state.streets, street => ({
        display: street.street,
        value: street.id
      }));
    }
  }
};
