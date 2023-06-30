import axios from "axios";

export default {
  strict: true,
  namespaced: true,

  state: {
    searchKeyword: "",
    students: [],
    address: {
      city: "",
      postIndex: "",
      street: ""
    },
    id: 0,
    fullName: "",
    curriculum: {
      cource: "",
      faculty: "",
      group: "",
      speciality: ""
    },
    contact: {
      email: "",
      phone: ""
    }
  },

  mutations: {
    ubdateInputData(state, newStudent) {
      state.id = newStudent.id;
      state.fullName = newStudent.fullName;
      state.address.city = newStudent.address.city;
      state.address.postIndex = newStudent.address.postIndex;
      state.address.street = newStudent.address.street;
      state.curriculum.cource = newStudent.curriculum.cource;
      state.curriculum.faculty = newStudent.curriculum.faculty;
      state.curriculum.group = newStudent.curriculum.group;
      state.curriculum.speciality = newStudent.curriculum.speciality;
      state.contact.email = newStudent.contact.email;
      state.contact.phone = newStudent.contact.phone;
    },

    updateSearchKeyword(state, searchKeyword) {
      state.searchKeyword = searchKeyword;
    },

    updateFullName(state, fullName) {
      state.fullName = fullName;
    },

    updateCity(state, city) {
      state.address.city = city;
    },

    updatePostIndex(state, postIndex) {
      state.address.postIndex = postIndex;
    },

    updateStreet(state, street) {
      state.address.street = street;
    },

    updateFaculty(state, faculty) {
      state.curriculum.faculty = faculty;
    },

    updateSpeciality(state, speciality) {
      state.curriculum.speciality = speciality;
    },

    updateCource(state, cource) {
      state.curriculum.cource = cource;
    },

    updateGroup(state, group) {
      state.curriculum.group = group;
    },

    updatePhone(state, phone) {
      state.contact.phone = phone;
    },

    updateEmail(state, email) {
      state.contact.email = email;
    },

    ubdateStudentData(state, students) {
      state.students = students;
    }
  },

  actions: {
    addStudent({ commit }) {
      const newStudent = {
        address: {
          city: "",
          postIndex: "",
          street: ""
        },
        id: 0,
        fullName: "",
        curriculum: {
          cource: "",
          faculty: "",
          group: "",
          speciality: ""
        },
        contact: {
          email: "",
          phone: ""
        }
      };

      commit("ubdateInputData", newStudent);
    },

    editStudent({ commit }, oldStudent) {
      const editedStudent = {
        address: {
          city: oldStudent.Address.City ,
          postIndex: oldStudent. ,
          street: oldStudent.
        },
        id: oldStudent. ,
        fullName: oldStudent. ,
        curriculum: {
          cource: oldStudent. ,
          faculty: oldStudent. ,
          group: oldStudent. ,
          speciality: oldStudent. 
        },
        contact: {
          email: oldStudent.,
          phone: oldStudent.
        }
      };

      commit("ubdateInputData", editedStudent);
    },

    async createStudent({ state, commit }, StudentComponentNameAndAPI_URL) {
      const responce = await axios.post(StudentComponentNameAndAPI_URL, {
        Address: {
          City: state.address.city,
          PostIndex: state.address.postIndex,
          Street: state.address.street
        },
        Curriculum: {
          Cource: state.curriculum.cource,
          Faculty: state.curriculum.faculty,
          Group: state.curriculum.group,
          Speciality: state.curriculum.speciality
        },
        Contact: {
          Email: state.contact.email,
          Phone: state.contact.phone
        },
        FullName: state.fullName
      });

      commit("updateSearchKeyword", responce.data);
    },

    async getStudentData({ commit }, StudentComponentNameAndAPI_URL) {
      const responce = await axios.get(StudentComponentNameAndAPI_URL);
      const students = responce.data;

      commit("ubdateStudentData", students);
    },

    setKeywordSearch({ commit }, searchKeyword) {
      commit("updateSearchKeyword", searchKeyword);
    },

    setInputFullname({ commit }, fullName) {
      commit("updateFullName", fullName);
    },

    setInputCity({ commit }, city) {
      commit("updateCity", city);
    },

    setInputPostindex({ commit }, postIndex) {
      commit("updatePostIndex", postIndex);
    },

    setInputStreet({ commit }, street) {
      commit("updateStreet", street);
    },

    setInputFaculty({ commit }, faculty) {
      commit("updateFaculty", faculty);
    },

    setInputSpeciality({ commit }, speciality) {
      commit("updateSpeciality", speciality);
    },

    setInputCource({ commit }, cource) {
      commit("updateCource", cource);
    },

    setInputGroup({ commit }, group) {
      commit("updateGroup", group);
    },

    setInputPhone({ commit }, phone) {
      commit("updatePhone", phone);
    },

    setInputEmail({ commit }, email) {
      commit("updateEmail", email);
    }

  },

  getters: {
    getInputFullname(state) {
      return state.fullName;
    },

    getInputCity(state) {
      return state.address.city;
    },

    getInputPostIndex(state) {
      return state.address.postIndex;
    },

    getInputStreet(state) {
      return state.address.street;
    },

    getInputFaculty(state) {
      return state.curriculum.faculty;
    },

    getInputSpeciality(state) {
      return state.curriculum.speciality;
    },

    getInputCource(state) {
      return state.curriculum.cource;
    },

    getInputGroup(state) {
      return state.curriculum.group;
    },

    getInputPhone(state) {
      return state.contact.phone;
    },

    getInputEmail(state) {
      return state.contact.email;
    },

    getKeywordSearch(state) {
      return state.searchKeyword;
    },

    validStudents(state) {
      const bottomWordSearch = state.searchKeyword.toLowerCase();
      if (bottomWordSearch === "") {
        return state.students;
      }
      else {
        return state.students.filter(s => {
          return s.FullName.toLowerCase().includes(bottomWordSearch)
            || s.Address.City.toLowerCase().includes(bottomWordSearch)
            || s.Address.PostIndex.toLowerCase().includes(bottomWordSearch)
            || s.Address.Street.toLowerCase().includes(bottomWordSearch)
            || s.Curriculum.Faculty.toLowerCase().includes(bottomWordSearch)
            || s.Curriculum.Speciality.toLowerCase().includes(bottomWordSearch)
            || s.Curriculum.Cource.toLowerCase().includes(bottomWordSearch)
            || s.Curriculum.Group.toLowerCase().includes(bottomWordSearch)
            || s.Contact.Phone.toLowerCase().includes(bottomWordSearch)
            || s.Contact.Email.toLowerCase().includes(bottomWordSearch);
        });
      }
    }
  }
};