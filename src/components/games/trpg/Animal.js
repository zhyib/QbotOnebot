const Creature = require('./Creature');

module.exports = class Animal extends Creature {
  constructor() {
    super(50, 200, 'Animal');
  }
};
