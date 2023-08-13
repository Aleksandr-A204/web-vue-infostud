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
    async addNewStudent({ commit, state }, student) {
      await studentClient.addNewStudent(student);

      const students = await studentClient.getStudents(state.keywordSearch);
      commit("updateStudentData", students);
    },

    async deleteStudent({ commit, state }, studentId) {
      await studentClient.deleteStudent(studentId);

      const students = await studentClient.getStudents(state.keywordSearch);
      commit("updateStudentData", students);
    },

    async getStudents({ commit, state }, column) {
      const students = await studentClient.getStudents(state.keywordSearch, column);

      commit("updateStudentData", students);
    },

    async keywordSearch({ commit }, keywordSearch) {
      commit("updateSearchKeyword", keywordSearch);

      const students = await studentClient.getStudents(keywordSearch);
      commit("updateStudentData", students);
    },

    async updateStudent({ commit, state }, student) {
      await studentClient.updateStudent(student);
      const students = await studentClient.getStudents(state.keywordSearch);

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