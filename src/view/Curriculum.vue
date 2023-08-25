<template>
  <div>
    <Search
      :value="getKeywordSearch"
      @input="setKeywordSearch"
    />

    <CustomButton @click="addCurriculum()">
      Добавить курс обучения
    </CustomButton>

    <CustomTable
      :columns="columns"
      :elements="curriculums"
      @columnClick="columnClick"
      @editElement="editCurriculum"
      @deleteElement="confirmDeleteCurriculum"
    />

    <CurriculumModal
      v-if="showModal"
      :curriculum-object="selectedCurriculum"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import CurriculumModal from "../modal/CurriculumModal.vue";

export default {
  components: {
    CurriculumModal
  },

  data() {
    return {
      showModal: false,
      selectedCurriculum: {},
      columns: [
        {
          label: "Факультет",
          property: "faculty.faculty"
        },
        {
          label: "Специальность",
          property: "speciality.speciality"
        },
        {
          label: "Курс",
          property: "course"
        },
        {
          label: "Группа",
          property: "group"
        },
        {
          label: "Действия",
          property: "actions"
        }
      ]
    };
  },

  computed: mapGetters({
    curriculums: "curriculumModule/curriculums",
    getKeywordSearch: "curriculumModule/keywordSearch"
  }),

  async mounted() {
    await this.getCurriculumData();
  },

  methods: {
    ...mapActions({
      deleteCurriculum: "curriculumModule/deleteCurriculum",
      getCurriculumData: "curriculumModule/curriculumData"
    }),

    addCurriculum() {
      this.selectedCurriculum = {
        facultyId: null,
        specialityId: null,
        course: null,
        group: null
      };

      this.showModal = true;
    },

    editCurriculum(curriculum) {
      this.selectedCurriculum = curriculum;

      this.showModal = true;
    },

    async confirmDeleteCurriculum(curriculumId) {
      if (confirm("Вы действительно хотите удалить этот курс обучения?")) {
        this.deleteCurriculum(curriculumId);
      }
    },

    async columnClick(currentColumn) {
      for (const column of this.columns) {
        if (column.sort && column.property !== currentColumn.property) {
          column.sort = "None";
        }
      }

      switch (currentColumn.sort) {
      case "None":
        currentColumn.sort = "Asc";
        break;
      case "Asc":
        currentColumn.sort = "Desc";
        break;
      case "Desc":
        currentColumn.sort = "None";
        break;
      }

      await this.getCurriculumData(currentColumn);
    },

    setKeywordSearch(value) {
      this.$store.dispatch("curriculumModule/keywordSearch", value);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
