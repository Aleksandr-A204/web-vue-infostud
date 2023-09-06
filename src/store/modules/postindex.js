import PostindexClient from "@/API/postindexClient.js";

import _ from "lodash";

const postindexClient = new PostindexClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    postindexes: []
  },

  mutations: {
    updatePostindexData(state, allPostindexes) {
      state.postindexes = allPostindexes;
    }
  },

  actions: {
    async getPostindexData({ commit }) {
      const postindexes = await postindexClient.getPostindexData();

      commit("updatePostindexData", postindexes);
    }
  },

  getters: {
    postindexes(state) {
      return state.postindexes;
    },

    mapedPostindexes(state) {
      return _.map(state.postindexes, postindex => ({
        display: postindex.postindex,
        value: postindex.id
      }));
    }
  }
};
