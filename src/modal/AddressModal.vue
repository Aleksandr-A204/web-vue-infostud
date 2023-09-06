<template>
  <Modal
    :title="addressObject?.id ? 'Редактирование адреса' : 'Создание адреса'"
    @close="$emit('close')"
    @saveData="saveData"
  >
    <RowWithLabel label="Город">
      <CustomSelect
        :options="cities"
        track-by="value"
        label="display"
        :value="object.cityId"
        @input="value => setValue(value, 'cityId')"
      />
    </RowWithLabel>

    <RowWithLabel label="Улица">
      <CustomSelect
        :options="streets"
        track-by="value"
        label="display"
        :value="object.streetId"
        @input="event => setValue(event, 'streetId')"
      />
    </RowWithLabel>

    <RowWithLabel label="Почтовый индекс">
      <CustomSelect
        :options="postindexes"
        track-by="value"
        label="display"
        :value="object.postindexId"
        @input="event => setValue(event, 'postindexId')"
      />
    </RowWithLabel>
  </Modal>
</template>

<script>
import _ from "lodash";
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
      object: null
    };
  },

  computed: {
    ...mapGetters({
      streets: "streetModule/mapedStreets",
      cities: "cityModule/mapedCities",
      postindexes: "postindexModule/mapedPostindexes"
    })
  },

  watch: {
    addressObject: {
      immediate: true,
      handler(value) {
        this.object = _.cloneDeep(value);

        delete this.object.city;
        delete this.object.street;
        delete this.object.postindex;
      }
    }
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

    setValue(value, property) {
      _.set(this.object, property, value);
    },

    saveData() {
      if (this.object?.cityId && this.object?.streetId && this.object?.postindexId) {
        if (this.object.id) {
          this.editeAddress(this.object);
        }
        else {
          this.createAddress(this.object);
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
