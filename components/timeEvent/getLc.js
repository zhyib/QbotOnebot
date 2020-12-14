const axios = require('axios');

module.exports = async function getLc(bot, now) {
  console.log(now);
  axios.post('https://leetcode-cn.com/graphql', { query: '{contestUpcomingContests{\ncontainsPremium\ntitle\ncardImg\ntitleSlug\n}\n}\n' })
    .then((response) => {
      const res = response.data;
      const data = res.data.contestUpcomingContests[1];
      //   console.log(data);
      let ret = '';
      ret += `[CQ:image,file=${data.cardImg}]\n`;
      ret += `${data.title}\n`;
      ret += `https://leetcode-cn.com/contest/${data.titleSlug}`;
      //   console.log(ret);
      bot.sendGroupMsg(166795834, ret);
    })
    .catch((error) => {
      console.log(error);
    });
};
