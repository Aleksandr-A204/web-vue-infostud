<template>
  <SlotModal
    :current-object="addressObject"
    @close="$emit('close')"
    @saveData="saveAddressData"
  >
    <div class="inside-modal__content">
      <div>
        <div class="block-group">
          <label class="label-group">Город:</label>
          <select
            v-model="currentObject.cityId"
            class="form-select"
          >
            <option
              v-for="c in cities"
              :key="c.Id"
              :value="c.Id"
            >
              {{ c.City }}
            </option>
          </select>
        </div>
        <div class="block-group">
          <label class="label-group">Почтовый индекс:</label>
          <select
            v-model="currentObject.postindexId"
            class="form-select"
          >
            <option
              v-for="p in postindexes"
              :key="p.Id"
              :value="p.Id"
            >
              {{ p.PostIndex }}
            </option>
          </select>
        </div>
        <div class="block-group">
          <label class="label-group">Улица:</label>
          <select
            v-model="currentObject.streetId"
            class="form-select"
          >
            <option
              v-for="s in streets"
              :key="s.Id"
              :value="s.Id"
            >
              {{ s.Street }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </SlotModal>
</template>

<script>
import SlotModal from "./Modal.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    SlotModal
  },

  props: {
    addressObject: {
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
      streets: "streetModule/streets",
      cities: "cityModule/cities",
      postindexes: "postindexModule/postindexes"
    })
  },

  created() {
    this.currentObject = {
      id: this.addressObject?.Id,
      cityId: this.addressObject?.CityId,
      streetId: this.addressObject?.StreetId,
      postindexId: this.addressObject?.PostindexId
    };
  },

  async mounted() {
    await this.getCityData();
    await this.getPostindexData();
    await this.getStreetData();
  },

  methods: {
    ...mapActions({
      getCityData: "cityModule/getCityData",
      getPostindexData: "postindexModule/getPostindexData",
      getStreetData: "streetModule/getStreetData",
      createAddress: "addressModule/createAddress",
      updateAddress: "addressModule/updateAddress"
    }),

    saveAddressData() {
      if (this.currentObject.cityId && this.currentObject.streetId && this.currentObject.postindexId) {
        if (this.currentObject.id) {
          this.updateAddress(this.currentObject);
        }
        else {
          this.createAddress(this.currentObject);
        }

        this.$emit("close");
      }
      else {
        alert("Заполните все поля!");
      }
    }
  }
};
</script>

<style scoped>
</style>