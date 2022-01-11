const timeHandler = require('@src/timeHandler');
const config = require('@utils/config');

/**
 * 需要在启动时的初始化项
 * @param {Object} bot
 */
module.exports = function init(bot) {
  timeHandler(bot);
  config.load();
  bot.sendPrivateMsg(config.data.admin, 'Online');
};
