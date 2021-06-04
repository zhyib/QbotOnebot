const Creature = require('./Creature');

module.exports = class Monster extends Creature {
  constructor() {
    super(500, 1000, 'Monster');
  }
};
