<template>
  <div>
    <InputAndTableStyle>
      <div>
        <input
          :value="getKeywordSearch"
          class="input-filter"
          placeholder="Поиск"
          @input="setKeywordSearch"
        >
        <button
          class="button"
          @click="showAddModal = true"
        >
          Добавить студента
        </button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="table__head-cell">
              ФИО
            </th>
            <th class="table__head-cell">
              Город
            </th>
            <th class="table__head-cell">
              Почтовый индекс
            </th>
            <th class="table__head-cell">
              Улица
            </th>
            <th class="table__head-cell">
              Факультет
            </th>
            <th class="table__head-cell">
              Специальность
            </th>
            <th class="table__head-cell">
              Курс
            </th>
            <th class="table__head-cell">
              Группа
            </th>
            <th class="table__head-cell">
              Телефон
            </th>
            <th class="table__head-cell">
              Эл. почта
            </th>
            <th class="table__head-cell">
              Параметры
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="student in students"
            :key="student.Id"
          >
            <td class="table__body-cell">
              {{ student.FullName }}
            </td>
            <td class="table__body-cell">
              {{ student.City }}
            </td>
            <td class="table__body-cell">
              {{ student.Postindex }}
            </td>
            <td class="table__body-cell">
              {{ student.Street }}
            </td>
            <td class="table__body-cell">
              {{ student.Faculty }}
            </td>
            <td class="table__body-cell">
              {{ student.Speciality }}
            </td>
            <td class="table__body-cell">
              {{ student.Course }}
            </td>
            <td class="table__body-cell">
              {{ student.Group }}
            </td>
            <td class="table__body-cell">
              {{ student.Contact.Phone }}
            </td>
            <td class="table__body-cell">
              {{ student.Contact.Email }}
            </td>
            <td class="table__body-cell">
              <div class="button-option">
                <button
                  class="button"
                  @click="editStudent(student)"
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
                  @click="confirmDeleteStudent(student.Id)"
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
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </InputAndTableStyle>

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
import InputAndTableStyle from "./InputAndTableStyle.vue";
import StudentModal from "../modal/StudentModal.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    InputAndTableStyle,
    StudentModal
  },

  data() {
    return {
      showAddModal: false,
      showEditModal: false
    };
  },

  computed: {
    ...mapGetters({
      students: "studentModule/students",
      getKeywordSearch: "studentModule/keywordSearch"
    })
  },

  async mounted() {
    await this.getStudentData();
  },

  methods: {
    ...mapActions({
      deleteStudent: "studentModule/deleteStudent",
      getStudentData: "studentModule/getStudentData"
    }),

    confirmDeleteStudent(studentId) {
      if (confirm("Вы действительно хотите удалить студента?")) {
        this.deleteStudent(studentId);
      }
    },

    editStudent(selectedStudent) {
      this.studentObject = selectedStudent;

      this.showEditModal = true;
    },

    setKeywordSearch(event) {
      this.$store.dispatch("studentModule/keywordSearch", event.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
</style>