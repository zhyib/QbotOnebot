/**
 * message = 
 * {
 *   self_id: Number,
 *   time: timestamp,
 *   post_type: 'message',
 *   message_type: 'group',
 *   sub_type: 'normal',
 *   message_id: '1CfEaOgADYm5Mcz4X',
 *   group_id: Number,
 *   group_name: String,
 *   user_id: Number,
 *   anonymous: null,
 *   message: [ { type: 'text', data: [Object] } ],
 *   raw_message: String,
 *   font: String,
 *   sender: {
 *     user_id: Number,
 *     nickname: String,
 *     card: String,
 *     sex: String
 *     age: Number,
 *     area: String,
 *     level: Number,
 *     role: 'admin',
 *     title: String
 *   }
 * }
 * 
 */

const command = require('./command');
const linstener = require('./listener')

module.exports = function messageHandler(bot, data) {
    // console.log(data);
    const message = data.raw_message;
    if (message[0] === '#') {
        command(bot, data);
    } else {
        linstener(bot, data);
    }
}