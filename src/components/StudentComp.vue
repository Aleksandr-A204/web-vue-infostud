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
        v-model="filterMessage"
        class="inputFilter"
        type="text"
        placeholder="Фильтрация по любому полю..."
      >
      <button
        class="btn show-change_stud"
        @click="addClick"
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
          v-for="student in studList"
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
                @click="editClick(student)"
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
    <ModalStud
      v-if="showModal"
      :right-btn-title="modalTitle"
      @closeModal="closeModal"
    >
      <div class="modal-body">
        <div class="input-group">
          <input
            v-model="fullName"
            type="text"
            class="form-control"
            placeholder="Введите ФИО"
          >
        </div>
        <div class="input-group">
          <input
            v-model="city"
            type="text"
            class="form-control"
            placeholder="Введите город"
          >
        </div>
        <div class="input-group">
          <input
            v-model="postIndex"
            type="text"
            class="form-control"
            placeholder="Введите почтовый индекс"
          >
        </div>
        <div class="input-group">
          <input
            v-model="street"
            type="text"
            class="form-control"
            placeholder="Введите улицу"
          >
        </div>
        <div class="input-group">
          <input
            v-model="faculty"
            type="text"
            class="form-control"
            placeholder="Введите факультет"
          >
        </div>
        <div class="input-group">
          <input
            v-model="speciality"
            type="text"
            class="form-control"
            placeholder="Введите специальность"
          >
        </div>
        <div class="input-group">
          <input
            v-model="cource"
            type="text"
            class="form-control"
            placeholder="Введите курс"
          >
        </div>
        <div class="input-group">
          <input
            v-model="group"
            type="text"
            class="form-control"
            placeholder="Введите группу"
          >
        </div>
        <div class="input-group">
          <input
            v-model="phone"
            type="text"
            class="form-control"
            placeholder="Введите телефон"
          >
        </div>
        <div class="input-group">
          <input
            v-model="email"
            type="text"
            class="form-control"
            placeholder="Введите эл. почту"
          >
        </div>
      </div>
    </ModalStud>
  </div>
</template>

<script>
import axios from "axios";
import ModalStud from "./ModalStud.vue";
import Variables from "../variables.js";

export default {
  components: {
    ModalStud
  },

  data() {
    return {
      email: "",
      city: "",
      cource: "",
      faculty: "",
      filterMessage: "",
      fullName: "",
      group: "",
      phone: "",
      postIndex: "",
      speciality: "",
      street: "",
      id: 0,
      showModal: false,
      modalTitle: "",
      name: "student",
      students: []
    };
  },

  computed: {
    studList() {
      let filter = this.filterMessage.toLowerCase();
      if (filter === "") {
        return this.students;
      }
      else {
        return this.students.filter(elem => {
          return elem.FullName.toLowerCase().includes(filter) || elem.Address.City.toLowerCase().includes(filter) || elem.Address.PostIndex.toLowerCase().includes(filter)
           || elem.Address.Street.toLowerCase().includes(filter) || elem.Curriculum.Faculty.toLowerCase().includes(filter) || elem.Curriculum.Speciality.toLowerCase().includes(filter)
           || elem.Curriculum.Cource.toLowerCase().includes(filter) || elem.Curriculum.Group.toLowerCase().includes(filter) || elem.Contact.Phone.toLowerCase().includes(filter)
           || elem.Contact.Email.toLowerCase().includes(filter);
        });
      }
    }
  },

  async mounted() {
    this.students = await this.refreshData();
  },

  methods: {
    toggle() {
      this.opened = true;
    },

    hide() {
      this.opened = false;
    },

    addClick() {
      this.email = "";
      this.city = "";
      this.cource = "";
      this.id = 0;
      this.faculty = "";
      this.filter = "";
      this.fullName = "";
      this.group = "";
      this.modalTitle = "Добавление студента";
      this.phone = "";
      this.postIndex = "";
      this.speciality = "";
      this.street = "";

      this.showModal = true;
      this.modalConfirm = "Создать";
    },

    closeModal() {
      this.showModal = false;
    },

    async deleteClick(studID) {
      if (confirm("Вы действительно хотите удалить студента?")) {
        const response = await axios.delete(Variables.API_URL + this.name + "/" + studID);

        if (response.data === "Deleted successfully") {
          this.students = await this.refreshData();
        }
        else {
          console.error(Error);
        }
      }
    },

    async refreshData() {
      const response = await axios.get(Variables.API_URL + this.name);
      return response.data;
    },

    async createClick() {
      const response = await axios.post(Variables.API_URL + this.name, {
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
        FullName: this.fullName
      });
      if (response.data === "Added successfully") {
        this.students = await this.refreshData();
      }
      else {
        console.error(response.data);
      }
    },

    editClick(stud) {
      this.email = stud.Contact.Email;
      this.city = stud.Address.City;
      this.cource = stud.Curriculum.Cource;
      this.id = stud.Id;
      this.faculty = stud.Curriculum.Faculty;
      this.fullName = stud.FullName;
      this.group = stud.Curriculum.Group;
      this.modalTitle = "Изменение студента";
      this.phone = stud.Contact.Phone;
      this.postIndex = stud.Address.PostIndex;
      this.speciality = stud.Curriculum.Speciality;
      this.street = stud.Address.Street;

      this.showModal = true;
      this.modalConfirm = "Сохранить";
    },

    async updateClick() {
      const response = await axios.put(Variables.API_URL + this.name, {
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
        this.students = await this.refreshData();
      }
      else {
        console.error(Error);
      }
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
  color: rgb(156, 156, 156);
  height: 25px;
  margin-right: 15px;
  width: 400px;
}
.input-group {
  margin-bottom: 7px;
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
  input {
    width: 380px;
    border-radius: 2px;
  };
}
</style>