import CityClient from "@/API/cityClient.js";

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
    }
  }
};