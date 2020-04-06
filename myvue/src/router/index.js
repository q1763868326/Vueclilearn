import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue"
import test from "../views/test.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: "/test",
    name: "test",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: test
  }
];

const router = new VueRouter({
  routes
});

export default router;
