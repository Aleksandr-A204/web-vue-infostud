import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  {
    path: "/student",
    name: "student",
    component: () => import("../components/Student.vue")
  },
  {
    path: "/address",
    name: "address",
    component: () => import("../components/Address.vue")
  },
  {
    path: "/curriculum",
    name: "curriculum",
    component: () => import("../components/Curriculum.vue")
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../components/Contact.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;