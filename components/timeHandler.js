const getTest = require('./timeEvent/getTest');
const getNews = require('./timeEvent/getNews');
const getEpic = require('./timeEvent/getEpic');
const getLc = require('./timeEvent/getLc');

let bot = null;

const handlers = {
  Fri: {
    '14:00': getEpic,
  },
  Sat: {
    '22:00': getLc,
  },
  'xx:xx': getTest,
  '09:00': getNews,
};

function check(now) {
  try {
    /**
     * now.toString(): 'Mon Dec 14 2020 17:29:20 GMT+0800 (香港标准时间)'
     * 0: Mon
     * 1: Dec
     * 2: 14
     * 3: 2020
     * 4: 17:29:20
     * 5: GMT+0800
     * 6:(香港标准时间)
     */
    const [day, MM, dd, yyyy, time, gmt, zone] = now.toString().split(' ');
    const HHmm = time.slice(0, 5);
    if (handlers[HHmm] !== undefined) {
      handlers[HHmm](bot, now);
      console.log(`Time: ${HHmm}`);
    }
    if (handlers[day] !== undefined) {
      if (handlers[day][HHmm] !== undefined) {
        handlers[day][HHmm](bot, now);
        console.log(`Time: ${day} ${HHmm}`);
      }
    }
  } catch (error) {
    console.error(error);
    bot.sendGroupMsg(166795834, `異常発生：${error.toString()}`);
  }
}

function timer() {
  console.log('Timer started');
  setInterval(() => {
    const now = new Date();
    //   console.log(now.valueOf());
    check(now);
  }, 60000);
}

module.exports = function timeHandler(botIn) {
  bot = botIn;
  timer();
};
