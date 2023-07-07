import axios from "axios";

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
      const response = await axios.post(curriculumObject.API_URL, {
        Course: curriculumObject.course,
        Faculty: curriculumObject.faculty,
        Group: curriculumObject.group,
        Speciality: curriculumObject.speciality
      });

      commit("updateCurriculumData", response.data);
    },

    async deleteCurriculum({ commit }, curriculumNameWithIdAndAPI_URL) {
      try {
        const response = await axios.delete(curriculumNameWithIdAndAPI_URL);

        commit("updateCurriculumData", response.data);
      }
      catch (err) {
        console.log("Невозможно удалить.");
        console.log(err);
      }
    },

    async getCurriculumData({ commit }, curriculumNameAndAPI_URL) {
      const responce = await axios.get(curriculumNameAndAPI_URL);

      commit("updateCurriculumData", responce.data);
    },

    setKeywordSearch({ commit }, keywordSearch) {
      commit("updateKeywordSearch", keywordSearch);
    },

    async updateCurriculum({ commit }, curriculumObject) {
      const response = await axios.put(curriculumObject.API_URL, {
        Id: curriculumObject.id,
        Course: curriculumObject.course,
        Faculty: curriculumObject.faculty,
        Group: curriculumObject.group,
        Speciality: curriculumObject.speciality
      });

      commit("updateCurriculumData", response.data);
    }
  },

  getters: {
    validCurriculums(state) {
      const lowerСaseKeyword = state.keywordSearch.toLowerCase();
      if (lowerСaseKeyword === "") {
        return state.curriculums;
      }
      else {
        return state.curriculums.filter(c => {
          return c.Faculty?.toLowerCase().includes(lowerСaseKeyword)
            || c.Speciality?.toLowerCase().includes(lowerСaseKeyword)
            || c.Course?.toLowerCase().includes(lowerСaseKeyword)
            || c.Group?.toLowerCase().includes(lowerСaseKeyword);
        });
      }
    },

    getKeywordSearch(state) {
      return state.keywordSearch;
    }
  }
};