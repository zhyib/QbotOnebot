const axios = require('axios');

// 发请求

module.exports = async function getDaily(bot, dataIn, now) {
  console.log(now);
  const groupId = dataIn === undefined ? 166795834 : dataIn.group_id;
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
    .catch((error) => {
      console.log(error);
    });
};
