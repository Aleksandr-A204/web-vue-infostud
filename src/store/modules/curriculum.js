import CurriculumClient from "@/API/curriculumClient.js";
import router from "@/route/routes";

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
      const curriculums = await curriculumClient.createCurriculum(router.currentRoute.name, curriculumObject);

      commit("updateCurriculumData", curriculums);
    },

    async deleteCurriculum({ commit }, curriculumId) {
      try {
        const curriculums = await curriculumClient.deleteCurriculum(router.currentRoute.name, curriculumId);

        commit("updateCurriculumData", curriculums);
      }
      catch (err) {
        console.log(err);
        alert("Невозможно удалить.");
      }
    },

    async curriculumData({ commit }, routeName = router.currentRoute.name) {
      const curriculums = await curriculumClient.getCurriculum(routeName);

      commit("updateCurriculumData", curriculums);
    },

    keywordSearch({ commit }, keywordSearch) {
      commit("updateKeywordSearch", keywordSearch);
    },

    async updateCurriculum({ commit }, curriculumObject) {
      const curriculums = await curriculumClient.updateCurriculum(router.currentRoute.name, curriculumObject);

      commit("updateCurriculumData", curriculums);
    }
  },

  getters: {
    curriculums(state) {
      const keywordInLowerСase = state.keywordSearch.toLowerCase();
      if (keywordInLowerСase === "") {
        return state.curriculums;
      }
      else {
        return state.curriculums.filter(c => {
          return c.Faculty?.toLowerCase().includes(keywordInLowerСase)
            || c.Speciality?.toLowerCase().includes(keywordInLowerСase)
            || c.Course?.toLowerCase().includes(keywordInLowerСase)
            || c.Group?.toLowerCase().includes(keywordInLowerСase);
        });
      }
    },

    keywordSearch(state) {
      return state.keywordSearch;
    }
  }
};