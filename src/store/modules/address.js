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
      await addressClient.createAddress(objectAddress);
      const addresses = await addressClient.getAddresses();

      commit("updateAddressData", addresses);
    },

    async deleteAddress({ commit }, addressId) {
      await addressClient.deleteAddress(addressId);
      const addresses = await addressClient.getAddresses();

      commit("updateAddressData", addresses);
    },

    async keywordSearch({ commit }, keywordSearch) {
      addressClient.setKeywordSearch(keywordSearch);
      const addresses = await addressClient.getAddresses();
      commit("updateAddressData", addresses);

      commit("updateKeywordSearch", keywordSearch);
    },

    async updateAddress({ commit }, objectAddress) {
      await addressClient.updateAddress(objectAddress);
      const addresses = await addressClient.getAddresses();

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