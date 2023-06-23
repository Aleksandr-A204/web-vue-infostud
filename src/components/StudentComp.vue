<template>
  <div
    class="studComp"
    tabs
    align="center"
  >
    <div class="div-group">
      <input
        v-model="filterMessage"
        class="inputFilter"
        type="text"
        placeholder="Фильтрация по любому полю..."
      >
      <button
        id="show-modal"
        class="btn modal"
        @click="addClick(), showModal = true"
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
                type="button"
                class="btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
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
    <div
      v-show="showModal"
    >
      <div class="modal-header">
        <h3
          id="exampleModalLabel"
          class="modal-title"
        >
          {{ modalTitle }}
        </h3>
        <button
          type="button"
          class="btn btnClose"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>
      <AddOrUpdateStudent />
      <div class="modal-body">
        <div class="input-group">
          <span class="input-group-text">ФИО: </span>
          <input
            v-model="fullName"
            type="text"
            class="form-control"
          >
        </div>
        <div class="input-group">
          <span class="input-group-text">Город: </span>
          <input
            v-model="city"
            type="text"
            class="form-control"
          >
        </div>
        <div class="input-group">
          <span class="input-group-text">Почтовый индекс: </span>
          <input
            v-model="postIndex"
            type="text"
            class="form-control"
          >
        </div>
        <div class="input-group">
          <span class="input-group-text">Улица: </span>
          <input
            v-model="street"
            type="text"
            class="form-control"
          >
        </div>
        <div class="input-group">
          <span class="input-group-text">Факультет: </span>
          <input
            v-model="faculty"
            type="text"
            class="form-control"
          >
        </div>
        <div class="input-group">
          <span class="input-group-text">Специальность: </span>
          <input
            v-model="speciality"
            type="text"
            class="form-control"
          >
        </div>
        <div class="input-group">
          <span class="input-group-text">Курс: </span>
          <input
            v-model="cource"
            type="text"
            class="form-control"
          >
        </div>
        <div class="input-group">
          <span class="input-group-text">Группа: </span>
          <input
            v-model="group"
            type="text"
            class="form-control"
          >
        </div>
        <div class="input-group">
          <span class="input-group-text">Телефон: </span>
          <input
            v-model="phone"
            type="text"
            class="form-control"
          >
        </div>
        <div class="input-group">
          <span class="input-group-text">Эл. почта: </span>
          <input
            v-model="email"
            type="text"
            class="form-control"
          >
        </div>
        <button
          v-if="id===0"
          type="button"
          class="btn"
          @click="createClick()"
        >
          Создать
        </button>
        <button
          v-if="id!==0"
          type="button"
          class="btn"
          @click="updateClick()"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AddOrUpdateStudent from "./HomeComp.vue";
import axios from "axios";
import Variables from "../variables.js";

export default {

  components: {
    AddOrUpdateStudent
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
        return this.students.filter(function(elem) {
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
    addClick() {
      this.email = "";
      this.city = "";
      this.cource = "";
      this.id = 0;
      this.faculty = "";
      this.filter = "";
      this.fullName = "";
      this.group = "";
      this.modalTitle = "Добавить студента";
      this.phone = "";
      this.postIndex = "";
      this.speciality = "";
      this.street = "";
    },

    btnClose() {

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
      this.modalTitle = "Изменить студента";
      this.phone = stud.Contact.Phone;
      this.postIndex = stud.Address.PostIndex;
      this.speciality = stud.Curriculum.Speciality;
      this.street = stud.Address.Street;
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

<style scoped>
/* .div-group{
  margin-right: 834px;
} */
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
.btnClose{
  border: none;
  padding: 0px;
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
</style>