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
      >
        <template #actions="{index, element}">
          <CustomButton @click="editStudent(element)">
            <Icon icon="pen-to-square" />
          </CustomButton>

          <RouterLink
            :key="`page-${index}`"
            :to="{name: 'main.students.pages', params: {id: index + 1}}"
          >
            <CustomButton>
              <Icon icon="file-lines" />
            </CustomButton>
          </RouterLink>

          <CustomButton @click="confirmDeleteStudent(element.id)">
            <Icon icon="trash" />
          </CustomButton>
        </template>
      </CustomTable>

      <StudentModal
        v-if="showModal"
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
          sort: "None"
        },
        {
          label: "Город",
          property: "city.city",
          sort: "None"
        },
        {
          label: "Улица",
          property: "street",
          sort: "None"
        },
        {
          label: "Почтовый индекс",
          property: "postindex",
          sort: "None"
        },
        {
          label: "Факультет",
          property: "faculty",
          sort: "None"
        },
        {
          label: "Специальность",
          property: "speciality",
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
          label: "Телефон",
          property: "phone",
          sort: "None"
        },
        {
          label: "Электронная почта",
          property: "email",
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
    await this.getStudents();
  },

  methods: {
    ...mapActions({
      deleteStudent: "studentModule/deleteStudent",
      getStudents: "studentModule/getStudents"
    }),

    addStudent() {
      this.studentObject = {
        fullName: null,
        cityId: null,
        street: null,
        postindex: null,
        faculty: null,
        speciality: null,
        course: null,
        group: null,
        phone: null,
        email: null
      };

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
      this.studentObject = selectedStudent;

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
