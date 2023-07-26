import _ from "lodash";
import AddressClient from "@/API/addressClient";

const addressClient = new AddressClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    addresses: [],
    city: null,
    street: null,
    keywordSearch: ""
  },

  mutations: {
    updateAddressData(state, allAddresses) {
      state.addresses = allAddresses;
    },

    updateCity(state, value) {
      state.city = value;
    },

    updateStreet(state, value) {
      state.street = value;
    },

    updateKeywordSearch(state, keywordSearch) {
      state.keywordSearch = keywordSearch;
    }
  },

  actions: {
    async getAddressData({ commit }) {
      const addresses = await addressClient.getAddresses();

      commit("updateAddressData", addresses);
    },

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

    setCity({ commit }, value) {
      commit("updateCity", value);
    },

    setStreet({ commit }, value) {
      commit("updateStreet", value);
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
    addresses(state) {
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
    },

    cities(state) {
      return _.uniqBy(_.map(state.addresses, "City"), "City");
    },

    getCity(state) {
      return state.city;
    },

    getStreet(state) {
      return state.street;
    },

    postindexes(state) {
      if (state.street) {
        return _.uniqBy(_.map(_.filter(state.addresses, { City: { City: state.city }, Street: { Street: state.street } }), "Postindex"), "PostIndex");
      }
      else {
        return _.uniqBy(_.map(state.addresses, "Postindex"), "PostIndex");
      }
    },

    streets(state) {
      if (state.city) {
        return _.uniqBy(_.map(_.filter(state.addresses, { City: { City: state.city } }), "Street"), "Street");
      }
      else {
        return _.uniqBy(_.map(state.addresses, "Street"), "Street");
      }
    },

    keywordSearch(state) {
      return state.keywordSearch;
    }
  }
};