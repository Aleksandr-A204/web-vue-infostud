import StudentClient from "@/API/studentClient.js";

const studentClient = new StudentClient();

export default {
  strict: true,
  namespaced: true,

  state: {
    column: {},
    keywordSearch: "",
    students: []
  },

  mutations: {
    updateSort(state, column) {
      state.column = column;
    },

    updateSearchKeyword(state, keywordSearch) {
      state.keywordSearch = keywordSearch;
    },

    updateStudentData(state, allStudents) {
      state.students = allStudents;
    }
  },

  actions: {
    async addNewStudent({ commit }, student) {
      await studentClient.addNewStudent(student);
      const students = await studentClient.getStudents();

      commit("updateStudentData", students);
    },

    async deleteStudent({ commit }, studentId) {
      await studentClient.deleteStudent(studentId);
      const students = await studentClient.getStudents();

      commit("updateStudentData", students);
    },

    async getAllStudents({ commit }) {
      const students = await studentClient.getStudents();

      commit("updateStudentData", students);
    },

    async keywordSearch({ commit }, keywordSearch) {
      commit("updateSearchKeyword", keywordSearch);

      studentClient.setKeywordSearch(keywordSearch);

      const students = await studentClient.getStudents();
      commit("updateStudentData", students);
    },

    async sort({ commit, state }, column) {
      commit("updateSort", column);

      studentClient.setSort(state.column);

      const students = await studentClient.getStudents();
      commit("updateStudentData", students);
    },

    async updateStudent({ commit }, student) {
      await studentClient.updateStudent(student);
      const students = await studentClient.getStudents();

      commit("updateStudentData", students);
    }
  },

  getters: {
    keywordSearch(state) {
      return state.keywordSearch;
    },

    students(state) {
      return state.students;
    }
  }
};