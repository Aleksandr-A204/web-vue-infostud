import router from "@/route/routes";
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
    async createStudent({ commit }, studentObject) {
      const students = await studentClient.addNewStudent(router.currentRoute.name, studentObject);

      commit("updateStudentData", students);
    },

    async deleteStudent({ commit }, studentId) {
      try {
        const students = await studentClient.deleteStudent(router.currentRoute.name, studentId);

        commit("updateStudentData", students);
      }
      catch (err) {
        console.log(err);
        alert("Невозможно удалить.");
      }
    },

    async studentData({ commit }) {
      const students = await studentClient.getStudents(router.currentRoute.name);

      commit("updateStudentData", students);
    },

    keywordSearch({ commit }, keywordSearch) {
      commit("updateSearchKeyword", keywordSearch);
    },

    async updateStudent({ commit }, studentObject) {
      const students = await studentClient.updateStudent(router.currentRoute.name, studentObject);

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
            || s.Address.City?.toLowerCase().includes(lowerСaseKeyword)
            || s.Address.PostIndex?.toLowerCase().includes(lowerСaseKeyword)
            || s.Address.Street?.toLowerCase().includes(lowerСaseKeyword)
            || s.Curriculum.Faculty?.toLowerCase().includes(lowerСaseKeyword)
            || s.Curriculum.Speciality?.toLowerCase().includes(lowerСaseKeyword)
            || s.Curriculum.Course?.toLowerCase().includes(lowerСaseKeyword)
            || s.Curriculum.Group?.toLowerCase().includes(lowerСaseKeyword)
            || s.Contact.Phone?.toLowerCase().includes(lowerСaseKeyword)
            || s.Contact.Email?.toLowerCase().includes(lowerСaseKeyword);
        });
      }
    }
  }
};