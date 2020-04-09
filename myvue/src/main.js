import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'
import infiniteScroll from 'vue-infinite-scroll'
import md5 from 'js-md5'

Vue.prototype.$md5 = md5
Vue.use(infiniteScroll)
Vue.use(VueCookies)
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
