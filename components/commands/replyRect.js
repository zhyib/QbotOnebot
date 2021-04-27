const paint = require('@utils/paint');

module.exports = function replyRect(bot, data) {
  const message = data.raw_message;
  const [cmd, color] = message.split(' ');
  paint.paintRect(color);
  bot.sendGroupMsg(data.group_id, '[CQ:image,file=./components/utils/image.png]');
};
