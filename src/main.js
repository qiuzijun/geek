import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant, { Lazyload } from "vant";
import "vant/lib/index.css";
Vue.config.productionTip = false;
Vue.use(Vant);
Vue.use(Lazyload);
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
