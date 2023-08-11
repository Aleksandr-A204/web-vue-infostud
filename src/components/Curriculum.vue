<template>
  <div>
    <Search
      :value="getKeywordSearch"
      @input="setKeywordSearch"
    >
      <button
        class="button"
        @click="showAddModal = true"
      >
        Добавить курс обучения
      </button>
    </Search>

    <CustomTable
      :columns="columns"
      :elements="curriculums"
      @columnClick="columnClick"
    >
      <template #actions="{ element }">
        <button
          class="button"
          @click="editCurriculum(element)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        </button>
        <button
          class="button"
          @click="confirmDeleteCurriculum(element.Id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            class="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
          </svg>
        </button>
      </template>
    </CustomTable>

    <CurriculumModal
      v-if="showAddModal"
      @close="showAddModal = false"
    />

    <CurriculumModal
      v-if="showEditModal"
      :curriculum-object="selectedCurriculum"
      @close="showEditModal = false"
    />
  </div>
</template>

<script>
import CurriculumModal from "../modal/CurriculumModal.vue";
import { mapActions, mapGetters } from "vuex";

import CustomTable from "./Table.vue";
import Search from "./Search.vue";

export default {
  components: {
    CurriculumModal,
    CustomTable,
    Search
  },

  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      columns: [
        {
          label: "Id",
          property: "Id",
          sort: "None"
        },
        {
          label: "Факультет",
          property: "Faculty.Faculty",
          sort: "None"
        },
        {
          label: "Специальность",
          property: "Speciality.Speciality",
          sort: "None"
        },
        {
          label: "Курс",
          property: "Course.Course",
          sort: "None"
        },
        {
          label: "Группа",
          property: "Group.Group",
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

    editCurriculum(selectedCurriculum) {
      this.selectedCurriculum = selectedCurriculum;

      this.showEditModal = true;
    },

    async confirmDeleteCurriculum(curriculumId) {
      if (confirm("Вы действительно хотите удалить этот курс обучения?")) {
        this.deleteCurriculum(curriculumId);
      }
    },

    columnClick(currentColumn) {
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

      this.$store.dispatch("studentModule/sort", currentColumn);
    },

    setKeywordSearch(value) {
      this.$store.dispatch("curriculumModule/keywordSearch", value);
    }
  }
};
</script>

<style scoped lang="scss">
</style>