import axios from "axios";

export default {
  strict: true,
  namespaced: true,

  state: {
    keywordSearch: "",
    addresses: []
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
    async createAddress({ commit }, object) {
      const response = await axios.post(object.API_URL, {
        City: object.address.city,
        PostIndex: object.address.postindex,
        Street: object.address.street
      });

      commit("updateAddressData", response.data);
    },

    async deleteAddress({ commit }, addressNameWithIdAndAPI_URL) {
      try {
        const response = await axios.delete(addressNameWithIdAndAPI_URL);

        commit("updateAddressData", response.data);
      }
      catch (err) {
        console.log("Невозможно удалить.");
        console.log(err);
      }
    },

    async getAddressData({ commit }, ApiWithAddressName_URL) {
      const response = await axios.get(ApiWithAddressName_URL);

      commit("updateAddressData", response.data);
    },

    setKeywordSearch({ commit }, keywordSearch) {
      commit("updateKeywordSearch", keywordSearch);
    },

    async updateAddress({ commit }, object) {
      const response = await axios.put(object.API_URL, {
        Id: object.id,
        City: object.address.city,
        PostIndex: object.address.postindex,
        Street: object.address.street
      });

      commit("updateAddressData", response.data);
    }
  },

  getters: {
    getAllAddresses(state) {
      return state.addresses;
    },

    getKeywordSearch(state) {
      return state.keywordSearch;
    },

    validAddress(state) {
      const bottomWordSearch = state.keywordSearch.toLowerCase();
      if (bottomWordSearch === "") {
        return state.addresses;
      }
      else {
        return state.addresses.filter(a => {
          return a.City?.toLowerCase().includes(bottomWordSearch)
          || a.PostIndex?.toLowerCase().includes(bottomWordSearch)
          || a.Street?.toLowerCase().includes(bottomWordSearch);
        });
      }
    }
  }
};