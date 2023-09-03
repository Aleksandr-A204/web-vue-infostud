<template>
  <Modal
    :title="object?.id ? 'Редактирование студента' : 'Создание студента'"
    @close="$emit('close')"
    @saveData="saveSudentData"
  >
    <ContentRow custom-key="fullName">
      <CustomLabel>ФИО</CustomLabel>
      <CustomInput
        :value="getValue('fullName')"
        @input="event => setValue(event, 'fullName')"
      />
    </ContentRow>

    <ContentRow custom-key="city">
      <CustomLabel>Город</CustomLabel>
      <CustomSelect
        :value="getValue('city', true)"
        :options="cities"
        property="city"
        :is-id="true"
        @input="event => setValue(event, 'cityId')"
      />
    </ContentRow>

    <ContentRow
      custom-key="street"
      :disabled="!object.cityId"
    >
      <CustomLabel>Улица</CustomLabel>
      <CustomSelect
        :value="getValue('street')"
        :options="streets"
        @input="event => setValue(event, 'street')"
      />
    </ContentRow>

    <ContentRow
      custom-key="postindex"
      :disabled="!object.street"
    >
      <CustomLabel>Почтовый индекс</CustomLabel>
      <CustomSelect
        :value="getValue('postindex')"
        :options="postindexes"
        @input="event => setValue(event, 'postindex')"
      />
    </ContentRow>

    <ContentRow custom-key="faculty">
      <CustomLabel>Факультет</CustomLabel>
      <CustomSelect
        :value="getValue('faculty')"
        :options="faculties"
        @input="event => setValue(event, 'faculty')"
      />
    </ContentRow>

    <ContentRow
      custom-key="speciality"
      :disabled="!object.faculty"
    >
      <CustomLabel>Специальность</CustomLabel>
      <CustomSelect
        :value="getValue('speciality')"
        :options="specialities"
        @input="event => setValue(event, 'speciality')"
      />
    </ContentRow>

    <ContentRow
      custom-key="course"
      :disabled="!object.speciality"
    >
      <CustomLabel>Курс</CustomLabel>
      <CustomSelect
        :value="getValue('course')"
        :options="courses"
        @input="event => setValue(event, 'course')"
      />
    </ContentRow>

    <ContentRow
      custom-key="group"
      :disabled="!object.course"
    >
      <CustomLabel>Группа</CustomLabel>
      <CustomSelect
        :value="getValue('group')"
        :options="groups"
        @input="event => setValue(event, 'group')"
      />
    </ContentRow>

    <ContentRow custom-key="phone">
      <CustomLabel>Номер телефона</CustomLabel>
      <CustomInput
        :value="getValue('phone')"
        @input="event => setValue(event, 'phone')"
      />
    </ContentRow>

    <ContentRow custom-key="email">
      <CustomLabel>Электронная почта</CustomLabel>
      <CustomInput
        :value="getValue('email')"
        @input="event => setValue(event, 'email')"
      />
    </ContentRow>
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
      return _.uniqBy(_.map(this.addresses, "city"), "city");
    },

    streets() {
      return this.object.cityId ? _.map(_.uniqBy(_.map(_.filter(this.addresses, { cityId: Number(this.object.cityId) }), "street"), "street"), "street") :
        _.map(_.uniqBy(_.map(this.addresses, "street"), "street"), "street");
    },

    postindexes() {
      return this.object.street ? _.map(_.uniqBy(_.map(_.filter(this.addresses, { cityId: Number(this.object.cityId), street: { street: this.object.street } }), "postindex"),
        "postindex"), "postindex") : _.map(_.uniqBy(_.map(this.addresses, "postindex"), "postindex"), "postindex");
    },

    faculties() {
      return _.map(_.uniqBy(_.map(this.curriculums, "faculty"), "faculty"), "faculty");
    },

    specialities() {
      return this.object.faculty ? _.map(_.uniqBy(_.map(_.filter(this.curriculums, { faculty: { faculty: this.object.faculty } }), "speciality"), "speciality"),
        "speciality") : _.map(_.uniqBy(_.map(this.curriculums, "speciality"), "speciality"), "speciality");
    },

    courses() {
      return this.object.speciality ? _.map(_.sortBy(_.uniqBy(_.filter(this.curriculums, { faculty: { faculty: this.object.faculty },
        speciality: { speciality: this.object.speciality } }), "course"), "course"), "course") : _.map(_.sortBy(_.uniqBy(this.curriculums, "course"), "course"), "course");
    },

    groups() {
      return this.object.course ? _.map(_.uniqBy(_.filter(this.curriculums, { faculty: { faculty: this.object.faculty },
        speciality: { speciality: this.object.speciality }, course: this.object.course }), "group"), "group") :
        _.map(_.uniqBy(this.curriculums, "group"), "group");
    }
  },

  watch: {
    studentObject: {
      immediate: true,
      handler(value) {
        this.object = _.cloneDeep(value);
      }
    },

    cities: {
      immediate: true,
      handler(collection) {
        _.forEach(collection, object => {
          delete object.students;
          delete object.addresses;
        });
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

    updateObject(property) {
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

    getValue(property, isId = false) {
      return isId ? _.get(this.object, `${property}.${property}`) : _.get(this.object, property);
    },

    setValue(event, property) {
      _.set(this.object, property, event.target.value);

      this.updateObject(property);
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
