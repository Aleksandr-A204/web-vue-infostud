import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../layout/Main.vue"),
    children: [
      {
        path: "students",
        name: "main.students",
        component: () => import("../view/Student.vue"),
        children: [
          {
            path: "pages/:id",
            name: "main.students.pages",
            component: () => import("../view/Page.vue")
          }
        ]
      },
      {
        path: "addresses",
        name: "addresses",
        component: () => import("../view/Address.vue")
      },
      {
        path: "curriculums",
        name: "curriculums",
        component: () => import("../view/Curriculum.vue")
      },
      {
        path: "contacts",
        name: "contacts",
        component: () => import("../view/Contact.vue")
      }
    ]
  },
  {
    path: "/404",
    component: () => import("../layout/NotFound.vue")
  },
  {
    path: "*",
    redirect: "/404"
  }
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
