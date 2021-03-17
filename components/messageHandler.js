const command = require('./command');
const listener = require('./listener');

let online = true;

function messageHandler(bot, data) {
  // console.log(data);
  try {
    const message = data.raw_message;
    if (message === '#下线') {
      if (online) {
        online = false;
        bot.sendGroupMsg(data.group_id, 'bot已下线，将在10min后上线');
        setTimeout(() => {
          if (!online) {
            online = true;
            bot.sendGroupMsg(data.group_id, 'bot已上线');
          }
        }, 600000);
      }
    }
    if (message === '#上线') {
      if (!online) {
        online = true;
        bot.sendGroupMsg(data.group_id, 'bot已上线');
      }
    }
    if (online) {
      if (message[0] === '#') {
        command(bot, data);
      } else {
        listener(bot, data);
      }
    }
  } catch (error) {
    console.error(error);
    bot.sendGroupMsg(data.group_id, `異常発生：\n${error.toString()}`);
  }
}

module.exports = {
  messageHandler,
};
