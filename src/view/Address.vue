<template>
  <div>
    <Search
      :value="getKeywordSearch"
      @input="setKeywordSearch"
    />

    <CustomButton @click="addAddress()">
      Добавить адрес
    </CustomButton>

    <CustomTable
      :columns="columns"
      :elements="addresses"
      @columnClick="columnClick"
      @editElement="editAddress"
      @deleteElement="confirmDeleteAddress"
    />

    <AddressModal
      v-if="showModal"
      :rows="columns.toSpliced(-1)"
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
      columns: [
        {
          label: "Город",
          property: "city.city",
          sort: "None",
          formType: "select"
        },
        {
          label: "Почтовый индекс",
          property: "postindex.postindex",
          sort: "None",
          formType: "select"
        },
        {
          label: "Улица",
          property: "street.street",
          sort: "None",
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
      this.selectedAddress = { };

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
      this.selectedAddress = _.cloneDeep(address);

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
