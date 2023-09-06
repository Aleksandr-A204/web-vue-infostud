<template>
  <div>
    <Search
      :value="getKeywordSearch"
      @input="value => $store.dispatch('curriculumModule/keywordSearch', value)"
    />

    <CustomButton @click="addCurriculum()">
      Добавить курс обучения
    </CustomButton>

    <CustomTable
      :columns="columns"
      :elements="curriculums"
      @columnClick="columnClick"
    >
      <template #actions="{element}">
        <CustomButton
          icon="pen-to-square"
          @click="editCurriculum(element)"
        />

        <CustomButton
          icon="trash"
          @click="confirmDeleteCurriculum(element.id)"
        />
      </template>
    </CustomTable>

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
      columns: [
        {
          label: "Факультет",
          property: "faculty.faculty",
          sort: "None"
        },
        {
          label: "Специальность",
          property: "speciality.speciality",
          sort: "None"
        },
        {
          label: "Курс",
          property: "course",
          sort: "None"
        },
        {
          label: "Группа",
          property: "group",
          sort: "None"
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
    }
  }
};
</script>

<style scoped lang="scss">
</style>
