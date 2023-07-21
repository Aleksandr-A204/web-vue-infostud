import GroupClient from "@/API/groupClient.js";

const groupClient = new GroupClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    groups: []
  },

  mutations: {
    updateGroupData(state, allGroups) {
      state.groups = allGroups;
    }
  },

  actions: {
    async getGroupData({ commit }) {
      const groups = await groupClient.getGroupData();

      commit("updateGroupData", groups);
    }
  },

  getters: {
    groups(state) {
      return state.groups;
    }
  }
};