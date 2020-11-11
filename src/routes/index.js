import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("../views/Login.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/storage",
      name: "Storage",
      component: () => import("../views/Storage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
