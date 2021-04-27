const command = require('./command');
const listener = require('./listener');

let online = true;

const ADMIN = 2416128865;
const WHITE_LIST = [
  166795834, // Baijia
  263481546, // Test
];

module.exports = function messageHandler(bot, data) {
  // console.log(data);
  if (WHITE_LIST.includes(data.group_id)) {
    try {
      const message = data.raw_message;
      if (message === '#下线' && online) {
        online = false;
        bot.sendPrivateMsg(ADMIN, 'bot已下线');
      } else if (message === '#上线' && !online) {
        online = true;
        bot.sendPrivateMsg(ADMIN, 'bot已上线');
      } else if (message === '#下线' || message === '#上线') {
        bot.sendPrivateMsg(ADMIN, 'bot在线状态未变更');
      }
      if (online) {
        if (message[0] === '#') {
          command(bot, data);
        } else {
          listener(bot, data);
        }
      }
    } catch (error) {
      console.error(error);
      bot.sendPrivateMsg(ADMIN, `異常発生：\n${error.toString()}`);
    }
  }
};
