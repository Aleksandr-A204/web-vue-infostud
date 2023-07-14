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
          <div class="input-group">
            <label class="form-label">ФИО:</label>
            <input
              v-model="currentObject.fullname"
              type="text"
              class="form-control"
              placeholder="Введите ФИО"
            >
          </div>
          <div class="input-group">
            <label class="form-label">Город:</label>
            <input
              id="inputOne"
              type="text"
              class="form-control"
              size="8"
            >
            <select class="form-select__popur-list" />
            <!-- <select
              v-model="currentObject.address.city"
              class="form-select"
            >
              <option
                v-for="address in addresses"
                :key="address.id"
              >
                {{ address.City }}
              </option>
            </select> -->
          </div>
          <div class="input-group">
            <label class="form-label">Почтовый индекс:</label>
            <input
              type="text"
              class="form-control"
              size="8"
            >
            <select class="form-select__popur-list" />
            <!-- <select
              v-model="currentObject.address.postindex"
              class="form-select"
            >
              <option
                v-for="address in addresses"
                :key="address.id"
              >
                {{ address.PostIndex }}
              </option>
            </select> -->
          </div>
          <div class="input-group">
            <label class="form-label">Улица:</label>
            <input
              type="text"
              class="form-control"
              size="8"
            >
            <select class="form-select__popur-list" />
            <!-- <select
              v-model="currentObject.address.street"
              class="form-select"
            >
              <option
                v-for="address in addresses"
                :key="address.id"
              >
                {{ address.Street }}
              </option>
            </select> -->
          </div>
          <div class="input-group">
            <label class="form-label">Факультет:</label>
            <select
              v-model="currentObject.curriculum.faculty"
              class="form-select"
            >
              <option
                v-for="curriculum in curriculums"
                :key="curriculum.id"
              >
                {{ curriculum.Faculty }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label class="form-label">Специальность:</label>
            <select
              v-model="currentObject.curriculum.speciality"
              class="form-select"
            >
              <option
                v-for="curriculum in curriculums"
                :key="curriculum.id"
              >
                {{ curriculum.Speciality }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label class="form-label">Курс:</label>
            <select
              v-model="currentObject.curriculum.course"
              class="form-select"
            >
              <option
                v-for="course in uniqCourses"
                :key="course.id"
              >
                {{ course }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label class="form-label">Группа:</label>
            <input
              id="inputTwo"
              type="text"
              class="form-control"
              placeholder="Введите группу"
              size="8"
            >
            <select class="form-select__popur-list" />
            <!-- <input
              v-model="currentObject.curriculum.group"
              type="text"
              class="form-control"
              placeholder="Введите группу"
            > -->
          </div>
          <div class="input-group">
            <label class="form-label">Номер телефона:</label>
            <input
              v-model="currentObject.contact.phone"
              type="text"
              class="form-control"
              placeholder="Введите телефон"
            >
          </div>
          <div class="input-group">
            <label class="form-label">Эл. почта:</label>
            <input
              v-model="currentObject.contact.email"
              type="text"
              class="form-control"
              placeholder="Введите эл. почту"
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
import _ from "lodash";
import router from "@/route/routes";
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
      currentObject: null,
      uniqCourses: []
    };
  },

  computed: {
    ...mapGetters({
      addresses: "addressModule/addresses",
      curriculums: "curriculumModule/curriculums"
    })


  },

  created() {
    this.currentObject = {
      address: {
        city: this.studentObject?.Address.City,
        postindex: this.studentObject?.Address.PostIndex,
        street: this.studentObject?.Address.Street
      },
      curriculum: {
        faculty: this.studentObject?.Curriculum.Faculty,
        speciality: this.studentObject?.Curriculum.Speciality,
        course: this.studentObject?.Curriculum.Course,
        group: this.studentObject?.Curriculum.Group
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
    await this.getAddressData(router.options.routes[1].name);
    await this.getCurriculumData(router.options.routes[2].name);

    this.uniqCourses = await _.uniq(_.map(this.curriculums, "Course")).toSorted();
  },

  methods: {
    ...mapActions({
      getAddressData: "addressModule/addressData",
      getCurriculumData: "curriculumModule/curriculumData",
      createStudent: "studentModule/createStudent",
      updateStudent: "studentModule/updateStudent"
    }),

    sendModalClose() {
      this.$emit("closeModal");
    },

    sendRightButton() {
      if (this.currentObject.id) {
        this.updateStudent(this.currentObject);
      }
      else {
        this.createStudent(this.currentObject);
      }
      this.sendModalClose();
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
}
.v-student{
    padding: 16px;
    position: fixed;
    background: white;
    border: 1px solid black;
    border-radius: 7px;
    box-shadow: 0 0 17px 0 rgb(161, 161, 161);
    width: 600px;
    z-index: 10;
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
    };
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
.input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
  .form-control {
    width: 320px;
    border: 1px solid black;
    border-radius: 5px;
  }
  .form-select{
    width: 326.21px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 1px 2px;
    &__popur-list{
      position: absolute;
    }
      option[default] {
      display: none;
    }
  }
}
.form-label{
  margin-right: 2px;
}
</style>