<template>
  <SlotModal>
    <div class="inside-modal__content">
      <div>
        <p>Студент</p>
        <div class="block-group">
          <label class="form-label">ФИО:</label>
          <input
            v-model="currentObject.fullname"
            type="text"
            class="form-control"
          >
        </div>
        <p>Адрес</p>
        <div class="block-group">
          <label class="form-label">Город:</label>
          <select
            v-model="currentObject.address.city"
            class="form-select"
            @click="citySelect"
          >
            <option
              v-for="c in cities"
              :key="c.id"
            >
              {{ c.City }}
            </option>
          </select>
        </div>
        <div
          v-if="currentObject.address.city"
          class="block-group"
        >
          <label class="form-label">Улица:</label>
          <select
            v-model="currentObject.address.street"
            class="form-select"
            @click="streetSelect"
          >
            <option
              v-for="s in streets"
              :key="s.id"
            >
              {{ s.Street }}
            </option>
          </select>
        </div>
        <div
          v-if="currentObject.address.street"
          class="block-group"
        >
          <label class="form-label">Почтовый индекс:</label>
          <select
            v-model="currentObject.address.postindex"
            class="form-select"
          >
            <option
              v-for="postindex in postindexes"
              :key="postindex.id"
            >
              {{ postindex.PostIndex }}
            </option>
          </select>
        </div>
        <p>Учебный план</p>
        <div class="block-group">
          <label class="form-label">Факультет:</label>
          <select
            v-model="currentObject.curriculum.faculty"
            class="form-select"
            @click="facultySelect"
          >
            <option
              v-for="f in faculties"
              :key="f.id"
            >
              {{ f.Faculty }}
            </option>
          </select>
        </div>
        <div
          v-if="currentObject.curriculum.faculty"
          class="block-group"
        >
          <label class="form-label">Специальность:</label>
          <select
            v-model="currentObject.curriculum.speciality"
            class="form-select"
            @click="specialitySelect"
          >
            <option
              v-for="s in specialities"
              :key="s.id"
            >
              {{ s.Speciality }}
            </option>
          </select>
        </div>
        <div
          v-if="currentObject.curriculum.speciality"
          class="block-group"
        >
          <label class="form-label">Курс:</label>
          <select
            v-model="currentObject.curriculum.course"
            class="form-select"
            @click="courseSelect"
          >
            <option
              v-for="c in courses"
              :key="c.id"
            >
              {{ c.Course }}
            </option>
          </select>
        </div>
        <div
          v-if="currentObject.curriculum.course"
          class="block-group"
        >
          <label class="form-label">Группа:</label>
          <div class="search-box">
            <input
              v-model="wordByGroup"
              class="form-control"
              type="text"
              @input="wordByGroupInput"
            >
            <table
              class="drop-down-list hidden"
            >
              <tbody>
                <tr
                  v-for="g in groups"
                  :key="g.id"
                  @click="eventPopurList"
                >
                  <td class="rows-box">
                    {{ g.Group }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>Контакт</p>
        <div class="block-group">
          <label class="form-label">Номер телефона:</label>
          <input
            v-model="currentObject.contact.phone"
            type="text"
            class="form-control"
          >
        </div>
        <div class="block-group">
          <label class="form-label">Эл. почта:</label>
          <input
            v-model="currentObject.contact.email"
            type="text"
            class="form-control"
          >
        </div>
      </div>
    </div>

    <div class="inside-modal__footer">
      <button
        class="button"
        @click="closeModal"
      >
        Отмена
      </button>
      <button
        class="button"
        @click="saveSudentData"
      >
        Сохранить
      </button>
    </div>
  </SlotModal>
</template>

<script>
import _ from "lodash";
import SlotModal from "./Modal.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    SlotModal
  },

  props: {
    titleModal: {
      type: String,
      default: "Студент"
    },

    studentObject: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      currentObject: null,
      city: null,
      street: null,
      faculty: null,
      speciality: null,
      course: null,
      wordByGroup: ""
    };
  },

  computed: {
    ...mapGetters({
      addresses: "addressModule/addresses",
      courses: "curriculumModule/courses",
      curriculums: "curriculumModule/curriculums"
    }),

    cities() {
      return _.uniqBy(_.map(this.addresses, "City"), "City");
    },

    courses() {
      return this.speciality ? _.uniqBy(_.map(_.filter(this.curriculums, { Faculty: { Faculty: this.faculty }, Speciality: { Speciality: this.speciality } }), "Course"), "Course") :
        _.sortBy(_.uniqBy(_.map(this.curriculums, "Course"), "Course"), "Course");
    },

    faculties() {
      return _.uniqBy(_.map(this.curriculums, "Faculty"), "Faculty");
    },

    groups() {
      if (this.wordByGroup === "") {
        return this.course ? _.uniqBy(_.map(_.filter(this.curriculums, { Faculty: { Faculty: this.faculty },
          Speciality: { Speciality: this.speciality }, Course: { Course: this.course } }), "Group"), "Group") : _.uniqBy(_.map(this.curriculums, "Group"), "Group");
      }
      else {
        return _.uniqBy(_.map(_.filter(this.curriculums.filter(c => {
          return c.Group.Group?.toLowerCase().includes(this.wordByGroup.toLowerCase());
        }), { Faculty: { Faculty: this.faculty }, Speciality: { Speciality: this.speciality }, Course: { Course: this.course } }), "Group"), "Group");
      }
    },

    postindexes() {
      return this.street ? _.uniqBy(_.map(_.filter(this.addresses, { City: { City: this.city }, Street: { Street: this.street } }), "Postindex"), "PostIndex") :
        _.uniqBy(_.map(this.addresses, "Postindex"), "PostIndex");
    },

    specialities() {
      if (this.faculty) {
        return _.uniqBy(_.map(_.filter(this.curriculums, { Faculty: { Faculty: this.faculty } }), "Speciality"), "Speciality");
      }
      else {
        return _.uniqBy(_.map(this.curriculums, "Speciality"), "Speciality");
      }
    },

    streets() {
      return this.city ? _.uniqBy(_.map(_.filter(this.addresses, { City: { City: this.city } }), "Street"), "Street") : _.uniqBy(_.map(this.addresses, "Street"), "Street");
    }
  },

  created() {
    this.currentObject = {
      address: {
        city: this.studentObject?.City,
        postindex: this.studentObject?.Postindex,
        street: this.studentObject?.Street
      },
      curriculum: {
        faculty: this.studentObject?.Faculty,
        speciality: this.studentObject?.Speciality,
        course: this.studentObject?.Course,
        group: this.studentObject?.Group
      },
      contact: {
        phone: this.studentObject?.Contact.Phone,
        email: this.studentObject?.Contact.Email
      },
      fullname: this.studentObject?.FullName,
      id: this.studentObject?.Id
    };

    if (this.currentObject.id) {
      this.wordByGroup = this.currentObject.curriculum.group;
    }
  },

  async mounted() {
    await this.getAddressData();
    await this.getCurriculumData();
  },

  methods: {
    ...mapActions({
      getAddressData: "addressModule/getAddressData",
      getCurriculumData: "curriculumModule/curriculumData",
      addNewStudent: "studentModule/addNewStudent",
      updateStudent: "studentModule/updateStudent"
    }),

    eventPopurList(event) {
      this.wordByGroup = event.target.innerText;

      event.srcElement.offsetParent.classList.toggle("hidden", true);
    },

    citySelect(event) {
      if (!event.pointerId) {
        if (event.target.value !== this.city) {
          this.currentObject.address.street = null;
          this.currentObject.address.postindex = null;
        }

        this.city = event.target.value;
      }
    },

    streetSelect(event) {
      if (!event.pointerId) {
        if (event.target.value !== this.street) {
          this.currentObject.address.postindex = null;
        }

        this.street = event.target.value;
      }
    },

    facultySelect(event) {
      if (!event.pointerId) {
        if (event.target.value !== this.faculty) {
          this.currentObject.curriculum.speciality = null;
          this.currentObject.curriculum.course = null;
          this.wordByGroup = "";
        }

        this.faculty = event.target.value;
      }
    },

    specialitySelect(event) {
      if (!event.pointerId) {
        if (event.target.value !== this.speciality) {
          this.currentObject.curriculum.course = null;
          this.wordByGroup = "";
        }

        this.speciality = event.target.value;
      }
    },

    courseSelect(event) {
      if (!event.pointerId) {
        if (event.target.value !== this.course) {
          this.wordByGroup = "";
        }

        this.course = event.target.value;
      }
    },

    closeModal() {
      this.$emit("closeModal");
    },

    saveSudentData() {
      if (this.currentObject.fullname && this.currentObject.address.city && this.currentObject.address.street && this.currentObject.address.postindex
       && this.currentObject.curriculum.faculty && this.currentObject.curriculum.speciality && this.currentObject.curriculum.course && this.currentObject.curriculum.group
        && this.currentObject.contact.phone && this.currentObject.contact.email) {
        if (this.currentObject.id) {
          this.updateStudent(this.currentObject);
        }
        else {
          this.addNewStudent(this.currentObject);
        }
        this.closeModal();
      }
      else {
        alert("Заполните все поля!");
      }
    },

    wordByGroupInput(event) {
      const tableElement = event.target.nextElementSibling.classList;
      event.target.value === "" ? tableElement.toggle("hidden", true) : tableElement.toggle("hidden", false);
    }
  }
};
</script>

<style scoped>
</style>