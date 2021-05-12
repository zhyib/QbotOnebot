const replyNews = require('@module/moduleNews');

module.exports = function getLc(bot, now) {
  replyNews(bot, undefined, now);
};
