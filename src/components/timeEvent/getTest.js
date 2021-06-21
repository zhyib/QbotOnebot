module.exports = function getTest(param) {
  const { bot, data } = param;
  const now = new Date();
  const groupId = data?.group_id || 166795834;
  bot.sendGroupMsg(groupId, `ACK - ${now.toString()}`);
};
