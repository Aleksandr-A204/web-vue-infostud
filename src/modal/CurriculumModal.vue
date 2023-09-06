<template>
  <Modal
    :title="curriculumObject?.id ? 'Редактирование учебного плана' : 'Создание учебного плана'"
    @close="$emit('close')"
    @saveData="saveCurriculumData"
  >
    <RowWithLabel label="Факультет">
      <CustomSelect
        :options="faculties"
        track-by="value"
        label="display"
        :value="object.facultyId"
        @input="value => setValue(value, 'facultyId')"
      />
    </RowWithLabel>

    <RowWithLabel label="Специальность">
      <CustomSelect
        :options="specialities"
        track-by="value"
        label="display"
        :value="object.specialityId"
        @input="value => setValue(value, 'specialityId')"
      />
    </RowWithLabel>

    <RowWithLabel label="Курс">
      <CustomSelect
        :value="object.course"
        :options="courses"
        @input="value => setValue(value, 'course')"
      />
    </RowWithLabel>

    <RowWithLabel label="Группа">
      <CustomInput
        :value="object.group"
        @input="value => setValue(value, 'group')"
      />
    </RowWithLabel>
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
      faculties: "facultyModule/mapedFaculties",
      specialities: "specialityModule/mapedSpecialities",
      courses: "courseModule/courses"
    })
  },

  watch: {
    curriculumObject: {
      immediate: true,
      handler(value) {
        this.object = _.cloneDeep(value);

        delete this.object.faculty;
        delete this.object.speciality;
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

    getValue(property) {
      return _.isObject(this.object[property]) ? _.get(this.object, `${property}.${property}`) : _.get(this.object, property);
    },

    setValue(value, property) {
      _.set(this.object, property, value);
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
