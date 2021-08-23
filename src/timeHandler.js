const getDaily = require('@timeEvent/getDaily');
const getEpic = require('@timeEvent/getEpic');
const getLc = require('@timeEvent/getLc');
const getNews = require('@timeEvent/getNews');
const getTea = require('@timeEvent/getTea');
const getTest = require('@timeEvent/getTest');
const DateUtil = require('@utils/DateUtil');
const ErrorUtil = require('@utils/Error');
const config = require('@utils/config');

const { timeConfig } = config;

const funcRegister = {
  getDaily,
  getEpic,
  getLc,
  getNews,
  getTea,
  getTest,
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
    const dateUtil = new DateUtil(now);
    const day = dateUtil.format('EEE');
    const HHmm = dateUtil.format('HH:mm');
    if (timeConfig[HHmm] !== undefined) {
      funcRegister[timeConfig[HHmm]]({
        bot,
        now,
      });
      console.log(`Time: ${HHmm}`);
    }
    if (timeConfig[day] !== undefined) {
      if (timeConfig[day][HHmm] !== undefined) {
        funcRegister[timeConfig[day][HHmm]]({
          bot,
          now,
        });
        console.log(`Time: ${day} ${HHmm}`);
      }
    }
  } catch (e) {
    new ErrorUtil(e, bot).reportAdmin();
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
