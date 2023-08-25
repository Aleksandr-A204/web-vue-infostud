<template>
  <div class="outside-modal">
    <div
      v-click-outside="close"
      class="inside-modal"
    >
      <div class="inside-modal__header">
        <span class="title">{{ title }}</span>
        <Icon
          icon="xmark"
          size="xl"
          @click="$emit('close')"
        />
      </div>

      <div class="inside-modal__content">
        <div
          v-for="(row, index) of rows"
          :key="`content-row-${index}`"
          class="block-group"
        >
          <label class="form-label">{{ row.label }}</label>

          <div v-if="row.formType === 'select'">
            <Multiselect
              v-model="object[row.property]"
              :options="dropdown.city"
            />
            <!-- <select
              :value="getValue(row.property)"
              class="form-select"
              @input="event => setProperty(row.property, event)"
            >
              <option
                disabled
                hidden
              />
              <option
                v-for="(element, secondIndex) of dropdown[row.property]"
                :key="`drop-down-list-${secondIndex}`"
              >
                {{ element[row.property] }}
              </option>
            </select> -->
          </div>
          <div v-else>
            <input
              :value="getValue(row.property)"
              type="text"
              class="form-control"
              @input="event => setProperty(row.property, event)"
            >
          </div>
        </div>
      </div>

      <div class="inside-modal__footer">
        <CustomButton @click="$emit('close')">
          Отмена
        </CustomButton>
        <CustomButton @click="$emit('saveData', currentObject)">
          Сохранить
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },

  props: {
    title: {
      type: String,
      required: true
    },

    rows: {
      type: Array,
      required: true
    },

    object: {
      type: Object,
      required: true
    },

    dropdown: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      currentObject: null
    };
  },

  watch: {
    object: {
      immediate: true,
      handler(value) {
        this.currentObject = _.cloneDeep(value);
      }
    }
  },

  methods: {
    close() {
      this.$emit("close");
    },

    // getArray(property) {
    //   console.log(this.dropdown);
    //   console.log(property);
    // },

    getValue(property) {
      return _.get(this.currentObject, property);
    },

    setProperty(property, event) {
      _.set(this.currentObject, property, event.target.value);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
.outside-modal{
  background: #59595996;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  .inside-modal{
    padding: 20px;
    position: fixed;
    background: white;
    border: 1px solid black;
    border-radius: 7px;
    box-shadow: 0 0 20px 0 black;
    width: 600px;

    &__header, &__footer {
      margin: 10px 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title{
        font-size: 22px;
        font-weight: bold;
        text-decoration: underline;
      }
    };

    &__content {
    padding: 25px 75px;

      .p {
        color: gray;
        font-size: 19px;
        font-style: italic;
        margin-bottom: 5px;
        margin-top: 10px;
        text-decoration: underline;
        text-align: right;
      };

      .block-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 7px;
        font-size: 14px;

        .form-label{
          margin-right: 2px;
        }

        .form-control {
          height: 26px;
          width: 320px;
          border: 1px solid #959292;
          border-radius: 5px;
          padding: 1px 1px 1px 3px;
          text-align: left;
        }
      }
    }
  }
}
</style>
