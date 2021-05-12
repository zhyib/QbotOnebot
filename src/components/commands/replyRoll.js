module.exports = function replyRoll(bot, data) {
  const message = data.raw_message;
  const args = message.split(' ');
  const [times, dice] = args[1].split('d');
  let ret = '';
  for (let i = 0; i < times; i++) {
    ret += Math.floor(Math.random() * dice + 1);
    ret += '\n';
  }
  bot.sendGroupMsg(data.group_id, ret);
};
