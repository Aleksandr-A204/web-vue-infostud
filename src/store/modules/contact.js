import axios from "axios";

export default {
  strict: true,
  namespaced: true,

  state: {
    keywordSearch: "",
    contacts: []
  },

  mutations: {
    updateContactData(state, allContacts) {
      state.contacts = allContacts;
    },

    updateKeywordSearch(state, keywordSearch) {
      state.keywordSearch = keywordSearch;
    }
  },

  actions: {
    async createContact({ commit }, object) {
      const response = await axios.post(object.API_URL, {
        Phone: object.contact.phone,
        Email: object.contact.email
      });

      commit("updateContactData", response.data);
    },

    async deleteContact({ commit }, addressNameWithIdAndAPI_URL) {
      try {
        const response = await axios.delete(addressNameWithIdAndAPI_URL);

        commit("updateContactData", response.data);
      }
      catch (err) {
        console.log("Невозможно удалить.");
        console.log(err);
      }
    },

    async getAllContacts({ commit }, addressNameAndAPI_URL) {
      const responce = await axios.get(addressNameAndAPI_URL);

      commit("updateContactData", responce.data);
    },

    setKeywordSearch({ commit }, keywordSearch) {
      commit("updateKeywordSearch", keywordSearch);
    },

    async updateContact({ commit }, object) {
      const responce = await axios.put(object.API_URL, {
        Id: object.id,
        Phone: object.contact.phone,
        Email: object.contact.email
      });

      commit("updateContactData", responce.data);
    }
  },

  getters: {
    getKeywordSearch(state) {
      return state.keywordSearch;
    },

    validContacts(state) {
      const keywordInLowerCase = state.keywordSearch.toLowerCase();
      if (keywordInLowerCase === "") {
        return state.contacts;
      }
      else {
        return state.contacts.filter(c => {
          return c.Phone?.toLowerCase().includes(keywordInLowerCase)
            || c.Email?.toLowerCase().includes(keywordInLowerCase);
        });
      }
    }
  }
};