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
    >
      <template #actions="{element}">
        <CustomButton @click="editAddress(element)">
          <Icon icon="pen-to-square" />
        </CustomButton>

        <CustomButton @click="confirmDeleteAddress(element.id)">
          <Icon icon="trash" />
        </CustomButton>
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
          propertyById: "cityId",
          sort: "None"
        },
        {
          label: "Почтовый индекс",
          property: "postindex.postindex",
          propertyById: "postindexId",
          sort: "None"
        },
        {
          label: "Улица",
          property: "street.street",
          propertyById: "streetId",
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
      getAddressData: "addressModule/addressData"
    }),

    addAddress() {
      this.selectedAddress = {
        city: null,
        street: null,
        postindex: null
      };

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
      this.selectedAddress = address;

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
