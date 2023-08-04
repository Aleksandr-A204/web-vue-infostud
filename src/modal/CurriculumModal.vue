<template>
  <SlotModal
    :current-object="curriculumObject"
    @close="$emit('close')"
    @saveData="saveCurriculumData"
  >
    <div class="inside-modal__content">
      <div>
        <div class="block-group">
          <label class="label-group">Факультет:</label>
          <select
            v-model="currentObject.facultyId"
            class="form-select"
          >
            <option
              v-for="f in faculties"
              :key="f.Id"
              :value="f.Id"
            >
              {{ f.Faculty }}
            </option>
          </select>
        </div>
        <div class="block-group">
          <label class="label-group">Специальность:</label>
          <select
            v-model="currentObject.specialityId"
            class="form-select"
          >
            <option
              v-for="s in specialities"
              :key="s.Id"
              :value="s.Id"
            >
              {{ s.Speciality }}
            </option>
          </select>
        </div>
        <div class="block-group">
          <label class="label-group">Курс:</label>
          <select
            v-model="currentObject.courseId"
            class="form-select"
          >
            <option
              v-for="c in courses"
              :key="c.Id"
              :value="c.Id"
            >
              {{ c.Course }}
            </option>
          </select>
        </div>
        <div class="block-group">
          <label class="label-group">Группа:</label>
          <select
            v-model="currentObject.groupId"
            class="form-select"
          >
            <option
              v-for="g in groups"
              :key="g.Id"
              :value="g.Id"
            >
              {{ g.Group }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </SlotModal>
</template>

<script>
import SlotModal from "./Modal.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    SlotModal
  },

  props: {
    curriculumObject: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      currentObject: null
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

  created() {
    this.currentObject = {
      facultyId: this.curriculumObject?.FacultyId,
      id: this.curriculumObject?.Id,
      specialityId: this.curriculumObject?.SpecialityId,
      courseId: this.curriculumObject?.CourseId,
      groupId: this.curriculumObject?.GroupId
    };
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