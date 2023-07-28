<template>
  <SlotModal>
    <div class="inside-modal__content">
      <div>
        <div class="block-group">
          <label class="label-group">Факультет:</label>
          <input
            v-model="currentObject.faculty"
            type="text"
            class="form-control"
            placeholder="Введите факультет"
          >
        </div>
        <div class="block-group">
          <label class="label-group">Специальность:</label>
          <input
            v-model="currentObject.speciality"
            type="text"
            class="form-control"
            placeholder="Введите специальность"
          >
        </div>
        <div class="block-group">
          <label class="label-group">Курс:</label>
          <input
            v-model="currentObject.course"
            type="text"
            class="form-control"
            placeholder="Введите курс"
          >
        </div>
        <div class="block-group">
          <label class="label-group">Группа:</label>
          <input
            v-model="currentObject.group"
            type="text"
            class="form-control"
            placeholder="Введите группу"
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
        @click="saveCurriculumData"
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
      default: "Курс обучения"
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
      faculty: this.selectedItem?.Faculty,
      id: this.selectedItem?.Id,
      speciality: this.selectedItem?.Speciality,
      course: this.selectedItem?.Course,
      group: this.selectedItem?.Group
    };
  },

  methods: {
    ...mapActions({
      createCurriculum: "curriculumModule/createCurriculum",
      updateCurriculum: "curriculumModule/updateCurriculum"
    }),

    closeModal() {
      this.$emit("closeModal");
    },

    saveCurriculumData() {
      if (this.currentObject.id) {
        this.updateCurriculum(this.currentObject);
      }
      else {
        this.createCurriculum(this.currentObject);
      }
      this.closeModal();
    }
  }
};
</script>

<style scoped>
</style>