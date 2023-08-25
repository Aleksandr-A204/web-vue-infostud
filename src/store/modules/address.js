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
    async getAddressData({ commit, state }, column) {
      const addresses = await addressClient.getAddresses(state.keywordSearch, column);

      commit("updateAddressData", addresses);
    },

    async createAddress({ commit, state }, address) {
      await addressClient.createAddress(address);

      const addresses = await addressClient.getAddresses(state.keywordSearch);
      commit("updateAddressData", addresses);
    },

    async deleteAddress({ commit, state }, addressId) {
      await addressClient.deleteAddress(addressId);

      const addresses = await addressClient.getAddresses(state.keywordSearch);
      commit("updateAddressData", addresses);
    },

    async keywordSearch({ commit }, keywordSearch) {
      commit("updateKeywordSearch", keywordSearch);

      const addresses = await addressClient.getAddresses(keywordSearch);
      commit("updateAddressData", addresses);
    },

    async editeAddress({ commit, state }, address) {
      await addressClient.editeAddress(address);

      const addresses = await addressClient.getAddresses(state.keywordSearch);
      commit("updateAddressData", addresses);
    }
  },

  getters: {
    addresses(state) {
      return state.addresses;
    },

    keywordSearch(state) {
      return state.keywordSearch;
    }
  }
};
