import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  {
    path: "/modal_student",
    name: "modal_student",
    component: () => import("../components/ModalStud.vue")
  },
  {
    path: "/student",
    name: "student",
    component: () => import("../components/StudentComp.vue")
  },
  {
    path: "/address",
    name: "address",
    component: () => import("../components/AddressComp.vue")
  },
  {
    path: "/curriculum",
    name: "curriculum",
    component: () => import("../components/CurriculumComp.vue")
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../components/ContactComp.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;