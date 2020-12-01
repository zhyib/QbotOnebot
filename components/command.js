const { replyTest } = require('./commands/replyTest');
const { replyWsSayings } = require('./commands/replyWsSayings');
const { replyEpic } = require('./commands/replyEpic');
const { replyEroPic } = require('./commands/replyEroPic');

const handlers = {
  '#测试': replyTest,
  '#WS语录': replyWsSayings,
  '#ws语录': replyWsSayings,
  '#epic': replyEpic,
  '#涩图': replyEroPic,
  '#色图': replyEroPic,
};

module.exports = function command(bot, data) {
  // console.log(data);
  const commandBody = data.raw_message.split(' ')[0];
  if (handlers[commandBody] !== undefined) {
    handlers[commandBody](bot, data);
    console.log(`Command: ${commandBody}`);
  }
};
