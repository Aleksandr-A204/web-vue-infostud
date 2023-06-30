<template>
  <div

    class="studComp"
    tabs
    align="center"
  >
    <div
      class="div-group"
    >
      <input
        :value="getKeywordSearch"
        class="inputFilter"
        placeholder="Фильтровать по любому полю..."
        @input="setKeywordSearch"
      >
      <button
        class="btn show-change_stud"
        @click="addStudentClick"
      >
        Добавить студента
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>ФИО</th>
          <th>Город</th>
          <th>Почтовый индекс</th>
          <th>Улица</th>
          <th>Факультет</th>
          <th>Специальность</th>
          <th>Курс</th>
          <th>Группа</th>
          <th>Телефон</th>
          <th>Эл. почта</th>
          <th>Параметры</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="student in validStudents"
          :key="student.id"
        >
          <td>{{ student.Id }}</td>
          <td>{{ student.FullName }}</td>
          <td>{{ student.Address.City }}</td>
          <td>{{ student.Address.PostIndex }}</td>
          <td>{{ student.Address.Street }}</td>
          <td>{{ student.Curriculum.Faculty }}</td>
          <td>{{ student.Curriculum.Speciality }}</td>
          <td>{{ student.Curriculum.Cource }}</td>
          <td>{{ student.Curriculum.Group }}</td>
          <td>{{ student.Contact.Phone }}</td>
          <td>{{ student.Contact.Email }}</td>
          <td>
            <div class="btn-option">
              <button
                class="btn"
                type="button"
                @click="editStudentClick(student)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </button>
              <button
                class="btn"
                type="button"
                @click="deleteClick(student.Id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  class="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <StudentModal
      v-if="showModal"
      :right-btn-title="modalTitle"
      :right-btn-confirming="modalConfirm"
      @closeModal="closeModal"
      @createStudentClick="createStudentClick"
      @updateClick="updateClick"
    >
      <div class="modal-body">
        <div class="input-group">
          <input
            :value="getInputFullname"
            type="text"
            class="form-control"
            placeholder="Введите ФИО"
            @input="setInputFullname"
          >
        </div>
        <div class="input-group">
          <input
            :value="getInputCity"
            type="text"
            class="form-control"
            placeholder="Введите город"
            @input="setInputCity"
          >
        </div>
        <div class="input-group">
          <input
            :value="getInputPostindex"
            type="text"
            class="form-control"
            placeholder="Введите почтовый индекс"
            @input="setInputPostindex"
          >
        </div>
        <div class="input-group">
          <input
            :value="getInputStreet"
            type="text"
            class="form-control"
            placeholder="Введите улицу"
            @input="setInputStreet"
          >
        </div>
        <div class="input-group">
          <input
            :value="getInputFaculty"
            type="text"
            class="form-control"
            placeholder="Введите факультет"
            @input="setInputFaculty"
          >
        </div>
        <div class="input-group">
          <input
            :value="getInputSpeciality"
            type="text"
            class="form-control"
            placeholder="Введите специальность"
            @input="setInputSpeciality"
          >
        </div>
        <div class="input-group">
          <input
            :value="getInputCource"
            type="text"
            class="form-control"
            placeholder="Введите курс"
            @input="setInputCource"
          >
        </div>
        <div class="input-group">
          <input
            :value="getInputGroup"
            type="text"
            class="form-control"
            placeholder="Введите группу"
            @input="setInputGroup"
          >
        </div>
        <div class="input-group">
          <input
            :value="getInputPhone"
            type="text"
            class="form-control"
            placeholder="Введите телефон"
            @input="setInputPhone"
          >
        </div>
        <div class="input-group">
          <input
            :value="getInputEmail"
            type="email"
            class="form-control"
            placeholder="Введите эл. почту"
            @input="setInputEmail"
          >
        </div>
      </div>
    </StudentModal>
  </div>
</template>

