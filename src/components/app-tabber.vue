<template>
  <div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="search">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "AppTabbar",
  data() {
    return {
      active: 0,
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
/deep/.van-tabbar-item--active {
  color: @geek-color;
}
</style>
