const getFromUrl = require('@utils/parseHtml');

module.exports = async function replyEroPic(bot, data) {
  bot.sendGroupMsg(data.group_id, '正在获取URL...');

  // get dom from origin page
  const dom = await getFromUrl('https://www.haorenka.co/xiaojiejie');

  // select one and get inner url
  const rand = Math.floor(Math.random() * dom.getElementsByClassName('post-info').length);
  const innerUrl = dom.getElementsByClassName('post-info')[rand].getElementsByTagName('h2')[0].getElementsByTagName('a')[0].getAttribute('href');
  // console.log(innerUrl);

  // get dom from inner page
  const innerDom = await getFromUrl(innerUrl);
  const noscript = innerDom.getElementsByTagName('noscript');

  bot.sendGroupMsg(data.group_id, '正在解析网页内容...');

  // get data
  const title = innerDom.getElementsByTagName('title')[0].childNodes[0].nodeValue;
  const picUrls = [];
  for (let i = 0; i < noscript.length; i++) {
    picUrls.push(noscript[i].getElementsByTagName('img')[0].getAttribute('src'));
  }
  // console.log(title);
  // console.log(noscript.length);
  // console.log(picUrls);
  let ret = `${title}\n${innerUrl}\n`;
  picUrls.forEach((item) => {
    ret += (
      `[CQ:image,file=${item}]\n`
    );
  });
  bot.sendGroupMsg(data.group_id, ret);
};
