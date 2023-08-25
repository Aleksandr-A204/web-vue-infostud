<template>
  <Modal
    :title="studentObject?.id ? 'Редактирование студента' : 'Создание студента'"
    :rows="rows"
    :object="studentObject"
    :dropdown="{city: cities, street: streets, postindex: postindexes, faculty: faculties, speciality: specialities, course: courses, group: groups}"
    @close="$emit('close')"
    @saveData="saveSudentData"
  >
    <!-- <div
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
            selected
            hidden
          />
          <option
            v-for="(element, secondIndex) of dropdown(row.property)"
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
    </div> -->
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
      return this.studentObject.city ? _.uniqBy(_.map(_.filter(this.addresses, { city: { city: this.studentObject.city } }), "street"), "street") :
        _.uniqBy(_.map(this.addresses, "street"), "street");
    },

    postindexes() {
      return this.studentObject.street ? _.uniqBy(_.map(_.filter(this.addresses, { city: { city: this.studentObject.city },
        street: { street: this.studentObject.street } }), "postindex"), "postindex") : _.uniqBy(_.map(this.addresses, "postindex"), "postindex");
    },

    faculties() {
      return _.uniqBy(_.map(this.curriculums, "faculty"), "faculty");
    },

    specialities() {
      return this.studentObject.faculty ? _.uniqBy(_.map(_.filter(this.curriculums, { faculty: { faculty: this.studentObject.faculty } }), "speciality"), "speciality") :
        _.uniqBy(_.map(this.curriculums, "speciality"), "speciality");
    },

    courses() {
      return this.studentObject.speciality ? _.uniqBy(_.filter(this.curriculums, { faculty: { faculty: this.studentObject.faculty },
        speciality: { speciality: this.studentObject.speciality } }), "course") : _.sortBy(_.uniqBy(this.curriculums, "course"), "course");
    },

    groups() {
      return this.studentObject.course ? _.uniqBy(_.filter(this.curriculums, { faculty: { faculty: this.studentObject.faculty },
        speciality: { speciality: this.studentObject.speciality }, course: this.studentObject.course }), "group") :
        _.uniqBy(this.curriculums, "group");
    }
  },

  async mounted() {
    await this.$store.dispatch("addressModule/keywordSearch", "");
    await this.$store.dispatch("curriculumModule/keywordSearch", "");
  },

  methods: {
    ...mapActions({
      getAddressData: "addressModule/getAddressData",
      getCurriculumData: "curriculumModule/curriculumData",
      createStudent: "studentModule/addNewStudent",
      editStudent: "studentModule/editStudent"
    }),

    saveSudentData(object) {
      if (object.fullName && object.city && object.street && object.postindex
       && object.faculty && object.speciality && object.course && object.group
        && object.phone && object.email) {
        if (object.id) {
          this.editStudent(object);
        }
        else {
          this.createStudent(object);
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
