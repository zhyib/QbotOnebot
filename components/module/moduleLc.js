const axios = require('axios');

module.exports = async function replyLc(bot, dataIn, now) {
  console.log(now);
  const groupId = dataIn === undefined ? 166795834 : dataIn.group_id;
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
      const data = contestUpcomingContests[flag];
      //   console.log(data);
      let ret = '';
      ret += `[CQ:image,file=${data.cardImg}]\n`;
      ret += `${data.title}\n`;
      ret += `https://leetcode-cn.com/contest/${data.titleSlug}`;
      //   console.log(ret);
      bot.sendGroupMsg(groupId, ret);
    })
    .catch((error) => {
      console.log(error);
    });
};
