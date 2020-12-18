const axios = require('axios');

// function formateDate(datetime) {
//   function addDateZero(num) {
//     return (num < 10 ? `0${num}` : num);
//   }
//   const d = new Date(datetime);
//   const formatdatetime = `${d.getFullYear()}-${addDateZero(d.getMonth() + 1)}-${addDateZero(d.getDate())} ${addDateZero(d.getHours())}:${addDateZero(d.getMinutes())}:${addDateZero(d.getSeconds())}`;
// }

function replyEpic(bot, data) {
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
      bot.sendGroupMsg(data.group_id, ret);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  replyEpic,
};
