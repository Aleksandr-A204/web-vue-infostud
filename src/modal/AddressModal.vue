<template>
  <Modal
    :title="addressObject?.id ? 'Редактирование адреса' : 'Создание адреса'"
    :current-object="addressObject"
    :rows="rows"
    :list="{ city: cities, postindex: postindexes, street: streets }"
    @close="$emit('close')"
    @saveData="saveData"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    addressObject: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      currentObject: null,

      rows: [
        { id: "cityId", label: "Город", property: "city", formType: "select", isPropertyById: true },
        { id: "postindexId", label: "Почтовый индекс", property: "postindex", formType: "select", isPropertyById: true },
        { id: "streetId", label: "Улица", property: "street", formType: "select", isPropertyById: true }
      ]

    };
  },

  computed: {
    ...mapGetters({
      streets: "streetModule/streets",
      cities: "cityModule/cities",
      postindexes: "postindexModule/postindexes"
    })
  },

  async mounted() {
    await this.getCityData();
    await this.getPostindexData();
    await this.getStreetData();
  },

  methods: {
    ...mapActions({
      getCityData: "cityModule/getCityData",
      getPostindexData: "postindexModule/getPostindexData",
      getStreetData: "streetModule/getStreetData",
      createAddress: "addressModule/createAddress",
      updateAddress: "addressModule/updateAddress"
    }),

    saveData(object) {
      if (object.cityId && object.streetId && object.postindexId) {
        if (object.id) {
          this.updateAddress(object);
        }
        else {
          this.createAddress(object);
        }

        this.$emit("close");
      }
      else {
        alert("Заполните все поля!");
      }
    }
  }
};
</script>

<style scoped>
</style>