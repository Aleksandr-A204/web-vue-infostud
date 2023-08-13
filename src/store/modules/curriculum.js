import CurriculumClient from "@/API/curriculumClient.js";

const curriculumClient = new CurriculumClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    curriculums: [],
    keywordSearch: ""
  },

  mutations: {
    updateCurriculumData(state, allCurriculums) {
      state.curriculums = allCurriculums;
    },

    updateKeywordSearch(state, keywordSearch) {
      state.keywordSearch = keywordSearch;
    }
  },

  actions: {
    async createCurriculum({ commit, state }, curriculum) {
      await curriculumClient.createCurriculum(curriculum);

      const curriculums = await curriculumClient.getCurriculums(state.keywordSearch);
      commit("updateCurriculumData", curriculums);
    },

    async deleteCurriculum({ commit, state }, curriculumId) {
      await curriculumClient.deleteCurriculum(curriculumId);

      const curriculums = await curriculumClient.getCurriculums(state.keywordSearch);
      commit("updateCurriculumData", curriculums);
    },

    async curriculumData({ commit, state }, column) {
      const curriculums = await curriculumClient.getCurriculums(state.keywordSearch, column);

      commit("updateCurriculumData", curriculums);
    },

    async keywordSearch({ commit, state }, keywordSearch) {
      commit("updateKeywordSearch", keywordSearch);

      const curriculums = await curriculumClient.getCurriculums(state.keywordSearch);
      commit("updateCurriculumData", curriculums);
    },

    async updateCurriculum({ commit, state }, curriculum) {
      await curriculumClient.updateCurriculum(curriculum);

      const curriculums = await curriculumClient.getCurriculums(state.keywordSearch);
      commit("updateCurriculumData", curriculums);
    }
  },

  getters: {
    curriculums(state) {
      return state.curriculums;
    },

    keywordSearch(state) {
      return state.keywordSearch;
    }
  }
};