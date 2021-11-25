const replyClear = require('@commands/replyClear');
const replyFree = require('@commands/replyFree');
const replyHistory = require('@commands/replyHistory');
const replyRoll = require('@commands/replyRoll');
const replyStatus = require('@commands/replyStatus');
const replyUpdate = require('@commands/replyUpdate');
const replyWsSayings = require('@commands/replyWsSayings');

const getDaily = require('@timeEvent/getDaily');
const getEpic = require('@timeEvent/getEpic');
const getLc = require('@timeEvent/getLc');
const getNews = require('@timeEvent/getNews');
const getTea = require('@timeEvent/getTea');
const getTest = require('@timeEvent/getTest');

const handlers = {
  '#help': null,
  '#WS语录': replyWsSayings,
  '#ws语录': replyWsSayings,
  '#status': replyStatus,
  '#roll': replyRoll,
  '#查看消息': replyHistory,
  '#free': replyFree,
  '#update': replyUpdate,
  '#每日': getDaily,
  '#epic': getEpic,
  '#LC': getLc,
  '#news': getNews,
  '#tea': getTea,
  '#测试': getTest,
  '#clear': replyClear,
};

module.exports = function command(bot, data) {
  // console.log(data);
  const commandBody = data.raw_message.split(' ')[0];
  if (handlers[commandBody] !== undefined) {
    if (commandBody === '#help') {
      bot.sendGroupMsg(data.group_id, Object.keys(handlers).join(', '));
    } else {
      handlers[commandBody]({
        bot,
        data,
      });
      console.log(`Command: ${commandBody}`);
    }
  }
};
