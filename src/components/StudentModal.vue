<template>
  <div
    class="student_wrapper"
  >
    <div
      v-click-outside="sendModalClose"
      class="v-student"
    >
      <div class="v-student__header">
        <h3>{{ rightBtnTitle }}</h3>
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
          {{ rightBtnConfirming }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rightBtnTitle: {
      type: String,
      default: "Студент"
    },
    rightBtnConfirming: {
      type: String,
      default: "Ок"
    }
  },

  data() {
    return {
    };
  },

  methods: {
    sendModalClose() {
      this.$emit("closeModal");
    },

    sendRightButton() {
      if (this.rightBtnConfirming === "Создать") {
        this.$emit("createStudentClick");
      }
      else if (this.rightBtnConfirming === "Сохранить") {
        this.$emit("updateClick");
      }
    }
  }
};
</script>

<style lang="scss">
.student_wrapper{
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
    width: 500px;
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

</style>