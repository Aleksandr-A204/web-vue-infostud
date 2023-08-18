<template>
  <Modal
    :title="curriculumObject?.id ? 'Редактирование учебного плана' : 'Создание учебного плана'"
    :current-object="curriculumObject"
    :rows="rows"
    :list="{faculty: faculties, speciality: specialities, course: courses, group: groups}"
    @close="$emit('close')"
    @saveData="saveCurriculumData"
  />
</template>

<script>
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
      rows: [
        { label: "Факультет", property: "faculty", formType: "select" },
        { label: "Специальность", property: "speciality", formType: "select" },
        { label: "Курс", property: "course", formType: "select" },
        { label: "Группа", property: "group", formType: "select" }
      ]
    };
  },

  computed: {
    ...mapGetters({
      faculties: "facultyModule/faculties",
      specialities: "specialityModule/specialities",
      courses: "courseModule/courses",
      groups: "groupModule/groups"
    })
  },

  async mounted() {
    await this.getFacultyData();
    await this.getSpecialityData();
    await this.getCourseData();
    await this.getGroupData();
  },

  methods: {
    ...mapActions({
      getFacultyData: "facultyModule/getFacultyData",
      getSpecialityData: "specialityModule/getSpecialityData",
      getCourseData: "courseModule/getCourseData",
      getGroupData: "groupModule/getGroupData",
      createCurriculum: "curriculumModule/createCurriculum",
      updateCurriculum: "curriculumModule/updateCurriculum"
    }),

    saveCurriculumData() {
      if (this.currentObject.id) {
        this.updateCurriculum(this.currentObject);
      }
      else {
        this.createCurriculum(this.currentObject);
      }

      this.$emit("close");
    }
  }
};
</script>

<style scoped>
</style>