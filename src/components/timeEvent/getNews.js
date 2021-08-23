const { sleep, getFromUrl } = require('@utils/functions');
const ErrorUtil = require('@utils/Error');

module.exports = async function getNews(param) {
  const { bot, data, now } = param;
  console.log(now);
  const groupId = data?.group_id || 166795834;
  try {
    // get dom from origin page
    const dom = await getFromUrl('https://www.zhihu.com/people/mt36501');

    // select one and get inner url
    const innerUrl = dom.getElementsByClassName('List-item')[0].getElementsByTagName('a')[0].getAttribute('href');
    // console.log(innerUrl);

    // get dom from inner page
    const innerDom = await getFromUrl(`https:${innerUrl}`).catch(() => {});
    // const imgUrl = innerDom.getElementsByClassName('RichText ztext Post-RichText')[0]
    //                .getElementsByTagName('img')[0].getAttribute('src');
    // console.log(imgUrl);
    const texts = innerDom.getElementsByClassName('RichText ztext Post-RichText')[0].getElementsByTagName('p');

    // const ret0 = `[CQ:image,file=${imgUrl}]\n`;
    let ret1 = '';
    let ret2 = '';
    let ret3 = '';
    let ret4 = '';
    for (let i = 1; i < 3; i++) {
      ret1 += `${texts[i].childNodes.toString()}\n`;
    }
    for (let i = 3; i < 8; i++) {
      ret2 += `${texts[i].childNodes.toString()}\n`;
    }
    for (let i = 8; i < 13; i++) {
      ret3 += `${texts[i].childNodes.toString()}\n`;
    }
    for (let i = 13; i < texts.length - 1; i++) {
      ret4 += `${texts[i].childNodes.toString()}\n`;
    }
    // console.log(ret0);
    // await sleep(1500);
    // console.log(ret1);
    // await sleep(1500);
    // console.log(ret2);
    // await sleep(1500);
    // console.log(ret3);
    // await sleep(1500);
    // console.log(ret4);

    // bot.sendGroupMsg(166795834, ret0);
    // await sleep(1500);
    bot.sendGroupMsg(groupId, ret1);
    await sleep(2500);
    bot.sendGroupMsg(groupId, ret2);
    await sleep(2500);
    bot.sendGroupMsg(groupId, ret3);
    await sleep(2500);
    bot.sendGroupMsg(groupId, ret4);
  } catch (e) {
    throw e;
  }
};
