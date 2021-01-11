const messageQueue = require('../utils/messageQueue');

module.exports = function replyRoll(bot, data) {
  bot.sendGroupMsg(data.group_id, messageQueue.getString());
};
