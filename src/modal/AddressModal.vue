<template>
  <Modal
    :title="addressObject?.id ? 'Редактирование адреса' : 'Создание адреса'"
    :rows="rows"
    :object="addressObject"
    :dropdown="{city: cities, street: streets, postindex: postindexes }"
    @close="$emit('close')"
    @saveData="saveData"
  >
    <!-- <div
      v-for="(row, index) of rows"
      :key="`content-row-${index}`"
      class="block-group"
    >
      <label class="form-label">{{ row.label }}</label>

      <select
        v-model="currentObject[row.propertyId]"
        class="form-select"
      >
        <option
          v-for="(element, secondIndex) of dropdown(row.property)"
          :key="`drop-down-list-${secondIndex}`"
          :value="element.id"
        >
          {{ element[row.property] }}
        </option>
      </select>
    </div> -->
  </Modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    rows: {
      type: Array,
      required: true
    },

    addressObject: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      currentObject: null
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
      editeAddress: "addressModule/editeAddress"
    }),

    saveData() {
      if (this.currentObject.cityId && this.currentObject.streetId && this.currentObject.postindexId) {
        if (this.currentObject.id) {
          this.editeAddress(this.currentObject);
        }
        else {
          this.createAddress(this.currentObject);
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
