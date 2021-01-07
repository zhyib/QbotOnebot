module.exports = function replyStatus(bot, data) {
  bot.sendGroupMsg(data.group_id, JSON.stringify(bot.getStatus()));
};
