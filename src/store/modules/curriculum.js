import _ from "lodash";
import CurriculumClient from "@/API/curriculumClient.js";
import router from "@/route/routes";

const curriculumClient = new CurriculumClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    curriculums: [],
    faculty: null,
    speciality: null,
    course: null,
    keywordSearch: "",
    wordByGroup: ""
  },

  mutations: {
    updateCurriculumData(state, allCurriculums) {
      state.curriculums = allCurriculums;
    },

    updateFaculty(state, value) {
      state.faculty = value;
    },

    updateCourse(state, value) {
      state.course = value;
    },

    updateSpeciality(state, value) {
      state.speciality = value;
    },

    updateKeywordSearch(state, keywordSearch) {
      state.keywordSearch = keywordSearch;
    },

    updateWordByGroup(state, value) {
      state.wordByGroup = value;
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

    setCourse({ commit }, value) {
      commit("updateCourse", value);
    },

    setFaculty({ commit }, value) {
      commit("updateFaculty", value);
    },

    setSpeciality({ commit }, value) {
      commit("updateSpeciality", value);
    },

    async updateCurriculum({ commit }, curriculumObject) {
      const curriculums = await curriculumClient.updateCurriculum(router.currentRoute.name, curriculumObject);

      commit("updateCurriculumData", curriculums);
    },

    wordByGroup({ commit }, value) {
      commit("updateWordByGroup", value);
    }
  },

  getters: {
    faculties(state) {
      return _.uniqBy(_.map(state.curriculums, "Faculty"), "Faculty");
    },

    courses(state) {
      if (state.speciality) {
        return _.uniqBy(_.map(_.filter(state.curriculums, { Faculty: { Faculty: state.faculty }, Speciality: { Speciality: state.speciality } }), "Course"), "Course");
      }
      else {
        return _.sortBy(_.uniqBy(_.map(state.curriculums, "Course"), "Course"), "Course");
      }
    },

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

    getFaculty(state) {
      return state.faculty;
    },

    groups(state) {
      if (state.wordByGroup === "") {
        return state.course ? _.uniqBy(_.map(_.filter(state.curriculums, { Faculty: { Faculty: state.faculty },
          Speciality: { Speciality: state.speciality }, Course: { Course: state.course } }), "Group"), "Group") : _.uniqBy(_.map(state.curriculums, "Group"), "Group");
      }
      else {
        const wordInLowCase = state.wordByGroup.toLowerCase();
        return _.uniqBy(_.map(_.filter(state.curriculums.filter(c => {
          return c.Group.Group?.toLowerCase().includes(wordInLowCase);
        }), { Faculty: { Faculty: state.faculty }, Speciality: { Speciality: state.speciality }, Course: { Course: state.course } }), "Group"), "Group");
      }
    },

    specialities(state) {
      if (state.faculty) {
        return _.uniqBy(_.map(_.filter(state.curriculums, { Faculty: { Faculty: state.faculty } }), "Speciality"), "Speciality");
      }
      else {
        return _.uniqBy(_.map(state.curriculums, "Speciality"), "Speciality");
      }
    },

    keywordSearch(state) {
      return state.keywordSearch;
    },

    wordByGroup(state) {
      return state.wordByGroup;
    }
  }
};