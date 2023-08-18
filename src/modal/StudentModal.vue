<template>
  <Modal
    :title="studentObject?.id ? 'Редактирование студента' : 'Создание студента'"
    @close="$emit('close')"
    @saveData="saveSudentData"
  >
    <div
      v-for="(row, index) of rows"
      :key="`content-row-${index}`"
      class="block-group"
    >
      <label class="form-label">{{ row.label }}</label>

      <div v-if="row.formType === 'select'">
        <select
          :value="getValue(row.property)"
          class="form-select"
          @input="event => setProperty(row.property, event)"
        >
          <option
            v-for="(element, secondIndex) of dropdownList[row.property]"
            :key="`drop-down-list-${secondIndex}`"
          >
            {{ element[row.property] }}
          </option>
        </select>
      </div>
      <div v-else>
        <input
          :value="getValue(row.property)"
          type="text"
          class="form-control"
          @input="event => setProperty(row.property, event)"
        >
      </div>
    </div>
  </Modal>
</template>

<script>
import _ from "lodash";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    rows: {
      type: Array,
      required: true
    },

    studentObject: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      object: null,
      dropdownList: {}
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
      return this.object.city ? _.uniqBy(_.map(_.filter(this.addresses, { city: { city: this.object.city } }), "street"), "street") :
        _.uniqBy(_.map(this.addresses, "street"), "street");
    },

    postindexes() {
      return this.object.street ? _.uniqBy(_.map(_.filter(this.addresses, { city: { city: this.object.city },
        street: { street: this.object.street } }), "postindex"), "postindex") : _.uniqBy(_.map(this.addresses, "postindex"), "postindex");
    },

    faculties() {
      return _.uniqBy(_.map(this.curriculums, "faculty"), "faculty");
    },

    specialities() {
      return this.object.faculty ? _.uniqBy(_.map(_.filter(this.curriculums, { faculty: { faculty: this.object.faculty } }), "speciality"), "speciality") :
        _.uniqBy(_.map(this.curriculums, "speciality"), "speciality");
    },

    courses() {
      return this.object.speciality ? _.uniqBy(_.filter(this.curriculums, { faculty: { faculty: this.object.faculty },
        speciality: { speciality: this.object.speciality } }), "course") : _.sortBy(_.uniqBy(this.curriculums, "course"), "course");
    },

    groups() {
      return this.object.course ? _.uniqBy(_.filter(this.curriculums, { faculty: { faculty: this.object.faculty },
        speciality: { speciality: this.object.speciality }, course: this.object.course }), "group") :
        _.uniqBy(this.curriculums, "group");
    }
  },

  // watch: {
  //   studentObject: {
  //     immediate: true,
  //     handler(value) {
  //       this.object = _.cloneDeep(value);
  //     }
  //   }
  // },

  created() {
    this.object = { ...this.studentObject };
  },

  async mounted() {
    await this.getAddressData();
    await this.getCurriculumData();

    this.dropdownList = {
      city: this.cities,
      street: this.streets
    };
  },

  methods: {
    ...mapActions({
      getAddressData: "addressModule/getAddressData",
      getCurriculumData: "curriculumModule/curriculumData",
      createStudent: "studentModule/addNewStudent",
      updateStudent: "studentModule/updateStudent"
    }),

    getValue(property) {
      return _.get(this.object, property);
    },

    setProperty(property, event) {
      _.set(this.object, property, event.target.value);
    },

    saveSudentData() {
      console.log(this.object);
      // if (object.fullName && object.city && object.street && object.postindex
      //  && object.faculty && object.speciality && object.course && object.group
      //   && object.phone && object.email) {
      //   if (object.id) {
      //     this.updateStudent(object);
      //   }
      //   else {
      //     this.createStudent(object);
      //   }
      //   this.$emit("close");
      // }
      // else {
      //   alert("Заполните все поля!");
      // }
    }
  }
};
</script>

<style scoped>
</style>