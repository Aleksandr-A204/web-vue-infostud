import CustomButton from "./Button.vue";
import CustomInput from "./Input.vue";
import CustomSelect from "./Select.vue";
import CustomTable from "./Table.vue";
import Icon from "./Icon.vue";
import RowWithLabel from "./RowWithLabel.vue";
import Search from "./Search.vue";

import Modal from "@/modal/Modal.vue";

const Components = {
  RowWithLabel,
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomTable,
  Icon,
  Modal,
  Search
};

const install = function(Vue) {
  for (const prop in Components) {
    Vue.component(prop, Components[prop]);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

Components.install = install;
export default Components;
