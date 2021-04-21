const moduleDaily = require('../module/moduleDaily');

module.exports = function getDaily(bot, now) {
  moduleDaily(bot, undefined, now);
};
