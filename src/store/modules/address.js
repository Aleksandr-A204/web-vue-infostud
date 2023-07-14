import AddressClient from "@/API/addressClient";
import router from "@/route/routes.js";

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
      const addresses = await addressClient.createAddress(router.currentRoute.name, objectAddress);

      commit("updateAddressData", addresses);
    },

    async deleteAddress({ commit }, addressId) {
      try {
        const addresses = await addressClient.deleteAddress(router.currentRoute.name, addressId);

        commit("updateAddressData", addresses);
      }
      catch (err) {
        console.log(err);
        alert("Невозможно удалить.");
      }
    },

    async addressData({ commit }, routeName = router.currentRoute.name) {
      const addresses = await addressClient.getAddresses(routeName);

      commit("updateAddressData", addresses);
    },

    keywordSearch({ commit }, keywordSearch) {
      commit("updateKeywordSearch", keywordSearch);
    },

    async updateAddress({ commit }, objectAddress) {
      const addresses = await addressClient.updateAddress(router.currentRoute.name, objectAddress);

      commit("updateAddressData", addresses);
    }
  },

  getters: {
    allAddresses(state) {
      return state.addresses;
    },

    keywordSearch(state) {
      return state.keywordSearch;
    },

    addresses(state) {
      const wordInLowerCase = state.keywordSearch.toLowerCase();
      if (wordInLowerCase === "") {
        return state.addresses;
      }
      else {
        return state.addresses.filter(a => {
          return a.City?.toLowerCase().includes(wordInLowerCase)
          || a.PostIndex?.toLowerCase().includes(wordInLowerCase)
          || a.Street?.toLowerCase().includes(wordInLowerCase);
        });
      }
    }
  }
};