const messageQueue = (function messageQueue() {
  const limit = 20;
  const data = [];
  let copyTimes = 1;
  return {
    add(val) {
      if (val === this.tail()) {
        copyTimes++;
      } else {
        copyTimes = 1;
      }
      data.push(val);
      if (data.length > limit) {
        data.shift();
      }
      // console.log(data);
      // console.log(copyTimes);
    },
    get() {
      return data;
    },
    getCopyTimes() {
      return copyTimes;
    },
    getString() {
      let ret = '';
      for (let i = 0; i < data.length; i++) {
        ret += `${data[i]}\n`;
      }
      return ret;
    },
    head() {
      return data[0];
    },
    tail() {
      return data[data.length - 1];
    },
  };
}());

module.exports = messageQueue;
