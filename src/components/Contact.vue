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
        @click="addContact"
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
          v-for="contact in contacts"
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
                @click="editContact(contact)"
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
                @click="deleteContact(contact.Id)"
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
      v-if="showAddModal"
      title-modal="Создание"
      @closeModal="closeAddModal"
    />

    <ContactModal
      v-if="showEditModal"
      title-modal="Редактирование"
      :selected-item="selectedContact"
      @closeModal="closeEditModal"
    />
  </div>
</template>

<script>
import ContactModal from "../modal/ContactModal.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ContactModal
  },

  data() {
    return {
      showAddModal: false,
      showEditModal: false
    };
  },

  computed: mapGetters({
    getKeywordSearch: "contactModule/keywordSearch",
    contacts: "contactModule/contacts"
  }),

  mounted() {
    this.getAllContacts();
  },

  methods: {
    ...mapActions({
      deleteContact: "contactModule/deleteContact",
      getAllContacts: "contactModule/allContacts"
    }),

    addContact() {
      this.showAddModal = true;
    },

    closeAddModal() {
      this.showAddModal = false;
    },

    closeEditModal() {
      this.showEditModal = false;
    },

    deleteContact(contactId) {
      if (confirm("Вы действительно хотите удалить этот контакт?")) {
        this.deleteContact(contactId);
      }
    },

    editContact(selectedContact) {
      this.selectedContact = selectedContact;

      this.showEditModal = true;
    },

    setKeywordSearch(event) {
      this.$store.dispatch("contactModule/keywordSearch", event.target.value);
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