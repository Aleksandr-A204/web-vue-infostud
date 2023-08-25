<template>
  <Modal
    :title="curriculumObject?.id ? 'Редактирование учебного плана' : 'Создание учебного плана'"
    @close="$emit('close')"
    @saveData="saveCurriculumData"
  >
    <div
      v-for="(row, index) of rows"
      :key="`content-row-${index}`"
      class="block-group"
    >
      <label class="form-label">{{ row.label }}</label>

      <select
        v-if="row.formType === 'select'"
        v-model="currentObject[row.property]"
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
      <input
        v-else
        v-model="currentObject[row.property]"
        type="text"
        class="form-control"
      >
    </div>
  </Modal>
</template>

<script>
import _ from "lodash";

import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    curriculumObject: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      currentObject: null,
      dropdownList: {},
      rows: [
        { label: "Факультет", property: "faculty", formType: "select" },
        { label: "Специальность", property: "speciality", formType: "select" },
        { label: "Курс", property: "course", formType: "select" },
        { label: "Группа", property: "group", formType: "input" }
      ]
    };
  },

  computed: {
    ...mapGetters({
      faculties: "facultyModule/faculties",
      specialities: "specialityModule/specialities",
      courses: "courseModule/courses"
    })
  },

  created() {
    this.currentObject = _.cloneDeep(this.curriculumObject);
  },

  async mounted() {
    await this.getFacultyData();
    await this.getSpecialityData();
    await this.getCourseData();
  },

  methods: {
    ...mapActions({
      getFacultyData: "facultyModule/getFacultyData",
      getSpecialityData: "specialityModule/getSpecialityData",
      getCourseData: "courseModule/getCourseData",
      createCurriculum: "curriculumModule/createCurriculum",
      updateCurriculum: "curriculumModule/updateCurriculum"
    }),

    dropdown(property) {
      this.dropdownList.faculty = this.faculties;
      this.dropdownList.speciality = this.specialities;
      this.dropdownList.course = this.courses;

      return _.get(this.dropdownList, property);
    },

    saveCurriculumData() {
      if (this.currentObject.facultyId) {
        if (this.currentObject.id) {
          this.updateCurriculum(this.currentObject);
        }
        else {
          this.createCurriculum(this.currentObject);
        }

        this.$emit("close");
      }
      else {
        console.log("Заполните все поля!");
      }
    }
  }
};
</script>

<style scoped>
</style>
