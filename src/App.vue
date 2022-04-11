<template>
  <div id="app">
    <keep-alive>
      <RouterView class="body" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <keep-alive>
      <RouterView class="body" v-if="!$route.meta.keepAlive" />
    </keep-alive>
    <RouterView class="footer" name="tabbar" />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route.meta.keepAlive);
  },
};
</script>
<style lang="less" scoped>
#app {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .body {
    flex: 1;
    overflow: hidden;
  }
  .footer {
    height: 50px;
  }
}
</style>
