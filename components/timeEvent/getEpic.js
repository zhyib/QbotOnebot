const axios = require('axios');

function replyEpic(bot, data) {
  bot.sendGroupMsg(166795834, '正在获取Epic商店信息');
  axios.get('https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=zh-CN')
    .then((response) => {
      const res = response.data;
      const games = res.data.Catalog.searchStore.elements;
      let ret = '';
      for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const d = new Date(game.effectiveDate);
        ret += (
          // `[CQ:image,file=${game.keyImages[0].url}]\n`
          `名称 ${game.title}\n`
                  + `时间 ${d.toString().split(' ').slice(0, 4).join(' ')}\n`
                  + '=========='
        );
      }
      bot.sendGroupMsg(166795834, ret);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = function getEpic(bot, now) {
  replyEpic(bot);
};
