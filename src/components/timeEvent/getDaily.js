const axios = require('axios');
const ErrorUtil = require('@utils/Error');

module.exports = function getDaily(param) {
  const { bot, data, now } = param;
  console.log(now);
  const groupId = data?.group_id || 166795834;
  const queryStr = `query questionOfToday {
    todayRecord {
      question {
        questionId,
        title,
        difficulty,
        isPaidOnly,
        stats,
        status,
        content,
        translatedTitle,
        questionTitle,
        questionTitleSlug,
        topicTags {
          name
        },
        codeSnippets {
          lang,
          langSlug,
          code
        },
        sampleTestCase
      }
    }
  }`;
  axios.get('https://leetcode-cn.com/graphql',
    {
      params: {
        operationName: 'questionOfToday',
        query: queryStr,
      },
    })
    .then((response) => {
      const res = response.data;
      const { question } = res.data.todayRecord[0];
      let ret = '每日一题\n';
      ret += `ID: ${question.questionId}\n`;
      ret += `TITLE: ${question.translatedTitle}\n`;
      ret += `TYPE: ${question.difficulty}\n`;
      let tags = '';
      question.topicTags.forEach((item) => {
        tags += `${item.name}, `;
      });
      ret += `TAGS: ${tags}\n`;
      ret += `URL: https://leetcode-cn.com/problems/${question.questionTitleSlug}/`;
      // console.log(ret);
      bot.sendGroupMsg(groupId, ret);
    })
    .catch((e) => {
      throw e;
    });
};
