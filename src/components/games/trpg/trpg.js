const Player = require('@games/trpg/Player');

module.exports = (function trpg() {
  let player = null;
  return {
    player,
    create(bot, data) {
      if (player) {
        bot.sendGroupMsg(data.group_id, '角色已存在');
      } else {
        player = new Player();
        bot.sendGroupMsg(data.group_id, `角色已创建\n${player.print()}`);
      }
    },
    explore(bot, data) {
      if (player !== null && !player.explore(bot, data.group_id)) {
        player = null;
      }
    },
    train(bot, data) {
      if (player !== null && !player.train(bot, data.group_id)) {
        player = null;
      }
    },
    rest(bot, data) {
      if (player !== null && !player.rest(bot, data.group_id)) {
        player = null;
      }
    },
  };
}());
