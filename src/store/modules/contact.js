import ContactClient from "@/API/contactClient.js";

const contactClient = new ContactClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    contacts: [],
    keywordSearch: ""
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
      const contacts = await contactClient.addContact(object);

      commit("updateContactData", contacts);
    },

    async deleteContact({ commit }, contactId) {
      try {
        const contacts = await contactClient.deleteContact(contactId);

        commit("updateContactData", contacts);
      }
      catch (err) {
        console.log(err);
        alert("Невозможно удалить.");
      }
    },

    async allContacts({ commit }) {
      const contacts = await contactClient.getContactData();

      commit("updateContactData", contacts);
    },

    keywordSearch({ commit }, keywordSearch) {
      commit("updateKeywordSearch", keywordSearch);
    },

    async updateContact({ commit }, object) {
      const contacts = await contactClient.updateContact(object);

      commit("updateContactData", contacts);
    }
  },

  getters: {
    keywordSearch(state) {
      return state.keywordSearch;
    },

    contacts(state) {
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