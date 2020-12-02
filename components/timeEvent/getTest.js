function getTest(bot, now) {
  bot.sendGroupMsg(166795834, `这是自动发送测试，时间 ${now.toString()}`);
}

module.exports = {
  getTest,
};
