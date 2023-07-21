import _ from "lodash";
import AddressClient from "@/API/addressClient";

const addressClient = new AddressClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    addresses: [],
    keywordSearch: ""
  },

  mutations: {
    updateAddressData(state, allAddresses) {
      state.addresses = allAddresses;
    },

    updateKeywordSearch(state, keywordSearch) {
      state.keywordSearch = keywordSearch;
    }
  },

  actions: {
    async createAddress({ commit }, objectAddress) {
      const addresses = await addressClient.createAddress(objectAddress);

      commit("updateAddressData", addresses);
    },

    async deleteAddress({ commit }, addressId) {
      try {
        const addresses = await addressClient.deleteAddress(addressId);

        commit("updateAddressData", addresses);
      }
      catch (err) {
        console.log(err);
        alert("Невозможно удалить.");
      }
    },

    async getAddressData({ commit }) {
      const addresses = await addressClient.getAddresses();

      commit("updateAddressData", addresses);
    },

    keywordSearch({ commit }, keywordSearch) {
      commit("updateKeywordSearch", keywordSearch);
    },

    async updateAddress({ commit }, objectAddress) {
      const addresses = await addressClient.updateAddress(objectAddress);

      commit("updateAddressData", addresses);
    }
  },

  getters: {
    // cities(state){
    //   return _.map(state.addresses, "City");
    // },

    // postindexes(state){
    //   return state.;
    // },

    // streets(state){
    //   return state.;
    // },

    keywordSearch(state) {
      return state.keywordSearch;
    },

    addresses(state) {
      console.log(_.map(state.addresses, "City"));
      const wordInLowerCase = state.keywordSearch.toLowerCase();
      if (wordInLowerCase === "") {
        return state.addresses;
      }
      else {
        return state.addresses.filter(a => {
          return a.City.City?.toLowerCase().includes(wordInLowerCase)
          || a.Postindex.Postindex?.toLowerCase().includes(wordInLowerCase)
          || a.Street.Street?.toLowerCase().includes(wordInLowerCase);
        });
      }
    }
  }
};