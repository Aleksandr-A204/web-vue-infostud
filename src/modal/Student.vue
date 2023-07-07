<template>
  <div class="changeData_wrapper">
    <div
      v-click-outside="sendModalClose"
      class="v-student"
    >
      <div class="v-student__header">
        <h3>{{ rightButtonTitle }}</h3>
        <span>
          <i
            class="material-icons"
            @click="sendModalClose"
          >close</i>
        </span>
      </div>
      <div class="v-student__content">
        <div class="student-component">
          <div
            v-if="fullnameShow"
            class="input-group"
          >
            <label class="label-group">ФИО:</label>
            <input
              v-model="fullname"
              type="text"
              class="form-control"
              placeholder="Введите ФИО"
            >
          </div>
          <div v-if="addressShow">
            <div class="input-group">
              <label class="label-group">Город:</label>
              <input
                v-model="city"
                type="text"
                class="form-control"
                placeholder="Введите город"
              >
            </div>
            <div class="input-group">
              <label class="label-group">Почтовый индекс:</label>
              <input
                v-model="postindex"
                type="text"
                class="form-control"
                placeholder="Введите почтовый индекс"
              >
            </div>
            <div class="input-group">
              <label class="label-group">Улица:</label>
              <input
                v-model="street"
                type="text"
                class="form-control"
                placeholder="Введите улицу"
              >
            </div>
          </div>
          <div v-if="curriculumShow">
            <div class="input-group">
              <label class="label-group">Факультет:</label>
              <input
                v-model="faculty"
                type="text"
                class="form-control"
                placeholder="Введите факультет"
              >
            </div>
            <div class="input-group">
              <label class="label-group">Специальность:</label>
              <input
                v-model="speciality"
                type="text"
                class="form-control"
                placeholder="Введите специальность"
              >
            </div>
            <div class="input-group">
              <label class="label-group">Курс:</label>
              <input
                v-model="course"
                type="text"
                class="form-control"
                placeholder="Введите курс"
              >
            </div>
            <div class="input-group">
              <label class="label-group">Группа:</label>
              <input
                v-model="group"
                type="text"
                class="form-control"
                placeholder="Введите группу"
              >
            </div>
          </div>
          <div v-if="contactShow">
            <div class="input-group">
              <label class="label-group">Номер телефона:</label>
              <input
                v-model="phone"
                type="text"
                class="form-control"
                placeholder="Введите телефон"
              >
            </div>
            <div class="input-group">
              <label class="label-group">Эл. почта:</label>
              <input
                v-model="email"
                type="text"
                class="form-control"
                placeholder="Введите эл. почту"
              >
            </div>
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
          {{ rightButtonConfirming }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import dataClient from "../API/dataClient.js";
import { mapActions } from "vuex";

export default {
  props: {
    rightButtonTitle: {
      type: String,
      default: "Студент"
    },

    rightButtonConfirming: {
      type: String,
      default: "Ок"
    },

    selectedItem: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      course: "",
      email: "",
      faculty: "",
      group: "",
      id: 0,
      phone: "",
      speciality: "",
      street: "",
      city: "",
      fullname: "",
      postindex: ""
    };
  },

  created() {
    if (this.rightButtonTitle === "Добавление студента" || this.rightButtonTitle === "Редактирование студента") {
      this.fullnameShow = true;
      this.addressShow = true;
      this.curriculumShow = true;
      this.contactShow = true;

      this.modalName = "student";
    }
    else if (this.rightButtonTitle === "Добавление адреса" || this.rightButtonTitle === "Редактирование адреса") {
      this.fullnameShow = false;
      this.addressShow = true;
      this.curriculumShow = false;
      this.contactShow = false;

      this.modalName = "address";
    }
    else if (this.rightButtonTitle === "Добавление учебного плана" || this.rightButtonTitle === "Редактирование учебного плана") {
      this.fullnameShow = false;
      this.addressShow = false;
      this.curriculumShow = true;
      this.contactShow = false;

      this.modalName = "curriculum";
    }
    else if (this.rightButtonTitle === "Добавление контакта" || this.rightButtonTitle === "Редактирование контакта") {
      this.fullnameShow = false;
      this.addressShow = false;
      this.curriculumShow = false;
      this.contactShow = true;

      this.modalName = "contact";
    }
  },

  mounted() {
    if (!_.isEmpty(this.selectedItem)) {
      if (!_.isUndefined(this.selectedItem.FullName)) {
        this.fullname = this.selectedItem.FullName;
        this.id = this.selectedItem.Id;
        this.course = this.selectedItem.Curriculum.Course;
        this.faculty = this.selectedItem.Curriculum.Faculty;
        this.group = this.selectedItem.Curriculum.Group;
        this.speciality = this.selectedItem.Curriculum.Speciality;
        this.street = this.selectedItem.Address.Street;
        this.city = this.selectedItem.Address.City;
        this.postindex = this.selectedItem.Address.PostIndex;
        this.email = this.selectedItem.Contact.Email;
        this.phone = this.selectedItem.Contact.Phone;
      }
      else if (!_.isUndefined(this.selectedItem.City)) {
        this.id = this.selectedItem.Id;
        this.street = this.selectedItem.Street;
        this.city = this.selectedItem.City;
        this.postindex = this.selectedItem.PostIndex;
      }
      else if (!_.isUndefined(this.selectedItem.Faculty)) {
        this.id = this.selectedItem.Id;
        this.course = this.selectedItem.Course;
        this.faculty = this.selectedItem.Faculty;
        this.group = this.selectedItem.Group;
        this.speciality = this.selectedItem.Speciality;
      }
      else if (!_.isUndefined(this.selectedItem.Phone)) {
        this.id = this.selectedItem.Id;
        this.email = this.selectedItem.Email;
        this.phone = this.selectedItem.Phone;
      }
    }
  },

  methods: {
    ...mapActions({
      createAddress: "addressModule/createAddress",
      createContact: "contactModule/createContact",
      createCurriculum: "curriculumModule/createCurriculum",
      createStudent: "studentModule/createStudent",
      updateAddress: "addressModule/updateAddress",
      updateContact: "contactModule/updateContact",
      updateCurriculum: "curriculumModule/updateCurriculum",
      updateStudent: "studentModule/updateStudent"
    }),

    sendModalClose() {
      this.$emit("closeModal");
    },

    sendRightButton() {
      const setStudentData = {
        API_URL: dataClient.API_URL + this.modalName,
        address: {
          city: this.city,
          postindex: this.postindex,
          street: this.street
        },
        contact: {
          email: this.email,
          phone: this.phone
        },
        curriculum: {
          course: this.course,
          faculty: this.faculty,
          group: this.group,
          speciality: this.speciality
        },
        fullname: this.fullname,
        id: this.id
      };

      if (this.rightButtonConfirming === "Создать") {
        if (this.fullnameShow) {
          this.createStudent(setStudentData);
        }
        else if (this.addressShow) {
          this.createAddress(setStudentData);
        }
        else if (this.curriculumShow) {
          this.createCurriculum(setStudentData);
        }
        else if (this.contactShow) {
          this.createContact(setStudentData);
        }
      }
      else if (this.rightButtonConfirming === "Сохранить") {
        if (this.fullnameShow) {
          this.updateStudent(setStudentData);
        }
        else if (this.addressShow) {
          this.updateAddress(setStudentData);
        }
        else if (this.curriculumShow) {
          this.updateCurriculum(setStudentData);
        }
        else if (this.contactShow) {
          this.updateContact(setStudentData);
        }
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
    width: 380px;
    border-radius: 2px;
  };
}
.label-group{
  margin-right: 2px;
}
</style>