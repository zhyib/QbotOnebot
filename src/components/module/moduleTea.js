module.exports = function moduleTea(bot, dataIn, now) {
  console.log(now);
  const groupId = dataIn?.group_id || [166795834, 782842016];
  groupId.forEach((element) => {
    bot.sendGroupMsg(element, '[CQ:image,file=./data/local/tea.jpg]');
  });
};
