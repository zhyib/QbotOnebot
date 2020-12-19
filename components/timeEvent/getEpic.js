const axios = require('axios');
const parseDate = require('../utils/parseDate');

function replyEpic(bot, data) {
  bot.sendGroupMsg(166795834, '正在获取Epic商店信息');
  axios.get('https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=zh-CN')
    .then((response) => {
      const res = response.data;
      const games = res.data.Catalog.searchStore.elements;
      let ret = '';
      for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const effectiveDate = new Date(game.effectiveDate);
        let dates = [];
        if (game.promotions.upcomingPromotionalOffers[0]) {
          dates = [
            new Date(game.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].startDate),
            new Date(game.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].endDate),
          ];
        } else if (game.promotions.promotionalOffers[0]) {
          dates = [
            new Date(game.promotions.promotionalOffers[0].promotionalOffers[0].startDate),
            new Date(game.promotions.promotionalOffers[0].promotionalOffers[0].endDate),
          ];
        }
        ret += (
          // `[CQ:image,file=${game.keyImages[0].url}]\n`
          `名称 ${game.title}\n`
          + `开始 ${parseDate(dates[0])}\n`
          + `结束 ${parseDate(dates[1])}\n`
          + '====================\n'
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
