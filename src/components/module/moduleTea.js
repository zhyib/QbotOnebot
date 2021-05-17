module.exports = function moduleTea(bot, dataIn, now) {
  console.log(now);
  const subGroups = [166795834, 782842016];
  const groupId = dataIn ? [dataIn.groupId] : subGroups;
  groupId.forEach((element) => {
    bot.sendGroupMsg(element, '[CQ:image,file=./data/local/tea.jpg]');
  });
};
