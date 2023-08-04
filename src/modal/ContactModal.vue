<template>
  <SlotModal
    :current-object="selectedItem"
    @close="$emit('close')"
    @saveData="saveContactData"
  >
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

    saveContactData() {
      if (this.currentObject.id) {
        this.updateContact(this.currentObject);
      }
      else {
        this.createContact(this.currentObject);
      }
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
</style>