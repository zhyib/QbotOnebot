const command = require('./command');
const listener = require('./listener');

function messageHandler(bot, data) {
  // console.log(data);
  try {
    const message = data.raw_message;
    if (message[0] === '#') {
      command(bot, data);
    } else {
      listener(bot, data);
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  messageHandler,
};
