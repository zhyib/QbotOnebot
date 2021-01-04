const replyEpic = require('../module/moduleEpic');

module.exports = function getEpic(bot, now) {
  replyEpic(bot);
};
