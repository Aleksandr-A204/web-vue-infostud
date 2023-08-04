<template>
  <div>
    <InputAndTableStyle>
      <div>
        <input
          :value="getKeywordSearch"
          class="input-filter"
          placeholder="Поиск"
          @input="setKeywordSearch"
        >
        <button
          class="button"
          @click="addAddress"
        >
          Добавить адрес
        </button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="table__head-cell">
              ID
            </th>
            <th class="table__head-cell">
              Город
            </th>
            <th class="table__head-cell">
              Почтовый индекс
            </th>
            <th class="table__head-cell">
              Улица
            </th>
            <th class="table__head-cell" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="address in addresses"
            :key="address.Id"
          >
            <td class="table__body-cell">
              {{ address.Id }}
            </td>
            <td class="table__body-cell">
              {{ address.City.City }}
            </td>
            <td class="table__body-cell">
              {{ address.Postindex.PostIndex }}
            </td>
            <td class="table__body-cell">
              {{ address.Street.Street }}
            </td>
            <td class="table__body-cell">
              <div class="button-option">
                <button
                  class="button"
                  @click="editAddress(address)"
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
                  @click="confirmDeleteAddress(address.Id)"
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
    </InputAndTableStyle>

    <AddressModal
      v-if="showAddModal"
      @close="showAddModal = false"
    />

    <AddressModal
      v-if="showEditModal"
      :address-object="selectedAddress"
      @close="showEditModal = false"
    />
  </div>
</template>

<script>
import AddressModal from "../modal/AddressModal.vue";
import InputAndTableStyle from "./InputAndTableStyle.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    AddressModal,
    InputAndTableStyle
  },

  data() {
    return {
      showAddModal: false,
      showEditModal: false
    };
  },

  computed: mapGetters({
    addresses: "addressModule/addresses",
    getKeywordSearch: "addressModule/keywordSearch"
  }),

  async mounted() {
    await this.getAddressData();
  },

  methods: {
    ...mapActions({
      deleteAddress: "addressModule/deleteAddress",
      getAddressData: "addressModule/getAddressData"
    }),

    addAddress() {
      this.showAddModal = true;
    },

    confirmDeleteAddress(addressId) {
      if (confirm("Вы действительно хотите удалить адрес?")) {
        this.deleteAddress(addressId);
      }
    },

    editAddress(selectedAddress) {
      this.selectedAddress = selectedAddress;

      this.showEditModal = true;
    },

    setKeywordSearch(event) {
      this.$store.dispatch("addressModule/keywordSearch", event.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
