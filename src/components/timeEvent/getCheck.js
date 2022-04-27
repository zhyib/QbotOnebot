const config = require('@utils/config');

module.exports = function getCheck(param) {
  const { bot, data, now } = param;
  bot.sendPrivateMsg(config.admin, '打卡！！！');
};
