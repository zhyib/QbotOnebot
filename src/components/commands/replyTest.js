module.exports = function replyTest(bot, data) {
  bot.sendGroupMsg(data.group_id, 'ACK');
};
