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
        name: "students",
        component: () => import("../components/Student.vue"),
        children: [
          {
            path: "pages/:id",
            name: "pages",
            component: () => import("../view/Page.vue")
          }
        ]
      },
      {
        path: "addresses",
        name: "addresses",
        component: () => import("../components/Address.vue")
      },
      {
        path: "curriculums",
        name: "curriculums",
        component: () => import("../components/Curriculum.vue")
      },
      {
        path: "contacts",
        name: "contacts",
        component: () => import("../components/Contact.vue")
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
