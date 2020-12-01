function replyTest(bot, data) {
  bot.sendGroupMsg(data.group_id, 'ACK');
}

module.exports = {
  replyTest,
};
