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

module.exports = function replyWsSayings(param) {
  const { bot, data } = param;
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
};
