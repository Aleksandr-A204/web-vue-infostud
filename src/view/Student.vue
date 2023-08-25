<template>
  <div>
    <div v-if="!$route.path.includes('pages')">
      <Search
        :value="keywordSearch"
        @input="setKeywordSearch"
      />

      <CustomButton @click="addStudent()">
        Добавить студента
      </CustomButton>

      <CustomTable
        :columns="columns"
        :elements="students"
        @columnClick="columnClick"
        @editElement="editStudent"
        @deleteElement="confirmDeleteStudent"
      >
        <template #default="{index}">
          <RouterLink
            :key="`page-${index}`"
            :to="{name: 'main.students.pages', params: {id: index + 1}}"
          >
            <CustomButton>
              <Icon icon="file-lines" />
            </CustomButton>
          </RouterLink>
        </template>
      </CustomTable>

      <StudentModal
        v-if="showModal"
        :rows="columns.toSpliced(-1)"
        :student-object="studentObject"
        @close="showModal = false"
      />
    </div>

    <RouterView />
  </div>
</template>

<script>
import StudentModal from "../modal/StudentModal.vue";
import { mapActions, mapGetters } from "vuex";

import _ from "lodash";

export default {
  components: {
    StudentModal
  },

  data() {
    return {
      showModal: false,
      columns: [
        {
          label: "ФИО",
          property: "fullName",
          sort: "None",
          formType: "input"
        },
        {
          label: "Город",
          property: "city",
          sort: "None",
          formType: "select"
        },
        {
          label: "Улица",
          property: "street",
          sort: "None",
          formType: "select"
        },
        {
          label: "Почтовый индекс",
          property: "postindex",
          sort: "None",
          formType: "select"
        },
        {
          label: "Факультет",
          property: "faculty",
          sort: "None",
          formType: "select"
        },
        {
          label: "Специальность",
          property: "speciality",
          sort: "None",
          formType: "select"
        },
        {
          label: "Курс",
          property: "course",
          sort: "None",
          formType: "select"
        },
        {
          label: "Группа",
          property: "group",
          sort: "None",
          formType: "select"
        },
        {
          label: "Телефон",
          property: "phone",
          sort: "None",
          formType: "input"
        },
        {
          label: "Электронная почта",
          property: "email",
          sort: "None",
          formType: "input"
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
    await this.getStudents();
  },

  methods: {
    ...mapActions({
      deleteStudent: "studentModule/deleteStudent",
      getStudents: "studentModule/getStudents"
    }),

    addStudent() {
      this.studentObject = { };

      this.showModal = true;
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

      await this.getStudents(currentColumn);
    },

    confirmDeleteStudent(studentId) {
      if (confirm("Вы действительно хотите удалить студента?")) {
        this.deleteStudent(studentId);
      }
    },

    editStudent(selectedStudent) {
      this.studentObject = _.cloneDeep(selectedStudent);

      this.showModal = true;
    },

    setKeywordSearch(value) {
      this.$store.dispatch("studentModule/keywordSearch", value);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
