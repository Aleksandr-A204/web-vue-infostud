<template>
  <div class="address_wrapper">
    <div
      v-click-outside="sendModalClose"
      class="v-address"
    >
      <div class="v-address__header">
        <h3>{{ titleModal }}</h3>
        <span>
          <i
            class="material-icons"
            @click="sendModalClose"
          >close</i>
        </span>
      </div>
      <div class="v-address__content">
        <div>
          <div class="input-group">
            <label class="label-group">Город:</label>
            <!-- <input
              v-model="currentObject.city"
              type="text"
              class="form-control"
              placeholder="Введите город"
            > -->
            <select v-model="currentObject.city">
              <option
                v-for="city in cities"
                :key="city.id"
              >
                {{ city.City }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label class="label-group">Почтовый индекс:</label>
            <!-- <input
              v-model="currentObject.postindex"
              type="text"
              class="form-control"
              placeholder="Введите почтовый индекс"
            > -->
            <select v-model="currentObject.postindex">
              <option
                v-for="postindex in postindexes"
                :key="postindex.id"
              >
                {{ postindex.PostIndex }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label class="label-group">Улица:</label>
            <!-- <input
              v-model="currentObject.street"
              type="text"
              class="form-control"
              placeholder="Введите улицу"
            > -->
            <select v-model="currentObject.street">
              <option
                v-for="street in streets"
                :key="street.id"
              >
                {{ street.Street }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="v-address__footer">
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
import { mapActions, mapGetters } from "vuex";

export default {
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

    sendModalClose() {
      this.$emit("closeModal");
    },

    sendRightButton() {
      if (this.currentObject.id) {
        this.updateAddress(this.currentObject);
      }
      else {
        this.createAddress(this.currentObject);
      }
      this.sendModalClose();
    }
  }
};
</script>

<style scoped lang="scss">
.address_wrapper{
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
.v-address{
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
  select {
    width: 326.21px;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
    color: #000;
  }
}
.label-group{
  margin-right: 2px;
}
</style>