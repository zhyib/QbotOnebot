const axios = require('axios');
const ErrorUtil = require('@utils/Error');

// 直接用 axios 拿的 json
// 使用 then 解析

module.exports = async function replyLc(param) {
  const { bot, data, now } = param;
  console.log(now);
  const groupId = data?.group_id || 166795834;
  axios.post('https://leetcode-cn.com/graphql', { query: '{contestUpcomingContests{\ncontainsPremium\ntitle\ncardImg\ntitleSlug\n}\n}\n' })
    .then((response) => {
      const res = response.data;
      const { contestUpcomingContests } = res.data;
      let flag = -1;
      if (contestUpcomingContests[0].titleSlug[0] === 'b') {
        flag = 1;
      } else {
        flag = 0;
      }
      const dataLc = contestUpcomingContests[flag];
      //   console.log(data);
      let ret = '';
      ret += `[CQ:image,file=${dataLc.cardImg}]\n`;
      ret += `${dataLc.title}\n`;
      ret += `https://leetcode-cn.com/contest/${dataLc.titleSlug}`;
      //   console.log(ret);
      bot.sendGroupMsg(groupId, ret);
    })
    .catch((e) => {
      throw e;
    });
};
