const messageQueue = require('@utils/messageQueue');
const config = require('@utils/config');
const { sleep } = require('@utils/functions');

const PROB = 0.3;

let data;
let bot;

const {
  imagePair, partPair, wholePair, copyKeyword,
} = config.listenerConfig;

function imagePairFunc() {
  const message = data.raw_message;
  const keys = Object.keys(imagePair);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (message.includes(key)) {
      const replies = imagePair[key];
      const rand = Math.floor(Math.random() * replies.length);
      bot.sendGroupMsg(data.group_id, `[CQ:image,file=./data/local/${replies[rand]}]`);
      console.log(`Listener | Image Pair: ${key}`);
      return true;
    }
  }
  return false;
}

function partPairFunc() {
  const message = data.raw_message;
  const keys = Object.keys(partPair);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (message.includes(key)) {
      const replies = partPair[key];
      const rand = Math.floor(Math.random() * replies.length);
      bot.sendGroupMsg(data.group_id, replies[rand]);
      console.log(`Listener | Words Pair: ${key}`);
      return true;
    }
  }
  return false;
}

function wholePairFunc() {
  const message = data.raw_message;
  const keys = Object.keys(wholePair);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (message === key) {
      const replies = wholePair[key];
      const rand = Math.floor(Math.random() * replies.length);
      bot.sendGroupMsg(data.group_id, replies[rand]);
      console.log(`Listener | Whole Pair: ${key}`);
      return true;
    }
  }
  return false;
}

function copyKeywordFunc() {
  const message = data.raw_message;
  for (let i = 0; i < copyKeyword.length; i++) {
    const value = copyKeyword[i];
    if (message.includes(value)) {
      bot.sendGroupMsg(data.group_id, message);
      console.log(`Listener | Repeat: ${value}`);
      return true;
    }
  }
  return false;
}

// const singleWord = {
//   夸: ['NB', '天秀'],
//   喷: ['GB', 'SJL', '爬'],
// };
//
// const singleTarget = [
//   'WS', 'MQ', 'XD', 'GQ', 'ZY',
// ];
//
// function targetFunc() {
//   const message = data.raw_message;
//   const head = message[0];
//   const follows = message.slice(1);
//   if (singleTarget.includes(follows) && Object.keys(singleWord).includes(head)) {
//     const replies = singleWord[head];
//     const rand = Math.floor(Math.random() * replies.length);
//     bot.sendGroupMsg(data.group_id, `${follows}${replies[rand]}`);
//     console.log(`Listener | Target: ${head} ${follows}`);
//     return true;
//   }
//   return false;
// }

// 全句拷贝
function copyAllFunc() {
  if (messageQueue.getCopyTimes(data.group_id) === 2) {
    const reply = messageQueue.tail(data.group_id);
    bot.sendGroupMsg(data.group_id, `${reply}`);
    console.log(`Listener | CopyAll: ${reply}`);
    return true;
  }
  return false;
}

module.exports = async function listener(botIn, dataIn) {
  bot = botIn;
  data = dataIn;
  const rawMessage = data.raw_message;
  if (rawMessage.includes('[CQ:')) {
    // ignore all the 'CQ:reply' status
    const arr = rawMessage.split(' ');
    if (dataIn.group_id !== undefined) {
      messageQueue.add(arr[arr.length - 1], dataIn.group_id);
    }
    return false;
  }
  if (dataIn.group_id !== undefined) {
    messageQueue.add(rawMessage, dataIn.group_id);
  }

  await sleep(1000);
  if (Math.random() < PROB) {
    return (imagePairFunc() || copyKeywordFunc() || wholePairFunc() || partPairFunc() || copyAllFunc());
  }
  return (wholePairFunc() || partPairFunc() || copyAllFunc());
};
