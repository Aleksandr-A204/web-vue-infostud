<template>
  <SlotModal>
    <div class="inside-modal__content">
      <div>
        <div class="block-group">
          <label class="label-group">Номер телефона:</label>
          <input
            v-model="currentObject.phone"
            type="text"
            class="form-control"
            placeholder="Введите телефон"
          >
        </div>
        <div class="block-group">
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
    <div class="inside-modal__footer">
      <button
        class="button"
        @click="closeModal"
      >
        Отмена
      </button>
      <button
        class="button"
        @click="saveContactData"
      >
        Сохранить
      </button>
    </div>
  </SlotModal>
</template>

<script>
import SlotModal from "./Modal.vue";
import { mapActions } from "vuex";

export default {
  components: {
    SlotModal
  },

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

    closeModal() {
      this.$emit("closeModal");
    },

    saveContactData() {
      if (this.currentObject.id) {
        this.updateContact(this.currentObject);
      }
      else {
        this.createContact(this.currentObject);
      }
      this.closeModal();
    }
  }
};
</script>

<style scoped>
</style>