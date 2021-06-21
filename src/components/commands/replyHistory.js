const messageQueue = require('@utils/messageQueue');

module.exports = function replyRoll(param) {
  const { bot, data } = param;
  const message = data.raw_message;
  const [cmd, num] = message.split(' ');
  bot.sendGroupMsg(data.group_id, messageQueue.getString(num));
};
