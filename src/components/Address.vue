<template>
  <div>
    <Search
      :value="getKeywordSearch"
      @input="setKeywordSearch"
    >
      <button
        class="button"
        @click="addAddress"
      >
        Добавить адрес
      </button>
    </Search>

    <CustomTable
      :columns="columns"
      :elements="addresses"
      @columnClick="columnClick"
    >
      <template #actions="{ element }">
        <button
          class="button"
          @click="editAddress(element)"
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
          @click="confirmDeleteAddress(element.Id)"
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
      </template>
    </CustomTable>

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
import { mapActions, mapGetters } from "vuex";

import CustomTable from "./Table.vue";
import Search from "./Search.vue";

export default {
  components: {
    AddressModal,
    CustomTable,
    Search
  },

  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      columns: [
        {
          label: "Id",
          property: "Id",
          sort: "None"
        },
        {
          label: "Город",
          property: "City.City",
          sort: "None"
        },
        {
          label: "Почтовый индекс",
          property: "Postindex.PostIndex",
          sort: "None"
        },
        {
          label: "Улица",
          property: "Street.Street",
          sort: "None"
        },
        {
          label: "Действия",
          property: "actions"
        }
      ]
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

    columnClick(currentColumn) {
      for (const column of this.columns) {
        if (column.sort && column.property !== currentColumn.property) {
          column.sort = "None";
        }
      }

      switch (currentColumn.sort) {
      case "None":
        currentColumn.sort = "Asc";
        break;
      case "Asc":
        currentColumn.sort = "Desc";
        break;
      case "Desc":
        currentColumn.sort = "None";
        break;
      }

      this.$store.dispatch("studentModule/sort", currentColumn);
    },

    editAddress(selectedAddress) {
      this.selectedAddress = selectedAddress;

      this.showEditModal = true;
    },

    setKeywordSearch(value) {
      this.$store.dispatch("addressModule/keywordSearch", value);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
