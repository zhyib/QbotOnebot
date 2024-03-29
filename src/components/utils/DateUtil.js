module.exports = class DateUtil {
  /**
   * 构造函数
   * @param {Date} now
   */
  constructor(now = new Date()) {
    this.date = now;
    this.map = {
      yyyy: String(this.date.getFullYear()),
      yy: String(this.date.getFullYear() % 100).padStart(2, '0'),
      MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][this.date.getMonth()],
      MM: String(this.date.getMonth() + 1).padStart(2, '0'),
      dd: String(this.date.getDate()).padStart(2, '0'),
      // DD: 本年的第几天
      EEE: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][this.date.getDay()],
      HH: String(this.date.getHours()).padStart(2, '0'),
      hh: String(this.date.getHours() > 12 ? this.date.getHours() - 12 : this.date.getHours()).padStart(2, '0'),
      mm: String(this.date.getMinutes()).padStart(2, '0'),
      ss: String(this.date.getSeconds()).padStart(2, '0'),
      SSS: String(this.date.getMilliseconds()).padStart(3, '0'),
    };
  }

  /**
   * 根据格式化字符串格式化日期
   * @param {String} str
   * @returns {String} - 日期字符串
   */
  format(str) {
    let ret = str;
    const entries = Object.entries(this.map);
    for (let i = 0; i < entries.length; i++) {
      ret = ret.replace(entries[i][0], entries[i][1]);
    }
    return ret;
  }
};
