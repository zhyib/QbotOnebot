const axios = require('axios');
const { DOMParser } = require('xmldom');

async function getFromUrl(url) {
  let res = '';
  await axios.get(url)
    .then((response) => {
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  const parser = new DOMParser();
  const dom = parser.parseFromString(res, 'text/html');
  return dom;
}

module.exports = {
  getFromUrl,
};
