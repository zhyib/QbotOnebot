const messageQueue = require('@utils/messageQueue');
const sleep = require('@utils/sleep.js');

const PROB = 0.3;

let data;
let bot;

const imagePair = {
  WZAJY: ['WZAJY.gif'],
  '好！': ['hao(0).jpg', 'hao(1).jpg', 'hao(2).jpg', 'hao(3).jpg'],
  上班: ['shangban(0).jpg', 'shangban(1).jpg', 'shangban(2).jpg'],
  下班: ['xiaban(0).jpg', 'xiaban(1).jpg'],
  // 饿了: ['EE.jpg'],
  举报: ['report.jpg'],
};

function imagePairFunc() {
  const message = data.raw_message;
  const keys = Object.keys(imagePair);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (message.includes(key)) {
      const replies = imagePair[key];
      const rand = Math.floor(Math.random() * replies.length);
      bot.sendGroupMsg(data.group_id, `[CQ:image,file=./data/local/${replies[rand]}]`);
      console.log(`Linster | Image Pair: ${key}`);
      return true;
    }
  }
  return false;
}

const wordsPair = {
  给我买: ['我的呢我的呢~'],
  氪: ['氪，都可以氪'],
  困了: ['该睡了', 'WAMTJ', '才八点！', '睡吧睡吧，哦呀斯密~'],
  想睡觉: ['该睡了', 'WAMTJ', '才八点！', '睡吧睡吧，哦呀斯密~'],
  想摸鱼: ['该摸了', '摸，摸tmd', '不准摸！“奋斗本来就是一种幸福！”', '不准摸！“奋斗的人生才能称得上有意义的人生！”'],
  摸了: ['该摸了', '摸，摸tmd', '不准摸！“奋斗本来就是一种幸福！”', '不准摸！“奋斗的人生才能称得上有意义的人生！”'],
  吃什么: ['六点半盖码饭', '热卤', '10元吃屎', '重庆', '13.5', '壮阳套餐', '骨气', '一粒米', '卤味套餐', '马玉涛', '杨国福', '麦咭堡', '优客', '桂林米粉', '牛杂皇', '津市牛肉粉', '杭州小笼包', 'KFC', 'M记', '多一点', '大小屋', '10元三样', '新概念', '沙县', '左边右边', '四食堂', '百烧！', '盐酥鸡'],
  想吃: ['给我饿着！', '爬！', '吃，都可以吃', '吃，XD请客'],
  饿: ['给我饿着！', '爬！', '吃，都可以吃', '吃，XD请客'],
  肛: ['去你🐎的SJL', 'no gay, pong友', '你可闭嘴吧你SJL'],
};

function wordsPairFunc() {
  const message = data.raw_message;
  const keys = Object.keys(wordsPair);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (message.includes(key)) {
      const replies = wordsPair[key];
      const rand = Math.floor(Math.random() * replies.length);
      bot.sendGroupMsg(data.group_id, replies[rand]);
      console.log(`Linster | Words Pair: ${key}`);
      return true;
    }
  }
  return false;
}

const wholePair = {
  测试: ['ACK'],
  输了: ['输了', '输的透彻', '大失败'],
  我是傻逼: ['你是傻逼'],
  我懂了: ['我也懂了', '你又懂了？'],
};

function wholePairFunc() {
  const message = data.raw_message;
  const keys = Object.keys(wholePair);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (message === key) {
      const replies = wholePair[key];
      const rand = Math.floor(Math.random() * replies.length);
      bot.sendGroupMsg(data.group_id, replies[rand]);
      console.log(`Linster | Whole Pair: ${key}`);
      return true;
    }
  }
  return false;
}

const copyKeyword = [
  'TMDHS', 'NB', 'GB', 'WAMTJ', '？？？', 'JY', '你有问题', '你不对劲',
];

function copyKeywordFunc() {
  const message = data.raw_message;
  for (let i = 0; i < copyKeyword.length; i++) {
    const value = copyKeyword[i];
    if (message.includes(value)) {
      bot.sendGroupMsg(data.group_id, message);
      console.log(`Linster | Repeat: ${value}`);
      return true;
    }
  }
  return false;
}

const singleWord = {
  夸: ['NB', '天秀'],
  喷: ['GB', 'SJL', '爬'],
};

const singleTarget = [
  'WS', 'MQ', 'XD', 'GQ', 'ZY',
];

function targetFunc() {
  const message = data.raw_message;
  const head = message[0];
  const follows = message.slice(1);
  if (singleTarget.includes(follows) && Object.keys(singleWord).includes(head)) {
    const replies = singleWord[head];
    const rand = Math.floor(Math.random() * replies.length);
    bot.sendGroupMsg(data.group_id, `${follows}${replies[rand]}`);
    console.log(`Linster | Target: ${head} ${follows}`);
    return true;
  }
  return false;
}

// 全句拷贝
function copyAllFunc() {
  if (messageQueue.getCopyTimes() === 2) {
    const reply = messageQueue.tail();
    bot.sendGroupMsg(data.group_id, `${reply}`);
    console.log(`Linster | CopyAll: ${reply}`);
    return true;
  }
  return false;
}

module.exports = function linstener(botIn, dataIn) {
  bot = botIn;
  data = dataIn;
  const rawMessage = data.raw_message;
  if (rawMessage.includes('[CQ:reply')) {
    // ignore all the 'CQ:reply' status
    const arr = rawMessage.split(' ');
    messageQueue.add(arr[arr.length - 1]);
    return false;
  }
  messageQueue.add(rawMessage);
  sleep(3000);
  if (Math.random() < PROB) {
    return (imagePairFunc()
          || wordsPairFunc()
          || wholePairFunc()
          || copyKeywordFunc()
          || targetFunc()
          || copyAllFunc());
  }
  return false;
};
