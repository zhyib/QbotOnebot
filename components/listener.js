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

module.exports = function linstener(botInst, dataObj) {
    bot = botInst;
    data = dataObj;
    const message = data.raw_message;
    if (
        imagePairFunc()
        || wordsPairFunc()
        || wholePairFunc()
        || copyKeywordFunc()
    ) {
        return 0;
    }
}

const imagePair = {
    'WZAJY': 'WZAJY.gif',
}

function imagePairFunc() {
    const message = data.raw_message;
    for (const key in imagePair) {
        if (message === key) {
            const reply = imagePair[key];
            bot.sendGroupMsg(data.group_id, `[CQ:image,file=./data/local/${reply}]`);
            console.log('Linster | Image Pair: ' + key);
            return true;
        }
    }
    return false;
}

const wordsPair = {
    "给我买": ["我的呢我的呢~"],
    "氪": ["氪，都可以氪"],
    "困了": ["该睡了", "WAMTJ", "才八点！","睡吧睡吧，哦呀斯密~"],
    "想睡觉": ["该睡了", "WAMTJ", "才八点！","睡吧睡吧，哦呀斯密~"],
    "想摸鱼": ["该摸了", "摸，摸tmd", "不准摸！“奋斗本来就是一种幸福！”", "不准摸！“奋斗的人生才能称得上有意义的人生！”"],
    "摸了": ["该摸了", "摸，摸tmd", "不准摸！“奋斗本来就是一种幸福！”", "不准摸！“奋斗的人生才能称得上有意义的人生！”"],
    "吃什么": ["六点半盖码饭", "热卤", "10元吃屎", "重庆", "13.5", "壮阳套餐", "骨气", "一粒米", "卤味套餐", "马玉涛", "杨国福", "麦咭堡", "优客", "桂林米粉", "牛杂皇", "津市牛肉粉", "杭州小笼包", "KFC", "M记", "多一点", "大小屋", "10元三样", "新概念", "沙县", "左边右边", "四食堂", "百烧！", "盐酥鸡"],
};

function wordsPairFunc() {
    const message = data.raw_message;
    for (const key in wordsPair) {
        if (message.includes(key)) {
            const reply = wordsPair[key];
            const rand = Math.floor(Math.random() * reply.length);
            bot.sendGroupMsg(data.group_id, reply[rand]);
            console.log('Linster | Words Pair: ' + key);
            return true;
        }
    }
    return false;
}

const wholePair = {
    "测试": ["ACK"],
    "输了": ["输了", "输的透彻"],
    "我是傻逼": ["你是傻逼"],
    "我懂了": ["我也懂了", "你又懂了？"],
};

function wholePairFunc() {
    const message = data.raw_message;
    for (const key in wholePair) {
        if (message === key) {
            const reply = wholePair[key];
            const rand = Math.floor(Math.random() * reply.length);
            bot.sendGroupMsg(data.group_id, reply[rand]);
            console.log('Linster | Whole Pair: ' + key);
            return true;
        }
    };
    return false;
}

const copyKeyword = [
    "TMDHS", "NB", "GB", "WAMTJ", "？？？", "JY", "你有问题", "你不对劲"
];

function copyKeywordFunc() {
    const message = data.raw_message;
    for (const value of copyKeyword) {
        if (message.includes(value)) {
            bot.sendGroupMsg(data.group_id, message);
            console.log('Linster | Repeat: ' + value);
            return true;
        }
    };
    return false;
}
