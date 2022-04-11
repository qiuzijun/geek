<template>
  <div v-if="list.art_id">
    <div class="item" v-if="list.cover.images && list.cover.images.length > 1">
      <p>{{ list.title }}</p>
      <div class="img">
        <img
          v-lazy="item"
          alt=""
          v-for="(item, index) in list.cover.images"
          :key="index"
        />
      </div>
      <p class="footer">
        <span>{{ list.aut_name }}</span>
        <span>{{ list.comm_count }}评论</span>
        <span>{{ list.cover.type }} 年内</span>
      </p>
    </div>
    <div class="item_" v-else>
      <div class="left">
        <p>{{ list.title }}</p>
        <p class="footer">
          <span>{{ list.aut_name }}</span>
          <span>{{ list.comm_count }}评论</span>
          <span>{{ list.cover.type }} 年内</span>
        </p>
      </div>
      <div class="right" v-if="list.cover.images">
        <img
          v-lazy="item"
          alt=""
          v-for="(item, index) in list.cover.images"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ArticleItem",
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      active: 4,
    };
  },
};
</script>
<style lang="less" scoped>
.item {
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  .img {
    display: flex;
    justify-content: space-between;
    img {
      width: 110px;
      height: 80px;
      border-radius: 5px;
    }
  }
  .footer {
    color: #999;
    font-size: 12px;
    span {
      margin-right: 15px;
    }
  }
}
.item_ {
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .footer {
      color: #999;
      font-size: 12px;
      span {
        margin-right: 15px;
      }
    }
  }
  .right {
    padding: 16px 0;
    img {
      width: 110px;
      height: 80px;
      border-radius: 5px;
    }
  }
}
</style>
