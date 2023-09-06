import CityClient from "@/API/cityClient.js";

import _ from "lodash";

const cityClient = new CityClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    cities: []
  },

  mutations: {
    updateCityData(state, allCities) {
      state.cities = allCities;
    }
  },

  actions: {
    async getCityData({ commit }) {
      const cities = await cityClient.getCityData();

      commit("updateCityData", cities);
    }
  },

  getters: {
    cities(state) {
      return state.cities;
    },

    mapedCities(state) {
      return _.map(state.cities, city => ({
        display: city.city,
        value: city.id
      }));
    }
  }
};
