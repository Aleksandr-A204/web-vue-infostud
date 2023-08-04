import StudentClient from "@/API/studentClient.js";

const studentClient = new StudentClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    keywordSearch: "",
    students: []
  },

  mutations: {
    updateSearchKeyword(state, keywordSearch) {
      state.keywordSearch = keywordSearch;
    },

    updateStudentData(state, allStudents) {
      state.students = allStudents;
    }
  },

  actions: {
    async addNewStudent({ commit }, student) {
      const students = await studentClient.addNewStudent(student);

      commit("updateStudentData", students);
    },

    async deleteStudent({ commit }, studentId) {
      const students = await studentClient.deleteStudent(studentId);

      commit("updateStudentData", students);
    },

    async getStudentData({ commit }) {
      const students = await studentClient.getStudents();

      commit("updateStudentData", students);
    },

    keywordSearch({ commit }, keywordSearch) {
      commit("updateSearchKeyword", keywordSearch);
    },

    async updateStudent({ commit }, student) {
      const students = await studentClient.updateStudent(student);

      commit("updateStudentData", students);
    }
  },

  getters: {
    keywordSearch(state) {
      studentClient.setKeywordSearch(state.keywordSearch);
      return state.keywordSearch;
    },

    students(state) {
      return state.students;
    }
  }
};