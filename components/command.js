const axios = require('axios');

let data;
let bot;

const wsSayings = [
  '再苦不能苦游戏，再穷不能穷嘴巴',
  '熬夜？怎么还有弟弟熬夜的？丢人玩意',
  '我学习我快乐',
  '学习学个屁',
  '我有钱',
  '等下，我好像撸多了',
  '信仰就是用来背叛的',
  '理性二字，已刻在心间',
  '今天周二，跑不掉了好吧，这波记忆皇帝',
  '学习不积极，脑子有问题',
  '我这人没啥优点，讲诚信算是其中之一',
];

function replyTest() {
  bot.sendGroupMsg(data.group_id, 'ACK');
}

function replyWsSayings() {
  const message = data.raw_message;
  const args = message.split(' ');
  console.log(args);
  if (args.length === 1) {
    const rand = Math.floor(Math.random() * wsSayings.length);
    bot.sendGroupMsg(data.group_id, wsSayings[rand]);
  } else if (args.length === 2) {
    try {
      if (args[1] === 'all') {
        let str = '';
        for (let i = 0; i < wsSayings.length; i++) {
          str += `${i} ${wsSayings[i]}\n`;
        }
        bot.sendGroupMsg(data.group_id, str);
      } else {
        bot.sendGroupMsg(data.group_id, wsSayings[+args[1]]);
      }
    } catch {
      bot.sendGroupMsg(data.group_id, '参数错误');
    }
  }
}

// 转换时间格式
function formateDate(datetime) {
  function addDateZero(num) {
    return (num < 10 ? `0${num}` : num);
  }
  const d = new Date(datetime);
  const formatdatetime = `${d.getFullYear()}-${addDateZero(d.getMonth() + 1)}-${addDateZero(d.getDate())} ${addDateZero(d.getHours())}:${addDateZero(d.getMinutes())}:${addDateZero(d.getSeconds())}`;
  return formatdatetime;
}

function replyEpic() {
  axios.get('https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=zh-CN')
    .then((response) => {
      const res = response.data;
      const games = res.data.Catalog.searchStore.elements;
      let ret = '';
      for (let i = 0; i < games.length; i++) {
        const game = games[i];
        ret += (
          `[CQ:image,file=${game.keyImages[0].url}]\n`
                + `名称 ${game.title}\n`
                + `时间 ${formateDate(game.effectiveDate)}\n`
                + '=========='
        );
      }
      bot.sendGroupMsg(data.group_id, ret);
    })
    .catch((error) => {
      console.log(error);
    });
}

const handlers = {
  '#测试': replyTest,
  '#WS语录': replyWsSayings,
  '#ws语录': replyWsSayings,
  '#epic': replyEpic,
};

module.exports = function command(botIn, dataIn) {
  bot = botIn;
  data = dataIn;
  // console.log(data);
  const commandBody = data.raw_message.split(' ')[0];
  if (handlers[commandBody] !== undefined) {
    handlers[commandBody]();
    console.log(`Command: ${commandBody}`);
  }
};
