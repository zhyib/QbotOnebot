const fs = require('fs');
// console.log(JSON.parse(fs.readFileSync('config.json').toString()))

module.exports = (function config() {
  let data = JSON.parse(fs.readFileSync('./src/components/utils/config.json').toString())
  return {
    data,
    commandConfig: data.commandConfig,
    listenerConfig: data.listenerConfig,
    timeConfig: data.timeConfig,
    load() {
      console.log('Config file loaded');
    }
  };
}());
