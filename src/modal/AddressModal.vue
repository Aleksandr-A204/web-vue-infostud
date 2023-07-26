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
            <div class="search-box">
              <div class="form-control">
                {{ currentObject.city }}
              </div>
              <table
                class="popur-list hidden"
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
          <div class="input-group">
            <label class="label-group">Почтовый индекс:</label>
            <div class="search-box">
              <div class="form-control">
                {{ currentObject.postindex }}
              </div>
              <table
                class="popur-list hidden"
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
          <div class="input-group">
            <label class="label-group">Улица:</label>
            <div class="search-box">
              <div class="form-control">
                {{ currentObject.street }}
              </div>
              <table
                class="popur-list hidden"
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
    .input-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 7px;
    }
    .search-box{
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      position: relative;
      width: 280px;
      height: 17px;
      border: 2px solid black;
      border-radius: 5px;
      .form-control{
      width: 100%;
      height: 100%;
      text-align: left;
      }
      .popur-list{
        position: absolute;
        top: 100%;
        width: 282px;
        border-collapse: collapse;
        cursor: default;
        background: white;
        border: 1px solid gray;
        z-index: 1;
        .rows-box{
          min-width: 279px;
          font-weight: normal;
          min-height: 1.0em;
          &:hover {
            background: #1915f7;
            color: white;
          }
        }
      }
      .hidden{
        display: none;
      }
      &:hover .popur-list{
        display: block;
      }
    }
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
.label-group{
  margin-right: 2px;
}
p {
  color: gray;
  font-size: 19px;
  font-style: italic;
  margin-bottom: 5px;
  margin-top: 10px;
  text-decoration: underline;
  text-align: right;
};
</style>