const replyTest = require('@commands/replyTest');
const replyWsSayings = require('@commands/replyWsSayings');
const replyEpic = require('@commands/replyEpic');
const replyStatus = require('@commands/replyStatus');
const replyRoll = require('@commands/replyRoll');
const replyHistory = require('@commands/replyHistory');
const replyLc = require('@commands/replyLc');
const replyDaily = require('@commands/replyDaily');
const replyTea = require('@commands/replyTea');
const replyNews = require('@commands/replyNews');
const replyTrpg = require('@commands/replyTrpg');

const handlers = {
  '#help': null,
  '#测试': replyTest,
  '#WS语录': replyWsSayings,
  '#ws语录': replyWsSayings,
  '#epic': replyEpic,
  '#status': replyStatus,
  '#roll': replyRoll,
  '#查看消息': replyHistory,
  '#LC': replyLc,
  '#每日': replyDaily,
  '#tea': replyTea,
  '#news': replyNews,
  '#生成': replyTrpg.create,
  '#探索': replyTrpg.explore,
  '#训练': replyTrpg.train,
  '#休息': replyTrpg.rest,
};

module.exports = function command(bot, data) {
  // console.log(data);
  const commandBody = data.raw_message.split(' ')[0];
  if (handlers[commandBody] !== undefined) {
    if (commandBody === '#help') {
      bot.sendGroupMsg(data.group_id, Object.keys(handlers).join(', '));
    } else {
      handlers[commandBody](bot, data);
      console.log(`Command: ${commandBody}`);
    }
  }
};
