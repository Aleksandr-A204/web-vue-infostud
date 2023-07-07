import axios from "axios";

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
    async createStudent({ commit }, student) {
      const responce = await axios.post(student.API_URL, {
        Address: {
          City: student.address.city,
          PostIndex: student.address.postindex,
          Street: student.address.street
        },
        Curriculum: {
          Course: student.curriculum.course,
          Faculty: student.curriculum.faculty,
          Group: student.curriculum.group,
          Speciality: student.curriculum.speciality
        },
        Contact: {
          Email: student.contact.email,
          Phone: student.contact.phone
        },
        FullName: student.fullname
      });

      commit("updateStudentData", responce.data);
    },

    async deleteStudent({ commit }, studentNameWithIdAndAPI_URL) {
      const responce = await axios.delete(studentNameWithIdAndAPI_URL);

      commit("updateStudentData", responce.data);
    },

    async getStudentData({ commit }, studentNameAndAPI_URL) {
      const responce = await axios.get(studentNameAndAPI_URL);

      commit("updateStudentData", responce.data);
    },

    setKeywordSearch({ commit }, keywordSearch) {
      commit("updateSearchKeyword", keywordSearch);
    },

    async updateStudent({ commit }, student) {
      const response = await axios.put(student.API_URL, {
        Address: {
          City: student.address.city,
          PostIndex: student.address.postindex,
          Street: student.address.street
        },
        Curriculum: {
          Course: student.curriculum.course,
          Faculty: student.curriculum.faculty,
          Group: student.curriculum.group,
          Speciality: student.curriculum.speciality
        },
        Contact: {
          Email: student.contact.email,
          Phone: student.contact.phone
        },
        Id: student.id,
        FullName: student.fullname
      });

      commit("updateStudentData", response.data);
    }
  },

  getters: {
    getKeywordSearch(state) {
      return state.keywordSearch;
    },

    validStudents(state) {
      const bottomWordSearch = state.keywordSearch.toLowerCase();
      if (bottomWordSearch === "") {
        return state.students;
      }
      else {
        return state.students.filter(s => {
          return s.FullName?.toLowerCase().includes(bottomWordSearch)
            || s.Address.City?.toLowerCase().includes(bottomWordSearch)
            || s.Address.PostIndex?.toLowerCase().includes(bottomWordSearch)
            || s.Address.Street?.toLowerCase().includes(bottomWordSearch)
            || s.Curriculum.Faculty?.toLowerCase().includes(bottomWordSearch)
            || s.Curriculum.Speciality?.toLowerCase().includes(bottomWordSearch)
            || s.Curriculum.Course?.toLowerCase().includes(bottomWordSearch)
            || s.Curriculum.Group?.toLowerCase().includes(bottomWordSearch)
            || s.Contact.Phone?.toLowerCase().includes(bottomWordSearch)
            || s.Contact.Email?.toLowerCase().includes(bottomWordSearch);
        });
      }
    }
  }
};