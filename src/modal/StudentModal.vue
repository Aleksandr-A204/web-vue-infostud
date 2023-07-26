<template>
  <div class="changeData_wrapper">
    <div
      v-click-outside="sendModalClose"
      class="v-student"
    >
      <div class="v-student__header">
        <h3>{{ titleModal }}</h3>
        <span>
          <i
            class="material-icons"
            @click="sendModalClose"
          >close</i>
        </span>
      </div>
      <div class="v-student__content">
        <div class="student-component">
          <p>Студент</p>
          <div class="input-group">
            <label class="form-label">ФИО:</label>
            <input
              v-model="currentObject.fullname"
              type="text"
              class="form-control"
            >
          </div>
          <p>Адрес</p>
          <div class="input-group">
            <label class="form-label">Город:</label>
            <select
              v-model="currentObject.address.city"
              class="form-select"
              @click="clickBoxCity"
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
            class="input-group"
          >
            <label class="form-label">Улица:</label>
            <select
              v-model="currentObject.address.street"
              class="form-select"
              @click="clickBoxStreet"
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
            class="input-group"
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
          <div class="input-group">
            <label class="form-label">Факультет:</label>
            <select
              v-model="currentObject.curriculum.faculty"
              class="form-select"
              @click="clickBoxFaculty"
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
            class="input-group"
          >
            <label class="form-label">Специальность:</label>
            <select
              v-model="currentObject.curriculum.speciality"
              class="form-select"
              @click="clickBoxSpeciality"
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
            class="input-group"
          >
            <label class="form-label">Курс:</label>
            <select
              v-model="currentObject.curriculum.course"
              class="form-select"
              @click="clickBoxCourse"
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
            class="input-group"
          >
            <label class="form-label">Группа:</label>
            <div class="search-box">
              <input
                :value="currentObject.curriculum.group = getWordByGroup"
                class="form-control"
                type="text"
                @input="setWordByGroup"
              >
              <table
                class="popur-list hidden"
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
          <div class="input-group">
            <label class="form-label">Номер телефона:</label>
            <input
              v-model="currentObject.contact.phone"
              type="text"
              class="form-control"
            >
          </div>
          <div class="input-group">
            <label class="form-label">Эл. почта:</label>
            <input
              v-model="currentObject.contact.email"
              type="text"
              class="form-control"
            >
          </div>
        </div>
      </div>
      <div class="v-student__footer">
        <button
          class="close_modal"
          @click="sendModalClose"
        >
          Отмена
        </button>
        <button
          class="submit_btn"
          @click="sendRightButton"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
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
      currentObject: null
    };
  },

  computed: {
    ...mapGetters({
      addresses: "addressModule/addresses",
      cities: "addressModule/cities",
      city: "addressModule/getCity",
      courses: "curriculumModule/courses",
      curriculums: "curriculumModule/curriculums",
      faculty: "curriculumModule/getFaculty",
      faculties: "curriculumModule/faculties",
      getWordByGroup: "curriculumModule/getWordByGroup",
      groups: "curriculumModule/groups",
      postindexes: "addressModule/postindexes",
      specialities: "curriculumModule/specialities",
      street: "addressModule/getStreet",
      streets: "addressModule/streets"
    })
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
      this.$store.dispatch("addressModule/setCity", this.currentObject.address.city);
      this.$store.dispatch("addressModule/setStreet", this.currentObject.address.street);
      this.$store.dispatch("curriculumModule/setFaculty", this.currentObject.curriculum.faculty);
      this.$store.dispatch("curriculumModule/setSpeciality", this.currentObject.curriculum.speciality);
      this.$store.dispatch("curriculumModule/setCourse", this.currentObject.curriculum.course);
      this.$store.dispatch("curriculumModule/wordByGroup", this.currentObject.curriculum.group ?? "");
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
      this.$store.dispatch("curriculumModule/wordByGroup", event.target.innerText);

      event.srcElement.offsetParent.classList.toggle("hidden", true);
    },

    clickBoxCity(event) {
      if (!event.pointerId) {
        if (event.target.value !== this.city) {
          this.currentObject.address.street = null;
          this.currentObject.address.postindex = null;
        }
        this.$store.dispatch("addressModule/setCity", event.target.value);
      }
    },

    clickBoxStreet(event) {
      if (!event.pointerId) {
        if (event.target.value !== this.street) {
          this.currentObject.address.postindex = null;
        }
        this.$store.dispatch("addressModule/setStreet", event.target.value);
      }
    },

    clickBoxFaculty(event) {
      if (!event.pointerId) {
        if (event.target.value !== this.faculty) {
          this.currentObject.curriculum.speciality = null;
          this.currentObject.curriculum.course = null;
          this.$store.dispatch("curriculumModule/wordByGroup", "");
        }

        this.$store.dispatch("curriculumModule/setFaculty", event.target.value);
      }
    },

    clickBoxSpeciality(event) {
      if (!event.pointerId) {
        if (event.target.value !== this.speciality) {
          this.currentObject.curriculum.course = null;
          this.$store.dispatch("curriculumModule/wordByGroup", "");
        }

        this.$store.dispatch("curriculumModule/setSpeciality", event.target.value);
      }
    },

    clickBoxCourse(event) {
      if (!event.pointerId) {
        if (event.target.value !== this.course) {
          this.$store.dispatch("curriculumModule/wordByGroup", "");
        }

        this.$store.dispatch("curriculumModule/setCourse", event.target.value);
      }
    },

    sendModalClose() {
      this.$emit("closeModal");
    },

    sendRightButton() {
      if (this.currentObject.fullname && this.currentObject.address.city && this.currentObject.address.street && this.currentObject.address.postindex
       && this.currentObject.curriculum.faculty && this.currentObject.curriculum.speciality && this.currentObject.curriculum.course && this.currentObject.curriculum.group
        && this.currentObject.contact.phone && this.currentObject.contact.email) {
        if (this.currentObject.id) {
          this.updateStudent(this.currentObject);
        }
        else {
          this.addNewStudent(this.currentObject);
        }
        this.sendModalClose();
      }
      else {
        alert("Заполните все поля!");
      }
    },

    setWordByGroup(event) {
      const tableElement = event.target.nextElementSibling.classList;
      event.target.value === "" ? tableElement.toggle("hidden", true) : tableElement.toggle("hidden", false);

      this.$store.dispatch("curriculumModule/wordByGroup", event.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
.changeData_wrapper{
  background: #59595996;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  .v-student{
    padding: 16px;
    position: fixed;
    background: white;
    border: 1px solid black;
    border-radius: 7px;
    box-shadow: 0 0 20px 0 black;
    width: 600px;
    // z-index: 10;
    &__header, &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h3 {
          text-decoration: underline;
        }
    };
    &__content {
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        color: gray;
        font-size: 19px;
        font-style: italic;
        margin-bottom: 5px;
        margin-top: 10px;
        text-decoration: underline;
        text-align: right;
      };
      .input-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 7px;
        font-size: 14px;
        .form-label{
          margin-right: 2px;
        }
        .form-control {
          height: 15px;
          width: 320px;
          border: 1px solid black;
          border-radius: 5px;
          padding: 1px 1px 1px 3px;
          text-align: left;
        }
        .form-select{
          border: 1px solid black;
          border-radius: 5px;
          cursor: pointer;
          color: #000;
          height: 19.2px;
          width: 326.21px;
        }
        .search-box{
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          position: relative;
          .popur-list{
            position: absolute;
            top: 100%;
            width: 100%;
            border-collapse: collapse;
            cursor: default;
            background: white;
            border: 1px solid gray;
            .rows-box{
              min-width: 320px;
              font-weight: normal;
              min-height: 1.2em;
              &:hover {
                background: #1915f7;
                color: white;
              }
            }
          }
          .hidden{
            display: none;
          }
        }
      }
    }
  }
  i:hover{
    cursor: pointer;
  }
  button{
    background-color: #87CEEB;
    border: 1px;
    border-style: solid;
    border-radius: 7px;
    box-sizing: border-box;
    color: black;
    text-align: center;
    height: 25px;
    margin: 1px;
      &:hover {
      background: #1915f7;
      border: 1px;
      border-style: solid;
      border-color: #000;
      color: white;
    }
  }
}
</style>