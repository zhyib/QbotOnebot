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
  const parser = new DOMParser({
    /**
     * locator is always need for error position info
     */
    locator: {},
    /**
     * you can override the errorHandler for xml parser
     * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    errorHandler: {
      warning() {
      },
      error() {
      },
      fatalError(e) {
        console.error(e);
      },
    },
    // only callback model
    // errorHandler:function(level,msg){console.log(level,msg)}
  });
  const dom = parser.parseFromString(res, 'text/html');
  return dom;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function sleep(t) {
  await new Promise((resolve) => {
    setTimeout(resolve, t);
  }).then(() => {});
}

module.exports = { rand, sleep, getFromUrl };
