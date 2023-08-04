<template>
  <SlotModal
    :current-object="studentObject"
    @close="$emit('close')"
    @saveData="saveSudentData"
  >
    <div class="inside-modal__content">
      <div>
        <p class="p">
          Студент
        </p>
        <div class="block-group">
          <label class="form-label">ФИО:</label>
          <input
            v-model="currentObject.fullname"
            type="text"
            class="form-control"
          >
        </div>
        <p class="p">
          Адрес
        </p>
        <div class="block-group">
          <label class="form-label">Город:</label>
          <select
            v-model="currentObject.address.city"
            class="form-select"
            @click="hidenStreetAndIndex"
          >
            <option
              v-for="c of cities"
              :key="c.City"
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
            @click="hidenIndex"
          >
            <option
              v-for="s in streets"
              :key="s.Id"
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
              :key="postindex.Id"
            >
              {{ postindex.PostIndex }}
            </option>
          </select>
        </div>
        <p class="p">
          Учебный план
        </p>
        <div class="block-group">
          <label class="form-label">Факультет:</label>
          <select
            v-model="currentObject.curriculum.faculty"
            class="form-select"
            @click="hidenSpecialityCourseGroup"
          >
            <option
              v-for="f in faculties"
              :key="f.Id"
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
            @click="hidenCourseGroup"
          >
            <option
              v-for="s in specialities"
              :key="s.Id"
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
            @click="hidenGroup"
          >
            <option
              v-for="c in courses"
              :key="c.Id"
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
          <select
            v-model="currentObject.curriculum.group"
            class="form-select"
          >
            <option
              v-for="g in groups"
              :key="g.Id"
            >
              {{ g.Group }}
            </option>
          </select>
        </div>
        <p class="p">
          Контакт
        </p>
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
    studentObject: {
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
      addresses: "addressModule/addresses",
      courses: "curriculumModule/courses",
      curriculums: "curriculumModule/curriculums"
    }),

    cities() {
      return _.uniqBy(_.map(this.addresses, "City"), "City");
    },

    courses() {
      return this.currentObject.curriculum.speciality ? _.uniqBy(_.map(_.filter(this.curriculums, { Faculty: { Faculty: this.currentObject.curriculum.faculty },
        Speciality: { Speciality: this.currentObject.curriculum.speciality } }), "Course"), "Course") : _.sortBy(_.uniqBy(_.map(this.curriculums, "Course"), "Course"), "Course");
    },

    faculties() {
      return _.uniqBy(_.map(this.curriculums, "Faculty"), "Faculty");
    },

    groups() {
      return this.currentObject.curriculum.course ? _.uniqBy(_.map(_.filter(this.curriculums, { Faculty: { Faculty: this.currentObject.curriculum.faculty },
        Speciality: { Speciality: this.currentObject.curriculum.speciality }, Course: { Course: this.currentObject.curriculum.course } }), "Group"), "Group") :
        _.uniqBy(_.map(this.curriculums, "Group"), "Group");
    },

    postindexes() {
      return this.currentObject.address.street ? _.uniqBy(_.map(_.filter(this.addresses, { City: { City: this.currentObject.address.city },
        Street: { Street: this.currentObject.address.street } }), "Postindex"), "PostIndex") : _.uniqBy(_.map(this.addresses, "Postindex"), "PostIndex");
    },

    specialities() {
      return this.currentObject.curriculum.faculty ? _.uniqBy(_.map(_.filter(this.curriculums, { Faculty: { Faculty: this.currentObject.curriculum.faculty } }), "Speciality"), "Speciality") :
        _.uniqBy(_.map(this.curriculums, "Speciality"), "Speciality");
    },

    streets() {
      return this.currentObject.address.city ? _.uniqBy(_.map(_.filter(this.addresses, { City: { City: this.currentObject.address.city } }), "Street"), "Street") :
        _.uniqBy(_.map(this.addresses, "Street"), "Street");
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

    hidenStreetAndIndex(event) {
      if (!event.pointerId) {
        this.currentObject.address.street = null;
        this.currentObject.address.postindex = null;
      }
    },

    hidenIndex(event) {
      if (!event.pointerId) {
        this.currentObject.address.postindex = null;
      }
    },

    hidenSpecialityCourseGroup(event) {
      if (!event.pointerId) {
        this.currentObject.curriculum.speciality = null;
        this.currentObject.curriculum.course = null;
        this.currentObject.curriculum.group = null;
      }
    },

    hidenCourseGroup(event) {
      if (!event.pointerId) {
        this.currentObject.curriculum.course = null;
        this.currentObject.curriculum.group = null;
      }
    },

    hidenGroup(event) {
      if (!event.pointerId) {
        this.currentObject.curriculum.group = null;
      }
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
        this.$emit("close");
      }
      else {
        alert("Заполните все поля!");
      }
    }
  }
};
</script>

<style scoped>
</style>