module.exports = (function messageQueue() {
  const LIMIT = 20;
  const data = [];
  let copyTimes = 1;
  return {
    /**
     * Count copytimes
     * add string into array
     * @param {String} val
     */
    add(val) {
      if (val === this.tail()) {
        copyTimes++;
      } else {
        copyTimes = 1;
      }
      // resize length to LIMIT
      data.push(val);
      if (data.length > LIMIT) {
        data.shift();
      }
      // console.log(data);
      // console.log(copyTimes);
    },

    /**
     * Get history array
     * @returns {Array}
     */
    get() {
      return data;
    },

    /**
     * Get copyTimes
     * @returns {Number}
     */
    getCopyTimes() {
      return copyTimes;
    },

    /**
     * Get the last $num$ records
     * @param {Number} num
     * @returns {String}
     */
    getString(num) {
      let ret = '';
      if (num === undefined) {
        for (let i = 0; i < data.length; i++) {
          ret += `${data[i]}\n`;
        }
      } else {
        for (let i = data.length - num; i < data.length; i++) {
          ret += `${data[i]}\n`;
        }
      }
      return ret;
    },

    /**
     * Return the head of data array
     * @returns {String}
     */
    head() {
      return data[0];
    },

    /**
     * Return the tail of data array
     * @returns {String}
     */
    tail() {
      return data[data.length - 1];
    },
  };
}());
