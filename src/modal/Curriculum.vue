<template>
  <div class="curriculum_wrapper">
    <div
      v-click-outside="sendModalClose"
      class="v-curriculum"
    >
      <div class="v-curriculum__header">
        <h3>{{ rightButtonTitle }}</h3>
        <span>
          <i
            class="material-icons"
            @click="sendModalClose"
          >close</i>
        </span>
      </div>
      <div class="v-curriculum__content">
        <div class="student-component">
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
      </div>
      <div class="v-curriculum__footer">
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
      default: "Курс обучения"
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
      faculty: "",
      group: "",
      id: 0,
      speciality: ""
    };
  },

  mounted() {
    if (!_.isEmpty(this.selectedItem)) {
      this.id = this.selectedItem.Id;
      this.course = this.selectedItem.Course;
      this.faculty = this.selectedItem.Faculty;
      this.group = this.selectedItem.Group;
      this.speciality = this.selectedItem.Speciality;
    }
  },

  methods: {
    ...mapActions({
      createCurriculum: "curriculumModule/createCurriculum",
      updateCurriculum: "curriculumModule/updateCurriculum"
    }),

    sendModalClose() {
      this.$emit("closeModal");
    },

    sendRightButton() {
      const curriculumObject = {
        API_URL: dataClient.API_URL + "curriculum",
        course: this.course,
        faculty: this.faculty,
        group: this.group,
        speciality: this.speciality,
        id: this.id
      };

      if (this.rightButtonConfirming === "Создать") {
        this.createCurriculum(curriculumObject);
      }
      else if (this.rightButtonConfirming === "Сохранить") {
        this.updateCurriculum(curriculumObject);
      }
      this.sendModalClose();
    }
  }
};
</script>

<style scoped lang="scss">
.curriculum_wrapper{
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
.v-curriculum{
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