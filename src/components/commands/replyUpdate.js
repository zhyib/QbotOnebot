const { execSync } = require('child_process');

module.exports = function replyUpdate(param) {
  const { bot, data } = param;
  execSync('git checkout .\n'
    + 'git pull');
  bot.sendGroupMsg(data.group_id, 'File updated');
};
