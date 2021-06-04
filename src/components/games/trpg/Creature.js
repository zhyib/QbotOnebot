const { rand } = require('@utils/functions');

module.exports = class Creature {
  constructor(min, max, type) {
    this.hp = rand(min, max);
    this.atk = rand(min, max);
    this.def = rand(min, max);
    this.type = type;
  }

  checkHp() {
    return this.hp > 0;
  }

  sum() {
    return this.hp + this.atk + this.def;
  }

  print() {
    return `
    NAME: ${this.type}
    HP: ${this.hp}
    ATK: ${this.atk}
    DEF: ${this.def}
    `;
  }
};
