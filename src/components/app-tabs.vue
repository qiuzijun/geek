<template>
  <van-tabs @click="onClick">
    <van-tab v-for="item in channels" :title="item.name" :key="item.id">
      <div class="button">
        <van-icon name="search" />
        <i @click="showPopup">
          <svg
            t="1649594505604"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1955"
            width="20"
            height="20"
          >
            <path
              d="M127.604 187.583h766.759c17.692 0 29.49 11.797 29.49 29.491s-11.798 29.49-29.49 29.49H127.604c-17.695 0-29.492-11.796-29.492-29.49s11.797-29.491 29.492-29.491z m0 294.907h766.759c17.692 0 29.49 11.798 29.49 29.491 0 17.695-11.798 29.491-29.49 29.491H127.604c-17.695 0-29.492-11.796-29.492-29.491 0-17.693 11.797-29.491 29.492-29.491z m0 294.907h766.759c17.692 0 29.49 11.799 29.49 29.491 0 17.693-11.798 29.491-29.49 29.491H127.604c-17.695 0-29.492-11.798-29.492-29.491 0-17.692 11.797-29.491 29.492-29.491z"
              p-id="1956"
              style="user-select: auto"
            ></path>
          </svg>
        </i>
      </div>
      <van-popup
        v-model="show"
        closeable
        position="left"
        :style="{ height: '100%', width: '100%' }"
      />
      <div class="scroll-wrapper">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <ArticleItem
              v-for="(item, index) in articles"
              :key="index"
              :list="item"
            />
          </van-list>
        </van-pull-refresh>
      </div>
    </van-tab>
  </van-tabs>
</template>
<script>
import ArticleItem from "../components/article-item.vue";
import { getMyChannels } from "../api/index";
import { getArticlesByChannel } from "../api/article";
import { Toast } from "vant";
export default {
  name: "AppTabs",
  components: {
    ArticleItem,
  },
  data() {
    return {
      active: 0,
      show: false,
      channels: [],
      articles: [],
      channel_id: "0",
      timestamp: Date.now(),
      loading: false,
      finished: false,
      isLoading: false,
    };
  },
  created() {
    //获取频道
    this.myChannels();
    // 获取文章
    this.articlesByChannel();
  },
  methods: {
    //获取频道
    async myChannels() {
      let res;
      try {
        res = await getMyChannels();
      } catch (error) {
        console.log(error);
        return;
      }
      //   console.log(res.data);
      const { channels } = res.data;
      this.channels = channels;
    },
    // 获取文章
    async articlesByChannel() {
      let res;
      this.timestamp = Date.now();
      try {
        res = await getArticlesByChannel(this.channel_id, this.timestamp);
      } catch (error) {
        console.log(error);
        return;
      }
      //   console.log(res.data);
      const { results } = res.data;
      this.timestamp = results.pre_timestamp;
      return results;
    },
    // 导航栏事件
    onClick(name, title) {
      const data = this.channels.filter((data) => {
        return data.name == title;
      });
      //   console.log(data);
      this.channel_id = `${data[0].id}`;
      //  切换频道清空articles
      this.articles = [];
      // 开始加载状态
      this.loading = true;
      this.onLoad();
    },
    // 侧边弹框
    showPopup() {
      this.show = true;
    },
    // 触底加载
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(async () => {
        const data = await this.articlesByChannel();
        for (let i = 0; i < data.length; i++) {
          this.articles.push(data[i]);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.articles.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(async () => {
        const data = await this.articlesByChannel();
        this.articles = data;
        Toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
}
/deep/ .van-tabs__wrap {
  padding-right: 86px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
/deep/.van-tabs__line {
  background: @geek-color;
  height: 2px;
  width: 32px;
}
/deep/ .van-tab {
  color: #9ea1ae;
}
/deep/.van-tab--active {
  font-size: 18px;
  color: #333;
}
/deep/ .van-tabs__wrap {
  padding-right: 86px;
}
/deep/ .van-tabs__content {
  flex: 1;
  overflow: hidden;
  height: 100%;
}
/deep/.van-tab__pane {
  height: 100%;
}
.scroll-wrapper {
  height: 100%;
  overflow-y: auto;
  padding: 0 16px;
}

.button {
  width: 80px;
  height: 50px;
  font-size: 20px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  i {
    line-height: 50px;
  }
}
</style>
