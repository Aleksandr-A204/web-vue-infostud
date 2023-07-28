<template>
  <SlotModal>
    <div class="inside-modal__content">
      <div>
        <div class="block-group">
          <label class="label-group">Город:</label>
          <div class="search-box">
            <div class="form-control">
              {{ currentObject.city }}
            </div>
            <table
              class="drop-down-list hidden"
            >
              <tbody>
                <tr
                  v-for="city in cities"
                  :key="city.id"
                >
                  <td
                    class="rows-box"
                    @click="clickCityBox(city)"
                  >
                    {{ city.City }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="block-group">
          <label class="label-group">Почтовый индекс:</label>
          <div class="search-box">
            <div class="form-control">
              {{ currentObject.postindex }}
            </div>
            <table
              class="drop-down-list hidden"
            >
              <tbody>
                <tr
                  v-for="postindex in postindexes"
                  :key="postindex.id"
                  @click="clickPostindexBox(postindex)"
                >
                  <td class="rows-box">
                    {{ postindex.PostIndex }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="block-group">
          <label class="label-group">Улица:</label>
          <div class="search-box">
            <div class="form-control">
              {{ currentObject.street }}
            </div>
            <table
              class="drop-down-list hidden"
            >
              <tbody>
                <tr
                  v-for="street in streets"
                  :key="street.id"
                  @click="clickStreetBox(street)"
                >
                  <td class="rows-box">
                    {{ street.Street }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
        @click="saveAddressData"
      >
        Сохранить
      </button>
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
    titleModal: {
      type: String,
      default: "Адрес"
    },

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
      city: this.addressObject?.City,
      id: this.addressObject?.Id,
      postindex: this.addressObject?.PostIndex,
      street: this.addressObject?.Street
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

    clickCityBox(city) {
      this.currentObject.cityId = city.Id;
      this.currentObject.city = city.City;
    },

    clickPostindexBox(postindex) {
      this.currentObject.postindexId = postindex.Id;
      this.currentObject.postindex = postindex.PostIndex;
    },

    clickStreetBox(street) {
      this.currentObject.streetId = street.Id;
      this.currentObject.street = street.Street;
    },

    closeModal() {
      this.$emit("closeModal");
    },

    saveAddressData() {
      if (this.currentObject.id) {
        this.updateAddress(this.currentObject);
      }
      else {
        this.createAddress(this.currentObject);
      }
      this.closeModal();
    }
  }
};
</script>

<style scoped>
</style>