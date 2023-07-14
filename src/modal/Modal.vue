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
        <slot />
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
//import _ from "lodash";
import { mapActions } from "vuex";

export default {
  props: {

  },

  data() {
    return {
    };
  },

  mounted() {
  },

  methods: {
    ...mapActions({
    }),

    sendModalClose() {
      this.$emit("closeModal");
    },

    sendRightButton() {
    //   const setStudentData = {
    //     address: {
    //       city: this.city,
    //       postindex: this.postindex,
    //       street: this.street
    //     },
    //     contact: {
    //       email: this.email,
    //       phone: this.phone
    //     },
    //     curriculum: {
    //       course: this.course,
    //       faculty: this.faculty,
    //       group: this.group,
    //       speciality: this.speciality
    //     },
    //     fullname: this.fullname,
    //     id: this.id
    //   };

      if (this.rightButtonConfirming === "Создать") {
        this.sendModalClose();
      }
      else if (this.rightButtonConfirming === "Сохранить") {
        this.sendModalClose();
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