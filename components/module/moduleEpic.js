const axios = require('axios');
const parseDate = require('@utils/parseDate');

// 直接用 axios 拿的 json
// 使用 then 解析

function moduleEpic(bot, dataIn, now) {
  console.log(now);
  const groupId = dataIn === undefined ? 166795834 : dataIn.group_id;
  bot.sendGroupMsg(groupId, '正在获取Epic商店信息');
  axios.get('https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=zh-CN')
    .then((response) => {
      const res = response.data;
      const games = res.data.Catalog.searchStore.elements;
      let ret = '';
      for (let i = 0; i < games.length; i++) {
        const game = games[i];
        let dates = [];
        if (game.promotions) {
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
        }
        if (dates.length > 0) {
          ret += (
            // `[CQ:image,file=${game.keyImages[0].url}]\n`
            `名称 ${game.title}\n`
              + `开始 ${parseDate(dates[0]).dateTimeString()}\n`
              + `结束 ${parseDate(dates[1]).dateTimeString()}\n`
              + '=================\n'
          );
        }
      }
      bot.sendGroupMsg(groupId, ret);
    })
    .catch((error) => {
      bot.sendGroupMsg(groupId, error.toString());
      console.log(error);
    });
}

module.exports = moduleEpic;
