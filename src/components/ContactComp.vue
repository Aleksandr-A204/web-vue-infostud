<template>
  <div>
    <button
      type="button"
      class="btn btn-primary m-2 fload-end"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="addClick()"
    >
      Добавить контакт
    </button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Телефон</th>
          <th>Эл. почта</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="contact in contacts"
          :key="contact.id"
        >
          <td>{{ contact.ContactID }}</td>
          <td>{{ contact.Phone }}</td>
          <td>{{ contact.Email }}</td>
          <button
            type="button"
            class="btn btn-light mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(contact)"
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
            @click="deleteClick(contact.ContactID)"
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
            <span class="input-group-text">Телефон: </span>
            <input
              v-model="phone"
              type="text"
              class="form-control"
            >
          </div>
          <div class="input-group mb-3">
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
      contacts: [],
      email: "",
      id: 0,
      modalTitle: "",
      name: "contact",
      phone: ""
    };
  },

  async mounted() {
    this.contacts = await this.refreshData();
  },

  methods: {
    addClick() {
      this.email = "";
      this.id = 0;
      this.modalTitle = "Добавление контакта";
      this.phone = "";
    },

    async createClick() {
      const response = await axios.post(Variables.API_URL + this.name, {
        Email: this.email,
        Phone: this.phone
      });

      response.data === "Added successfully" ? this.contacts = await this.refreshData() : console.error(Error);
    },

    async deleteClick(contID) {
      if (confirm("Вы действительно хотите удалить этот контакт?")) {
        const response = await axios.delete(Variables.API_URL + this.name + "/" + contID);

        response.data === "Deleded successfully" ? this.contacts = await this.refreshData() : console.error(Error);
      }
    },

    editClick(cont) {
      this.email = cont.Email;
      this.id = cont.ContactID;
      this.modalTitle = "Изменение контакта";
      this.phone = cont.Phone;
    },

    async refreshData() {
      let response = await axios.get(Variables.API_URL + this.name);
      return response.data;
    },

    async updateClick() {
      const response = await axios.put(Variables.API_URL + this.name, {
        ContactID: this.id,
        Email: this.email,
        Phone: this.phone
      });

      response.data === "Updated successfully" ? this.contacts = await this.refreshData() : console.error(Error);
    }
  }
};
</script>

<style scoped>
</style>