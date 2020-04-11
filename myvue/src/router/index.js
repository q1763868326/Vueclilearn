import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue"
import home from "../views/home.vue"
import comment from "../views/comment.vue"
import mine from "../views/mine.vue"
import friends from "../views/friends.vue"

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
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: home
  },
  {
    path: "/comment",
    name: "comment",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: comment
  },
  {
    path: "/mine",
    name: "mine",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: mine
  },
  {
	  path:"/friends",
	  name:"friends",
	  component:friends
  }
];

const router = new VueRouter({
  routes
});

export default router;
