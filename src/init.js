const timeHandler = require('@/timeHandler');
const config = require('@utils/config');

module.exports = function init(bot) {
  timeHandler(bot);
  config.load();
};
