<template>
  <div>
    <div>
      <input
        :value="getKeywordSearch"
        class="input-filter"
        placeholder="Поиск"
        @input="setKeywordSearch"
      >
    </div>

    <CustomButton @click="showAddModal = true">
      Добавить контакт
    </CustomButton>

    <table class="table">
      <thead>
        <tr>
          <th class="table__head-cell">
            ID
          </th>
          <th class="table__head-cell">
            Телефон
          </th>
          <th class="table__head-cell">
            Эл. почта
          </th>
          <th class="table__head-cell">
            Параметры
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="contact in contacts"
          :key="contact.Id"
        >
          <td class="table__body-cell">
            {{ contact.Id }}
          </td>
          <td class="table__body-cell">
            {{ contact.Phone }}
          </td>
          <td class="table__body-cell">
            {{ contact.Email }}
          </td>
          <td class="table__body-cell">
            <div class="button-option">
              <button
                class="button"
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
                class="button"
                type="button"
                @click="confirmDeleteContact(contact.Id)"
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
      @closeModal="showAddModal = false"
    />

    <ContactModal
      v-if="showEditModal"
      :selected-item="selectedContact"
      @closeModal="showEditModal = false"
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

    confirmDeleteContact(contactId) {
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
</style>
