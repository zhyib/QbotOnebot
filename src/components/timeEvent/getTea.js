module.exports = function getLc(param) {
  const { bot, data, now } = param;
  console.log(now);
  const subGroups = [166795834, 782842016];
  const groupId = data ? [data.groupId] : subGroups;
  groupId.forEach((element) => {
    bot.sendGroupMsg(element, '[CQ:image,file=./data/local/tea.jpg]');
  });
};
