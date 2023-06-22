<template>
  <div>
    <button
      type="button"
      class="btn btn-primary m-2 fload-end"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="addClick()"
    >
      Добавить учебный план
    </button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Факультет</th>
          <th>Специальность</th>
          <th>Курс</th>
          <th>Группа</th>
          <th>Параметры</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="curriculum in curriculums"
          :key="curriculum.id"
        >
          <td>{{ curriculum.CurriculumID }}</td>
          <td>{{ curriculum.Faculty }}</td>
          <td>{{ curriculum.Speciality }}</td>
          <td>{{ curriculum.Cource }}</td>
          <td>{{ curriculum.Group }}</td>
          <button
            type="button"
            class="btn btn-light mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(curriculum)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
            type="button"
            @click="deleteClick(curriculum.CurriculumID)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </button>
        </tr>
      </tbody>
    </table>
    <div
      id="exampleModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-header">
          <h5
            id="exampleModalLabel"
            class="modal-title"
          >
            {{ modalTitle }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <span class="input-group-text">Факультет: </span>
            <input
              v-model="faculty"
              type="text"
              class="form-control"
            >
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Специальность: </span>
            <input
              v-model="speciality"
              type="text"
              class="form-control"
            >
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Курс: </span>
            <input
              v-model="cource"
              type="text"
              class="form-control"
            >
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Группа: </span>
            <input
              v-model="group"
              type="text"
              class="form-control"
            >
          </div>
          <button
            v-if="id===0"
            type="button"
            class="btn btn-primary"
            @click="createClick()"
          >
            Create
          </button>
          <button
            v-if="id!==0"
            type="button"
            class="btn btn-primary"
            @click="updateClick()"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Variables from "../variables.js";

export default {
  data() {
    return {
      cource: "",
      curriculums: [],
      faculty: "",
      group: "",
      id: 0,
      modalTitle: "",
      name: "curriculum",
      speciality: ""
    };
  },

  async mounted() {
    this.curriculums = await this.refreshData();
  },

  methods: {
    addClick() {
      this.cource = "";
      this.faculty = "";
      this.group = "";
      this.id = 0;
      this.modalTitle = "Добавление учебного плана";
      this.speciality = "";
    },

    async createClick() {
      const response = await axios.post(Variables.API_URL + this.name, {
        Cource: this.cource,
        Faculty: this.faculty,
        Group: this.group,
        Speciality: this.speciality
      });

      response.data === "Added successfully" ? this.curriculums = await this.refreshData() : console.error(Error);
    },

    async deleteClick(curricID) {
      if (confirm("Вы действительно хотите удалить этот учебный план?")) {
        const response = await axios.delete(Variables.API_URL + this.name + "/" + curricID);

        response.data === "Deleded successfully" ? this.curriculums = await this.refreshData() : console.error(Error);
      }
    },

    editClick(curric) {
      this.cource = curric.Cource;
      this.faculty = curric.Faculty;
      this.group = curric.Group;
      this.id = curric.CurriculumID;
      this.modalTitle = "Изменение учебного плана";
      this.speciality = curric.Speciality;
    },

    async refreshData() {
      let response = await axios.get(Variables.API_URL + this.name);
      return response.data;
    },

    async updateClick() {
      const response = await axios.put(Variables.API_URL + this.name, {
        CurriculumID: this.id,
        Cource: this.cource,
        Faculty: this.faculty,
        Group: this.group,
        Speciality: this.speciality
      });

      response.data === "Updated successfully" ? this.curriculums = await this.refreshData() : console.error(Error);
    }
  }
};
</script>

<style scoped>
</style>