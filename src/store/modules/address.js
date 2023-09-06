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
    setAddressData(state, allAddresses) {
      state.addresses = allAddresses;
    },

    setKeywordSearch(state, keywordSearch) {
      state.keywordSearch = keywordSearch;
    }
  },

  actions: {
    async addressData({ commit, state }, column) {
      const addresses = await addressClient.getAddresses(state.keywordSearch, column);

      commit("setAddressData", addresses);
    },

    async createAddress({ commit, state }, address) {
      await addressClient.createAddress(address);

      const addresses = await addressClient.getAddresses(state.keywordSearch);
      commit("setAddressData", addresses);
    },

    async deleteAddress({ commit, state }, addressId) {
      await addressClient.deleteAddress(addressId);

      const addresses = await addressClient.getAddresses(state.keywordSearch);
      commit("setAddressData", addresses);
    },

    async keywordSearch({ commit }, keywordSearch) {
      commit("setKeywordSearch", keywordSearch);

      const addresses = await addressClient.getAddresses(keywordSearch);
      commit("setAddressData", addresses);
    },

    async editeAddress({ commit, state }, address) {
      await addressClient.editeAddress(address);

      const addresses = await addressClient.getAddresses(state.keywordSearch);
      commit("setAddressData", addresses);
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
