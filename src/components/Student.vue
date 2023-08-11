<template>
  <div>
    <Search
      :value="keywordSearch"
      @input="setKeywordSearch"
    >
      <button
        class="button"
        @click="showAddModal = true"
      >
        Добавить студента
      </button>
    </Search>

    <CustomTable
      :columns="columns"
      :elements="students"
      @columnClick="columnClick"
    >
      <template #actions="{ element }">
        <button
          class="button"
          @click="editStudent(element)"
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
          @click="confirmDeleteStudent(element.Id)"
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

    <StudentModal
      v-if="showAddModal"
      @close="showAddModal = false"
    />

    <StudentModal
      v-if="showEditModal"
      :student-object="studentObject"
      @close="showEditModal = false"
    />
  </div>
</template>

<script>
import StudentModal from "../modal/StudentModal.vue";
import { mapActions, mapGetters } from "vuex";

import CustomTable from "./Table.vue";
import Search from "./Search.vue";

export default {
  components: {
    Search,
    StudentModal,
    CustomTable
  },

  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      columns: [
        {
          label: "ФИО",
          property: "FullName",
          sort: "None"
        },
        {
          label: "Город",
          property: "City",
          sort: "None"
        },
        {
          label: "Почтовый индекс",
          property: "Postindex",
          sort: "None"
        },
        {
          label: "Улица",
          property: "Street",
          sort: "None"
        },
        {
          label: "Факультет",
          property: "Faculty",
          sort: "None"
        },
        {
          label: "Специальность",
          property: "Speciality",
          sort: "None"
        },
        {
          label: "Курс",
          property: "Course",
          sort: "None"
        },
        {
          label: "Группа",
          property: "Group",
          sort: "None"
        },
        {
          label: "Телефон",
          property: "Phone",
          sort: "None"
        },
        {
          label: "Электронная почта",
          property: "Email",
          sort: "None"
        },
        {
          label: "Действия",
          property: "actions"
        }
      ]
    };
  },

  computed: {
    ...mapGetters({
      students: "studentModule/students",
      keywordSearch: "studentModule/keywordSearch"
    })
  },

  async mounted() {
    await this.getAllStudents();
  },

  methods: {
    ...mapActions({
      deleteStudent: "studentModule/deleteStudent",
      getAllStudents: "studentModule/getAllStudents"
    }),

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

    confirmDeleteStudent(studentId) {
      if (confirm("Вы действительно хотите удалить студента?")) {
        this.deleteStudent(studentId);
      }
    },

    editStudent(selectedStudent) {
      this.studentObject = selectedStudent;

      this.showEditModal = true;
    },

    setKeywordSearch(value) {
      this.$store.dispatch("studentModule/keywordSearch", value);
    }
  }
};
</script>

<style scoped lang="scss">
</style>