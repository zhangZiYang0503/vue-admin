import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/login/index")
  },
  {
    path: "/sum",
    name: "sum",
    component: () => import("../views/event-bus/sum")
  }
];

const router = new VueRouter({
  routes
});

export default router;
