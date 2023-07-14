<template>
  <div class="contact_wrapper">
    <div
      v-click-outside="sendModalClose"
      class="v-contact"
    >
      <div class="v-contact__header">
        <h3>{{ titleModal }}</h3>
        <span>
          <i
            class="material-icons"
            @click="sendModalClose"
          >close</i>
        </span>
      </div>
      <div class="v-contact__content">
        <div class="contact-component">
          <div class="input-group">
            <label class="label-group">Номер телефона:</label>
            <input
              v-model="currentObject.phone"
              type="text"
              class="form-control"
              placeholder="Введите телефон"
            >
          </div>
          <div class="input-group">
            <label class="label-group">Эл. почта:</label>
            <input
              v-model="currentObject.email"
              type="text"
              class="form-control"
              placeholder="Введите эл. почту"
            >
          </div>
        </div>
      </div>
      <div class="v-contact__footer">
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
import { mapActions } from "vuex";

export default {
  props: {
    titleModal: {
      type: String,
      default: "Контакт"
    },

    selectedItem: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      currentObject: null
    };
  },

  created() {
    this.currentObject = {
      email: this.selectedItem?.Email,
      id: this.selectedItem?.Id,
      phone: this.selectedItem?.Phone
    };
  },

  methods: {
    ...mapActions({
      createContact: "contactModule/createContact",
      updateContact: "contactModule/updateContact"
    }),

    sendModalClose() {
      this.$emit("closeModal");
    },

    sendRightButton() {
      if (this.currentObject.id) {
        this.updateContact(this.currentObject);
      }
      else {
        this.createContact(this.currentObject);
      }
      this.sendModalClose();
    }
  }
};
</script>

<style scoped lang="scss">
.contact_wrapper{
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
.v-contact{
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
    border: 1px solid black;
    border-radius: 5px;
  };
}
.label-group{
  margin-right: 2px;
}
</style>