<template>
  <div
    class="wrapper"
    tabs
    align="center"
  >
    <div
      class="div-group"
    >
      <input
        :value="getKeywordSearch"
        type="text"
        placeholder="Поиск"
        class="input-filter"
        @input="setKeywordSearch"
      >
      <button
        class="btn show-change_stud"
        @click="addContactClick"
      >
        Добавить контакт
      </button>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Телефон</th>
          <th>Эл. почта</th>
          <th>Параметры</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="contact in validContacts"
          :key="contact.id"
        >
          <td>{{ contact.Id }}</td>
          <td>{{ contact.Phone }}</td>
          <td>{{ contact.Email }}</td>
          <td>
            <div class="btn-option">
              <button
                class="btn"
                type="button"
                @click="editContactClick(contact)"
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
                @click="deleteContactClick(contact.Id)"
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
    <ContactModal
      v-if="showModal"
      :right-btn-title="modalTitle"
      :right-btn-confirming="modalConfirm"
      :selected-item="getSelectedContact"
      @closeModal="closeModal"
    />
    <!-- <div
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
    </div> -->
  </div>
</template>

<script>
import ContactModal from "../modal/Contact.vue";
import dataClient from "../API/dataClient.js";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ContactModal
  },

  data() {
    return {
      getSelectedContact: {},
      name: "contact",
      showModal: false
    };
  },

  computed: mapGetters({
    getKeywordSearch: "contactModule/getKeywordSearch",
    validContacts: "contactModule/validContacts"
  }),

  mounted() {
    this.getAllContacts(dataClient.API_URL + this.name);
  },

  methods: {
    ...mapActions({
      deleteContact: "contactModule/deleteContact",
      getAllContacts: "contactModule/getAllContacts"
    }),

    addContactClick() {
      this.getSelectedContact = {};

      this.modalTitle = "Добавление контакта";
      this.modalConfirm = "Создать";
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    deleteContactClick(contID) {
      if (confirm("Вы действительно хотите удалить этот контакт?")) {
        this.deleteContact(dataClient.API_URL + this.name + "/" + contID);
      }
    },

    editContactClick(selectedContact) {
      this.getSelectedContact = selectedContact;

      this.modalConfirm = "Сохранить";
      this.modalTitle = "Редактирование контакта";
      this.showModal = true;
    },

    setKeywordSearch(event) {
      this.$store.dispatch("contactModule/setKeywordSearch", event.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper{
  margin: 20px;
  .input-filter{
    border: 1px;
    border-radius: 10px;
    border-style: solid;
    border-color: black;
    height: 25px;
    margin-right: 15px;
    max-width: 300px;
    width: 100%;
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
}
</style>