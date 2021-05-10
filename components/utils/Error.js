class ErrorUtil {
  constructor(error, bot) {
    this.ADMIN = 2416128865;
    this.defaultGroup = 166795834;
    this.error = error;
    this.bot = bot;
  }

  reportAdmin() {
    console.error(this.error);
    this.bot.sendPrivateMsg(this.ADMIN, `異常発生：\n${this.error.toString()}`);
  }

  reportGroup(target) {
    console.error(this.error);
    this.bot.sendGroupMsg(target || this.defaultGroup, `異常発生：\n${this.error.toString()}`);
  }
}

module.exports = ErrorUtil;
