module.exports = function replyStatus(param) {
  const { bot, data } = param;
  bot.sendGroupMsg(data.group_id, JSON.stringify(bot.getStatus()));
};
