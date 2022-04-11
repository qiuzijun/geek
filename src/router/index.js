import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
// 路由懒加载方式
const Tabbar = () => import("../components/app-tabber.vue");
const Home = () => import("../views/Home");
const Question = () => import("../views/Question");
const Video = () => import("../views/Video");
const User = () => import("../views/User");

const routes = [
  {
    path: "/",
    components: {
      default: Home,
      tabbar: Tabbar,
    },
    meta: {
      title: "首页",
      keepAlive: true,
    },
  },
  {
    path: "/question",
    components: {
      default: Question,
      tabbar: Tabbar,
    },
    meta: {
      title: "问答",
      keepAlive: false,
    },
  },
  {
    path: "/video",
    components: {
      default: Video,
      tabbar: Tabbar,
    },
    meta: {
      title: "视频",
      keepAlive: false,
    },
  },
  {
    path: "/user",
    components: User,
    meta: {
      title: "我的",
      keepAlive: false,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
