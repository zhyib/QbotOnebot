const { sleep } = require('@utils/functions');

module.exports = async function replyRoll({ bot, data }) {
  const texts = [
    'I am the bone of my sword.',
    '体は剣で出来ている',
    'Steel is my body, and fire is my blood.',
    '血潮は鉄で心は硝子',
    'I have created over a thousand blades.',
    '几たびの戦场を越えて不败',
    'Unknown to Death.',
    'ただの一度も败走はなく',
    'Nor known to Life.',
    'ただの一度も理解されない',
    'Have withstood pain to create many weapons.',
    '彼の者は常に独り 剣の丘で胜利に酔う',
    'Yet, those hands will never hold anything',
    '故に、生涯に意味はなく',
    'So as I pray, Unlimited Blade Works!',
    'その体は、きっと剣で出来てい',
  ];
  const groupId = data.group_id;
  for (let i = 0; i < texts.length; i++) {
    bot.sendGroupMsg(groupId, texts[i]);
    await sleep(2500);
  }
};
