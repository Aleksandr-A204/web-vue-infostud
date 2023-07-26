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
      try {
        const students = await studentClient.deleteStudent(studentId);

        commit("updateStudentData", students);
      }
      catch (err) {
        console.log(err);
        alert("Невозможно удалить.");
      }
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
      return state.keywordSearch;
    },

    students(state) {
      const keywordInLowerCase = state.keywordSearch.trim().toLowerCase();
      if (keywordInLowerCase === "") {
        return state.students;
      }
      else {
        return state.students.filter(s => {
          return s.FullName?.toLowerCase().includes(keywordInLowerCase)
            || s.City?.toLowerCase().includes(keywordInLowerCase)
            || s.PostIndex?.toLowerCase().includes(keywordInLowerCase)
            || s.Street?.toLowerCase().includes(keywordInLowerCase)
            || s.Faculty?.toLowerCase().includes(keywordInLowerCase)
            || s.Speciality?.toLowerCase().includes(keywordInLowerCase)
            || s.Course?.toLowerCase().includes(keywordInLowerCase)
            || s.Group?.toLowerCase().includes(keywordInLowerCase)
            || s.Contact.Phone?.toLowerCase().includes(keywordInLowerCase)
            || s.Contact.Email?.toLowerCase().includes(keywordInLowerCase);
        });
      }
    }
  }
};