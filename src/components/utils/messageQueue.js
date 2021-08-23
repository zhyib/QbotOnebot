module.exports = (function messageQueue() {
  const LIMIT = 20;
  const data = {};
  const copyTimes = {};
  return {
    /**
     * Count copytimes
     * add string into array
     * @param {String} val
     * @param {Number} groupId
     */
    add(val, groupId) {
      if (data[groupId] === undefined) {
        data[groupId] = [];
        copyTimes[groupId] = [];
      }
      if (val === this.tail(groupId)) {
        copyTimes[groupId]++;
      } else {
        copyTimes[groupId] = 1;
      }
      // resize length to LIMIT
      data[groupId].push(val);
      if (data[groupId].length > LIMIT) {
        data[groupId].shift();
      }
      // console.log(data);
      // console.log(copyTimes);
    },

    /**
     * Get history array
     * @param {Number} groupId
     * @returns {Array}
     */
    get(groupId) {
      return data[groupId];
    },

    /**
     * Get copyTimes
     * @param {Number} groupId
     * @returns {Number}
     */
    getCopyTimes(groupId) {
      return copyTimes[groupId];
    },

    /**
     * Get the last $num$ records
     * @param {Number} num
     * @param {Number} groupId
     * @returns {String}
     */
    getString(num, groupId) {
      const retData = data[groupId];
      if (retData === undefined) {
        return '';
      }

      const { length } = retData;
      let ret = '';
      if (num === undefined) {
        for (let i = 0; i < length; i++) {
          ret += `${retData[i]}\n`;
        }
      } else {
        for (let i = length - num; i < length; i++) {
          ret += `${retData[i]}\n`;
        }
      }
      return ret;
    },

    /**
     * Return the head of data array
     * @param {Number} groupId
     * @returns {String}
     */
    head(groupId) {
      return data[groupId][0];
    },

    /**
     * Return the tail of data array
     * @param {Number} groupId
     * @returns {String}
     */
    tail(groupId) {
      return data[groupId][data[groupId].length - 1];
    },
  };
}());
