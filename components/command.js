const replyTest = require('./commands/replyTest');
const replyWsSayings = require('./commands/replyWsSayings');
const replyEpic = require('./commands/replyEpic');
const replyEroPic = require('./commands/replyEroPic');
const replyStatus = require('./commands/replyStatus');
const replyRoll = require('./commands/replyRoll');
const replyHistory = require('./commands/replyHistory');
const replyLc = require('./commands/replyLc');
const replyDaily = require('./commands/replyDaily');

const handlers = {
  '#help': null,
  '#测试': replyTest,
  '#WS语录': replyWsSayings,
  '#ws语录': replyWsSayings,
  '#epic': replyEpic,
  '#涩图': replyEroPic,
  '#色图': replyEroPic,
  '#status': replyStatus,
  '#roll': replyRoll,
  '#查看消息': replyHistory,
  '#LC': replyLc,
  '#每日': replyDaily,
};

module.exports = function command(bot, data) {
  // console.log(data);
  const commandBody = data.raw_message.split(' ')[0];
  if (handlers[commandBody] !== undefined) {
    if (commandBody === '#help') {
      bot.sendGroupMsg(data.group_id, Object.keys(handlers).toString());
    } else {
      handlers[commandBody](bot, data);
      console.log(`Command: ${commandBody}`);
    }
  }
};
