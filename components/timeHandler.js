const { getTest } = require('./timeEvent/getTest');
const { getNews } = require('./timeEvent/getNews');

let bot = null;

const handlers = {
  'xx:xx': getTest,
  '09:00': getNews,
};

function check(now) {
  const time = now.toString().split(' ')[4];
  const HHmm = time.slice(0, 5);
  if (handlers[HHmm] !== undefined) {
    handlers[HHmm](bot, now);
    console.log(`Time: ${HHmm}`);
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

function timeHandler(botIn) {
  bot = botIn;
  timer();
}

module.exports = {
  timeHandler,
};
