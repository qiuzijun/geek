import request from "../utils/request";

/**
 * 获取我的频道（未登录会返回默认的一些频道）
 */
export const getMyChannels = () => {
  return request({
    url: "v1_0/user/channels",
    methods: "get",
  });
};
