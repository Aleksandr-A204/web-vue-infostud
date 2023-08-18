<template>
  <div>
    <Search
      :value="getKeywordSearch"
      @input="setKeywordSearch"
    >
      <button
        class="button"
        @click="addAddress()"
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
          @click="confirmDeleteAddress(element.id)"
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
      v-if="showModal"
      :address-object="selectedAddress"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import AddressModal from "../modal/AddressModal.vue";
import { mapActions, mapGetters } from "vuex";

import _ from "lodash";

export default {
  components: {
    AddressModal
  },

  data() {
    return {
      showModal: false,
      selectedAddress: {},
      columns: [
        {
          label: "Id",
          property: "id"
        },
        {
          label: "Город",
          property: "city.city",
          formType: "select"
        },
        {
          label: "Почтовый индекс",
          property: "postindex.postindex",
          formType: "select"
        },
        {
          label: "Улица",
          property: "street.street",
          formType: "select"
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
      this.selectedAddress = {};

      this.showModal = true;
    },

    confirmDeleteAddress(addressId) {
      if (confirm("Вы действительно хотите удалить адрес?")) {
        this.deleteAddress(addressId);
      }
    },

    async columnClick(currentColumn) {
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

      await this.getAddressData(currentColumn);
    },

    editAddress(address) {
      this.selectedAddress = { ... address };

      for (const column of this.columns.toSpliced(-1)) {
        if (column.property.indexOf(".") > 0) {
          this.selectedAddress[column.property.slice(0, column.property.indexOf("."))] = _.get(address, column.property);
        }
        else {
          this.selectedAddress[column.property] = _.get(address, column.property);
        }
      }

      this.showModal = true;
    },

    setKeywordSearch(value) {
      this.$store.dispatch("addressModule/keywordSearch", value);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
