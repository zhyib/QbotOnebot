const ErrorUtil = require('@utils/Error');
const getTest = require('@timeEvent/getTest');
const getNews = require('@timeEvent/getNews');
const getEpic = require('@timeEvent/getEpic');
const getLc = require('@timeEvent/getLc');
const getDaily = require('@timeEvent/getDaily');
const getTea = require('@timeEvent/getTea');
const config = require('@utils/config');

const { timeConfig } = config.data;

const str2Func = {
  getEpic,
  getLc,
  getTest,
  getNews,
  getDaily,
  getTea,
};

let bot = null;

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
     * 6: (香港标准时间)
     */
    const [day, MM, dd, yyyy, time, gmt, zone] = now.toString()
      .split(' ');
    const HHmm = time.slice(0, 5);
    if (timeConfig[HHmm] !== undefined) {
      str2Func[timeConfig[HHmm]]({
        bot,
        now,
      });
      console.log(`Time: ${HHmm}`);
    }
    if (timeConfig[day] !== undefined) {
      if (timeConfig[day][HHmm] !== undefined) {
        str2Func[timeConfig[day][HHmm]]({
          bot,
          now,
        });
        console.log(`Time: ${day} ${HHmm}`);
      }
    }
  } catch (e) {
    new ErrorUtil(e, bot).reportGroup();
  }
}

function timer() {
  console.log('Timer started');
  setInterval(() => {
    check(new Date());
  }, 60000);
}

module.exports = function timeHandler(botIn) {
  bot = botIn;
  timer();
};
