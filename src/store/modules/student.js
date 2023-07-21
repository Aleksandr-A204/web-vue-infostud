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
    async createStudent({ commit }) {
      const students = await studentClient.addNewStudent();

      commit("updateStudentData", students);
    },

    async deleteStudent({ commit }) {
      try {
        const students = await studentClient.deleteStudent();

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

    async updateStudent({ commit }) {
      const students = await studentClient.updateStudent();

      commit("updateStudentData", students);
    }
  },

  getters: {
    keywordSearch(state) {
      return state.keywordSearch;
    },

    students(state) {
      const lowerСaseKeyword = state.keywordSearch.trim().toLowerCase();
      if (lowerСaseKeyword === "") {
        return state.students;
      }
      else {
        return state.students.filter(s => {
          return s.FullName?.toLowerCase().includes(lowerСaseKeyword)
            || s.City?.toLowerCase().includes(lowerСaseKeyword)
            || s.PostIndex?.toLowerCase().includes(lowerСaseKeyword)
            || s.Street?.toLowerCase().includes(lowerСaseKeyword)
            || s.Faculty?.toLowerCase().includes(lowerСaseKeyword)
            || s.Speciality?.toLowerCase().includes(lowerСaseKeyword)
            || s.Course?.toLowerCase().includes(lowerСaseKeyword)
            || s.Group?.toLowerCase().includes(lowerСaseKeyword)
            || s.Contact.Phone?.toLowerCase().includes(lowerСaseKeyword)
            || s.Contact.Email?.toLowerCase().includes(lowerСaseKeyword);
        });
      }
    }
  }
};