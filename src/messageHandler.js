const ErrorUtil = require('@utils/Error');
const config = require('@utils/config');
const command = require('@src/command');
const listener = require('@src/listener');

let online = true;

const { admin, whileList } = config.data;

module.exports = function messageHandler(bot, data) {
  // console.log(data);
  if (whileList.includes(data.group_id)) {
    try {
      const message = data.raw_message;
      if (message === '#下线' && online) {
        online = false;
        bot.sendPrivateMsg(admin, 'bot已下线');
      } else if (message === '#上线' && !online) {
        online = true;
        bot.sendPrivateMsg(admin, 'bot已上线');
      } else if (message === '#下线' || message === '#上线') {
        bot.sendPrivateMsg(admin, 'bot在线状态未变更');
      }
      if (online) {
        if (message[0] === '#') {
          command(bot, data);
        } else {
          listener(bot, data);
        }
      }
    } catch (e) {
      if (data.group_id === undefined) {
        new ErrorUtil(e, bot).reportAdmin();
      } else {
        new ErrorUtil(e, bot).reportGroup(data.group_id);
      }
    }
  }
};
