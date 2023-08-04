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
      const curriculums = await curriculumClient.createCurriculum(curriculumObject);

      commit("updateCurriculumData", curriculums);
    },

    async deleteCurriculum({ commit }, curriculumId) {
      const curriculums = await curriculumClient.deleteCurriculum(curriculumId);

      commit("updateCurriculumData", curriculums);
    },

    async curriculumData({ commit }) {
      const curriculums = await curriculumClient.getCurriculum();

      commit("updateCurriculumData", curriculums);
    },

    keywordSearch({ commit }, keywordSearch) {
      commit("updateKeywordSearch", keywordSearch);
    },

    async updateCurriculum({ commit }, curriculumObject) {
      const curriculums = await curriculumClient.updateCurriculum(curriculumObject);

      commit("updateCurriculumData", curriculums);
    }
  },

  getters: {
    curriculums(state) {
      const keywordInLowerCase = state.keywordSearch.toLowerCase();
      if (keywordInLowerCase === "") {
        return state.curriculums;
      }
      else {
        return state.curriculums.filter(c => {
          return c.Faculty.Faculty?.toLowerCase().includes(keywordInLowerCase)
            || c.Speciality.Faculty?.toLowerCase().includes(keywordInLowerCase)
            || c.Course.Faculty?.toLowerCase().includes(keywordInLowerCase)
            || c.Group.Faculty?.toLowerCase().includes(keywordInLowerCase);
        });
      }
    },

    keywordSearch(state) {
      return state.keywordSearch;
    }
  }
};