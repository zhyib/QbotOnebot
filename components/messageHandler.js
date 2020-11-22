const command = require('./command');
const listener = require('./listener');

let data = {
  self_id: Number,
  time: Date,
  post_type: String,
  message_type: String,
  sub_type: String,
  message_id: String,
  group_id: Number,
  group_name: String,
  user_id: Number,
  anonymous: null,
  message: [{ type: String, data: [Object] }],
  raw_message: String,
  font: String,
  sender: {
    user_id: Number,
    nickname: String,
    card: String,
    sex: String,
    age: Number,
    area: String,
    level: Number,
    role: String,
    title: String,
  },
};
let bot;

function messageHandler(botIn, dataIn) {
  // console.log(data);
  try {
    const message = dataIn.raw_message;
    bot = botIn;
    data = dataIn;
    if (message[0] === '#') {
      command(bot, data);
    } else {
      listener(bot, data);
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  messageHandler,
};
