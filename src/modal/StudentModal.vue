<template>
  <Modal
    :title="object?.id ? 'Редактирование студента' : 'Создание студента'"
    @close="$emit('close')"
    @saveData="saveSudentData"
  >
    <RowWithLabel label="ФИО">
      <CustomInput
        :value="object.fullName"
        @input="value => setValue(value, 'fullName')"
      />
    </RowWithLabel>

    <RowWithLabel label="Город">
      <CustomSelect
        :options="cities"
        :value="object.cityId"
        label="display"
        track-by="value"
        @input="value => setValue(value, 'cityId')"
      />
    </RowWithLabel>

    <RowWithLabel
      label="Улица"
      :disabled="!object.cityId"
    >
      <CustomSelect
        :value="object.street"
        :options="streets"
        @input="value => setValue(value, 'street')"
      />
    </RowWithLabel>

    <RowWithLabel
      label="Почтовый индекс"
      :disabled="!object.street"
    >
      <CustomSelect
        :value="object.postindex"
        :options="postindexes"
        @input="value => setValue(value, 'postindex')"
      />
    </RowWithLabel>

    <RowWithLabel label="Факультет">
      <CustomSelect
        :value="object.faculty"
        :options="faculties"
        @input="value => setValue(value, 'faculty')"
      />
    </RowWithLabel>

    <RowWithLabel
      label="Специальность"
      :disabled="!object.faculty"
    >
      <CustomSelect
        :value="object.speciality"
        :options="specialities"
        @input="value => setValue(value, 'speciality')"
      />
    </RowWithLabel>

    <RowWithLabel
      label="Курс"
      :disabled="!object.speciality"
    >
      <CustomSelect
        :value="object.course"
        :options="courses"
        @input="value => setValue(value, 'course')"
      />
    </RowWithLabel>

    <RowWithLabel
      label="Группа"
      :disabled="!object.course"
    >
      <CustomSelect
        :value="object.group"
        :options="groups"
        @input="value => setValue(value, 'group')"
      />
    </RowWithLabel>

    <RowWithLabel label="Телефон">
      <CustomInput
        :value="object.phone"
        @input="value => setValue(value, 'phone')"
      />
    </RowWithLabel>

    <RowWithLabel label="Электронная почта">
      <CustomInput
        :value="object.email"
        @input="value => setValue(value, 'email')"
      />
    </RowWithLabel>
  </Modal>
</template>

<script>
import _ from "lodash";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    studentObject: {
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
      addresses: "addressModule/addresses",
      curriculums: "curriculumModule/curriculums"
    }),

    cities() {
      return _.chain(this.addresses).map(address => ({ display: address.city.city, value: address.city.id })).uniqBy("value").value();
    },

    streets() {
      let addresses = _.cloneDeep(this.addresses);

      if (this.object.cityId) {
        addresses = _.filter(addresses, { cityId: Number(this.object.cityId) });
      }

      return _.chain(addresses).map(address => (address.street.street)).uniqBy().value();
    },

    postindexes() {
      let addresses = _.cloneDeep(this.addresses);

      if (this.object.street) {
        addresses = _.filter(addresses, { cityId: Number(this.object.cityId), street: { street: this.object.street } });
      }

      return _.chain(addresses).map(address => (address.postindex.postindex)).uniqBy().value();
    },

    faculties() {
      return _.chain(this.curriculums).map(curriculum => (curriculum.faculty.faculty)).uniqBy().value();
    },

    specialities() {
      let curriculums = _.cloneDeep(this.curriculums);

      if (this.object.faculty) {
        curriculums = _.filter(curriculums, { faculty: { faculty: this.object.faculty } });
      }

      return _.chain(curriculums).map(curriculum => (curriculum.speciality.speciality)).uniqBy().value();
    },

    courses() {
      let curriculums = _.cloneDeep(this.curriculums);

      if (this.object.speciality) {
        curriculums = _.filter(curriculums, { faculty: { faculty: this.object.faculty }, speciality: { speciality: this.object.speciality } });
      }

      return _.chain(curriculums).map("course").sortBy().uniqBy().value();
    },

    groups() {
      let curriculums = _.cloneDeep(this.curriculums);

      if (this.object.course) {
        curriculums = _.filter(curriculums, { faculty: { faculty: this.object.faculty }, speciality: { speciality: this.object.speciality }, course: this.object.course });
      }

      return _.chain(curriculums).map("group").uniqBy().value();
    }
  },

  watch: {
    studentObject: {
      immediate: true,
      handler(value) {
        this.object = _.cloneDeep(value);

        delete this.object.city;
      }
    }
  },

  async mounted() {
    await this.$store.dispatch("addressModule/keywordSearch", "");
    await this.$store.dispatch("curriculumModule/keywordSearch", "");
  },

  methods: {
    ...mapActions({
      createStudent: "studentModule/addNewStudent",
      editStudent: "studentModule/editStudent"
    }),

    changeObject(property) {
      switch (property) {
      case "cityId":
        this.object.street = null;
        this.object.postindex = null;
        break;
      case "street":
        this.object.postindex = null;
        break;

      case "faculty":
        this.object.speciality = null;
        this.object.course = null;
        this.object.group = null;
        break;
      case "speciality":
        this.object.course = null;
        this.object.group = null;
        break;
      case "course":
        this.object.group = null;
        break;
      }
    },

    setValue(value, property) {
      _.set(this.object, property, value);

      this.changeObject(property);
    },

    saveSudentData() {
      if (this.object.fullName && this.object.cityId && this.object.street && this.object.postindex && this.object.faculty && this.object.speciality
      && this.object.course && this.object.group && this.object.phone && this.object.email) {
        if (this.object.id) {
          this.editStudent(this.object);
        }
        else {
          this.createStudent(this.object);
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
