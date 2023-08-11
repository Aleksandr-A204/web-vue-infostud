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
    async createCurriculum({ commit }, curriculumObject) {
      await curriculumClient.createCurriculum(curriculumObject);
      const curriculums = await curriculumClient.getCurriculums();

      commit("updateCurriculumData", curriculums);
    },

    async deleteCurriculum({ commit }, curriculumId) {
      await curriculumClient.deleteCurriculum(curriculumId);
      const curriculums = await curriculumClient.getCurriculums();

      commit("updateCurriculumData", curriculums);
    },

    async curriculumData({ commit }) {
      const curriculums = await curriculumClient.getCurriculums();

      commit("updateCurriculumData", curriculums);
    },

    async keywordSearch({ commit }, keywordSearch) {
      curriculumClient.setKeywordSearch(keywordSearch);
      const curriculums = await curriculumClient.getCurriculums();

      commit("updateCurriculumData", curriculums);

      commit("updateKeywordSearch", keywordSearch);
    },

    async updateCurriculum({ commit }, curriculumObject) {
      await curriculumClient.updateCurriculum(curriculumObject);
      const curriculums = await curriculumClient.getCurriculums();

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