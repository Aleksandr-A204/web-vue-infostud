<template>
  <Modal
    :title="curriculumObject?.id ? 'Редактирование учебного плана' : 'Создание учебного плана'"
    @close="$emit('close')"
    @saveData="saveCurriculumData"
  >
    <ContentRow custom-key="faculty">
      <CustomLabel>Факультет</CustomLabel>
      <CustomSelect
        :value="getValue('faculty', true)"
        :options="faculties"
        property="faculty"
        :is-id="true"
        @input="event => setValue(event, 'facultyId')"
      />
    </ContentRow>

    <ContentRow custom-key="speciality">
      <CustomLabel>Специальность</CustomLabel>
      <CustomSelect
        :value="getValue('speciality', true)"
        :options="specialities"
        property="speciality"
        :is-id="true"
        @input="event => setValue(event, 'specialityId')"
      />
    </ContentRow>

    <ContentRow custom-key="course">
      <CustomLabel>Курс</CustomLabel>
      <CustomSelect
        :value="getValue('course')"
        :options="getMapedCourses()"
        @input="event => setValue(event, 'course')"
      />
    </ContentRow>

    <ContentRow custom-key="group">
      <CustomLabel>Группа</CustomLabel>
      <CustomInput
        :value="getValue('group')"
        @input="event => setValue(event, 'group')"
      />
    </ContentRow>
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
      object: null
    };
  },

  computed: {
    ...mapGetters({
      faculties: "facultyModule/faculties",
      specialities: "specialityModule/specialities",
      courses: "courseModule/courses"
    })
  },

  watch: {
    curriculumObject: {
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
    await this.facultyData();
    await this.specialityData();
    await this.courseData();
  },

  methods: {
    ...mapActions({
      facultyData: "facultyModule/getFacultyData",
      specialityData: "specialityModule/getSpecialityData",
      courseData: "courseModule/getCourseData",
      createCurriculum: "curriculumModule/createCurriculum",
      updateCurriculum: "curriculumModule/updateCurriculum"
    }),

    getMapedCourses() {
      return _.map(this.courses, "course");
    },

    getValue(property, isId = false) {
      return isId ? _.get(this.object, `${property}.${property}`) : _.get(this.object, property);
    },

    setValue(event, property) {
      _.set(this.object, property, event.target.value);
    },

    saveCurriculumData() {
      if (this.object.facultyId && this.object.specialityId && this.object.course && this.object.group) {
        if (this.object.id) {
          this.updateCurriculum(this.object);
        }
        else {
          this.createCurriculum(this.object);
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
