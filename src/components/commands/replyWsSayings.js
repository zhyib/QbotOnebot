const config = require('@utils/config');

const { wsSayings } = config.commandConfig;

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
