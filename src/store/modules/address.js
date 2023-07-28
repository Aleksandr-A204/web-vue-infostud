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

    keywordSearch(state) {
      return state.keywordSearch;
    }
  }
};