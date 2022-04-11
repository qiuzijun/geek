<template>
  <AppTabs />
</template>
<script>
import AppTabs from "../../components/app-tabs.vue";
export default {
  name: "Home",
  components: {
    AppTabs,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
