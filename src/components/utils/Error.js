const config = require('@utils/config');

module.exports = class ErrorUtil {
  /**
   * 错误处理类
   * @param {String} error - 错误信息
   * @param {Object} bot - bot实体
   */
  constructor(error, bot) {
    this.ADMIN = config.data.admin;
    this.DEFAULT_GROUP = 166795834;
    this.error = error;
    this.bot = bot;
  }

  reportAdmin() {
    console.error(this.error);
    this.bot.sendPrivateMsg(this.ADMIN, `異常発生：\n${this.error.toString()}`);
  }

  reportGroup(target = this.DEFAULT_GROUP) {
    console.error(this.error);
    this.bot.sendGroupMsg(target, `異常発生：\n${this.error.toString()}`);
  }
};
