module.exports = function moduleTea(bot, dataIn, now) {
  console.log(now);
  const groupId = dataIn?.group_id || 166795834;
  bot.sendGroupMsg(groupId, '[CQ:image,file=./data/local/tea.jpg]');
};
