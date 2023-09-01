<template>
  <Modal
    :title="addressObject?.id ? 'Редактирование адреса' : 'Создание адреса'"
    @close="$emit('close')"
    @saveData="saveData"
  >
    <ContentRow custom-key="city">
      <CustomLabel>Город</CustomLabel>
      <CustomSelect
        :value="getValue('city')"
        :options="cities"
        property="city"
        :is-id="true"
        @input="event => setValue(event, 'cityId')"
      />
    </ContentRow>

    <ContentRow custom-key="street">
      <CustomLabel>Улица</CustomLabel>
      <CustomSelect
        :value="getValue('street')"
        :options="streets"
        property="street"
        :is-id="true"
        @input="event => setValue(event, 'streetId')"
      />
    </ContentRow>

    <ContentRow custom-key="postindex">
      <CustomLabel>Почтовый индекс</CustomLabel>
      <CustomSelect
        :value="getValue('postindex')"
        :options="postindexes"
        property="postindex"
        :is-id="true"
        @input="event => setValue(event, 'postindexId')"
      />
    </ContentRow>
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

  computed: {
    ...mapGetters({
      streets: "streetModule/streets",
      cities: "cityModule/cities",
      postindexes: "postindexModule/postindexes"
    })
  },

  watch: {
    addressObject: {
      immediate: true,
      handler(value) {
        this.object = _.cloneDeep(value);
      }
    },

    faculties: {
      immediate: true,
      handler(collection) {
        _.forEach(collection, object=> {
          delete object.curriculums;
        });
      }
    },

    specialities: {
      immediate: true,
      handler(collection) {
        _.forEach(collection, object=> {
          delete object.curriculums;
        });
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

    getValue(property) {
      return _.get(this.object, `${property}.${property}`);
    },

    setValue(event, property) {
      _.set(this.object, property, event.target.value);
    },

    getOptions(property) {
      switch (property) {
      case "city.city":
        _.forEach(this.cities, object => {
          delete object.addresses;
        });
        return this.cities;
      case "street.street":
        _.forEach(this.streets, object => {
          delete object.addresses;
        });
        return this.streets;
      case "postindex.postindex":
        _.forEach(this.postindexes, object => {
          delete object.addresses;
        });
        return this.postindexes;
      }
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
