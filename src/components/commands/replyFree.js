const getFromUrl = require('@utils/parseHtml');
const { sleep } = require('@utils/functions');

module.exports = async function replyFree(bot, data) {
  try {
    bot.sendGroupMsg(data.group_id, '正在拉取...');
    const dom = await getFromUrl('https://keylol.com/t572814-1-1');
    const h1s = dom.getElementsByTagName('h1');
    const ret = {};
    for (let i = 0; i < h1s.length; i++) {
      const h1 = h1s[i];
      const store = h1.childNodes[0].data;
      // console.log(h1);
      // console.log(h1.childNodes);
      // console.log(h1.childNodes.data);
      const body = {};
      const h3s = h1.nextSibling.nextSibling.nextSibling.getElementsByTagName('h3');
      for (let j = 0; j < h3s.length; j++) {
        const h3 = h3s[j];
        const title = h3.childNodes[0].data;
        const des = h3.nextSibling.data;
        if (!des.includes('FOD')) {
          body[title] = des;
        }
      }
      if (Object.keys(body).length !== 0) {
        ret[store] = body;
      }
    }
    // console.log(ret);
    let str = '';
    Object.entries(ret).forEach(([store, body]) => {
      str = `${str}${store}: \n`;
      Object.entries(body).forEach(([game, des]) => {
        str = `${str}${game}${des}\n`;
      });
    });
    await sleep(1500);
    bot.sendGroupMsg(data.group_id, str);
  } catch (e) {
    console.error(e);
  }
};
