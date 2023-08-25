import Icon from "@/icons/Icon.vue";

import CustomButton from "@/components/Button.vue";
import CustomTable from "../Table.vue";
import Search from "../Search.vue";

import Modal from "@/modal/Modal.vue";

const Components = {
  CustomButton,
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