<script>
import axios from "axios";
import dataClient from "../API/dataClient.js";
import StudentModal from "./StudentModal.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    StudentModal
  },


  data() {
    return {
      showModal: false,
      modalTitle: "",
      name: "student"
    };
  },

  computed: {
    ...mapGetters({
      validStudents: "studentModule/validStudents",
      getKeywordSearch: "studentModule/getKeywordSearch",
      getInputFullname: "studentModule/getInputFullname",
      getInputCity: "studentModule/getInputCity",
      getInputPostindex: "studentModule/getInputPostIndex",
      getInputStreet: "studentModule/getInputStreet",
      getInputFaculty: "studentModule/getInputFaculty",
      getInputSpeciality: "studentModule/getInputSpeciality",
      getInputCource: "studentModule/getInputCource",
      getInputGroup: "studentModule/getInputGroup",
      getInputPhone: "studentModule/getInputPhone",
      getInputEmail: "studentModule/getInputEmail"
    })
  },

  async mounted() {
    await this.getStudentData(dataClient.API_URL + this.name);
  },

  methods: {
    ...mapActions({
      addStudent: "studentModule/addStudent",
      createStudent: "studentModule/createStudent",
      editStudent: "studentModule/editStudent",
      getStudentData: "studentModule/getStudentData"
    }),

    addStudentClick() {
      this.modalConfirm = "Создать";
      this.modalTitle = "Добавление студента";
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    async deleteClick(studID) {
      if (confirm("Вы действительно хотите удалить студента?")) {
        const response = await axios.delete(dataClient.API_URL + this.urlName + "/" + studID);

        if (response.data === "Deleted successfully") {
          this.students = await this.fetchStudData();
        }
        else {
          console.error(Error);
        }
      }
    },

    createStudentClick() {
      this.createStudent(dataClient.API_URL + this.name);

      this.showModal = false;
    },

    editStudentClick(selectedStudent) {
      this.editStudent(selectedStudent);

      this.modalTitle = "Изменение студента";
      this.showModal = true;
      this.modalConfirm = "Сохранить";
    },

    setKeywordSearch(event) {
      this.$store.dispatch("studentModule/setKeywordSearch", event.target.value);
    },

    setInputFullname(event) {
      this.$store.dispatch("studentModule/setInputFullname", event.target.value);
    },

    setInputCity(event) {
      this.$store.dispatch("studentModule/setInputCity", event.target.value);
    },

    setInputPostindex(event) {
      this.$store.dispatch("studentModule/setInputPostindex", event.target.value);
    },

    setInputStreet(event) {
      this.$store.dispatch("studentModule/setInputStreet", event.target.value);
    },

    setInputFaculty(event) {
      this.$store.dispatch("studentModule/setInputFaculty", event.target.value);
    },

    setInputSpeciality(event) {
      this.$store.dispatch("studentModule/setInputSpeciality", event.target.value);
    },

    setInputCource(event) {
      this.$store.dispatch("studentModule/setInputCource", event.target.value);
    },

    setInputGroup(event) {
      this.$store.dispatch("studentModule/setInputGroup", event.target.value);
    },

    setInputPhone(event) {
      this.$store.dispatch("studentModule/setInputPhone", event.target.value);
    },

    setInputEmail(event) {
      this.$store.dispatch("studentModule/setInputEmail", event.target.value);
    },

    async updateClick() {
      const response = await axios.put(dataClient.API_URL + this.urlName, {
        Address: {
          City: this.city,
          PostIndex: this.postIndex,
          Street: this.street
        },
        Curriculum: {
          Cource: this.cource,
          Faculty: this.faculty,
          Group: this.group,
          Speciality: this.speciality
        },
        Contact: {
          Email: this.email,
          Phone: this.phone
        },
        Id: this.id,
        FullName: this.fullName
      });

      if (response.data === "Edited successfully") {
        this.students = await this.fetchStudData();
      }
      else {
        console.error(Error);
      }

      this.showModal = false;
    }
  }
};
</script>

<style scoped lang="scss">
.studComp{
  margin: 20px;
}
.inputFilter{
  border: 1px;
  border-radius: 10px;
  border-style: solid;
  border-color: black;
  height: 25px;
  margin-right: 15px;
  width: 400px;
}
.btn {
  background-color: #87CEEB;
  border: 1px;
  border-style: solid;
  border-radius: 7px;
  box-sizing: border-box;
  color: black;
  text-align: center;
  height: 25px;
  margin: 1px;
}
.btn:hover {
  background: #1915f7;
  border: 1px;
  border-style: solid;
  border-color: #000;
  color: white;
}
.btn-option{
  align-self: center;
}
table {
  background: white;
  border-collapse: collapse;
  border-color: gray;
  border-style: double;
  font-family: sans-serif;
  font-size: 14px;
  margin-top: 7px;
}
th {
  border-color: gray;
  border-style: solid;
  border-width: 1px;
  text-align: center;
  font-size: 16px;
  padding: 5px;
}
td {
  background: white;
  border-color: lightgray;
  border-style: solid;
  border-width: 1px;
    font-size: 15px;
  padding: 5px;
  text-align: left;
}
.input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
  input {
    width: 380px;
    border-radius: 2px;
  };
}
</style>