let bot;
let data = {
    self_id: Number,
    time: Date,
    post_type: 'message',
    message_type: 'group',
    sub_type: 'normal',
    message_id: String,
    group_id: Number,
    group_name: String,
    user_id: Number,
    anonymous: null,
    message: [ { type: 'text', data: [Object] } ],
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
        role: 'admin',
        title: String
    }
}
 
module.exports = function command(botInst, dataObj) {
    // console.log(data);
    bot = botInst;
    data = dataObj;
    const command = data.raw_message.split(' ')[0];
    if (handlers.hasOwnProperty(command)) {
        handlers[command]();
        console.log('Command: ' + key);
    }
}

const handlers = {
    '#测试': replyTest,
    '#WS语录': replyWsSayings,
    '#ws语录': replyWsSayings,
}

const wsSayings = [
    '再苦不能苦游戏，再穷不能穷嘴巴',
    '熬夜？怎么还有弟弟熬夜的？丢人玩意',
    '我学习我快乐',
    '学习学个屁',
    '我有钱',
    '等下，我好像撸多了',
    '信仰就是用来背叛的',
    '理性二字，已刻在心间',
    '今天周二，跑不掉了好吧，这波记忆皇帝',
    '学习不积极，脑子有问题',
    '我这人没啥优点，讲诚信算是其中之一',
]

function replyTest() {
    bot.sendGroupMsg(data.group_id, 'ACK');
}

function replyWsSayings() {
    const message = data.raw_message;
    const args = message.split(' ');
    console.log(args)
    if (args.length === 1) {
        let rand = Math.floor(Math.random() * wsSayings.length);
        bot.sendGroupMsg(data.group_id, wsSayings[rand]);
    } else if (args.length === 2) {
        try {
            if (args[1] === 'all') {
                let str = '';
                for([key, val] of wsSayings.entries()) {
                    str += '' + key + ' ' + val + '\n';
                }
                bot.sendGroupMsg(data.group_id, str);
            } else {
                bot.sendGroupMsg(data.group_id, wsSayings[+args[1]]);
            }
        }
        catch {
            bot.sendGroupMsg(data.group_id, '参数错误');
        }
    }
}