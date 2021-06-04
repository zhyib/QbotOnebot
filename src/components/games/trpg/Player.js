const {
  rand,
  sleep,
} = require('@utils/functions');
const Creature = require('./Creature');
const Animal = require('./Animal');
const Monster = require('./Monster');

module.exports = class Player extends Creature {
  constructor() {
    super(100, 100, 'Player');
    this.count = 100;
    this.age = 0;
  }

  grow(multi) {
    this.hp = Math.floor(this.hp * multi);
    this.atk = Math.floor(this.atk * multi);
    this.def = Math.floor(this.def * multi);
  }

  /**
   * 注册bot参数
   * @param bot
   * @param id
   */
  reg(bot, id) {
    this.bot = bot;
    this.id = id;
  }

  /**
   * 直接发送消息
   * @param msg
   */
  async send(msg) {
    await sleep(3000);
    this.bot.sendGroupMsg(this.id, msg);
  }

  explore(bot, id) {
    this.reg(bot, id);

    let res = rand(0, 1);
    if (res) {
      this.hp++;
      this.atk++;
      this.def++;
      this.send(`探索成功\n${this.print()}`);
      return true;
    }

    res = rand(0, 9);
    let enemy;
    if (res < 8) {
      enemy = new Animal();
      this.send(`遭遇小怪！\n${enemy.print()}`);
    } else {
      enemy = new Monster();
      this.send(`遭遇头目！\n${enemy.print()}`);
    }
    return this.battle(enemy, bot, id);
  }

  async battle(enemy) {
    while (this.checkHp() && enemy.checkHp()) {
      this.count++;

      enemy.hp -= Math.max(this.atk - enemy.def, 0);
      await this.send(`敌人受到攻击\n${enemy.print()}`);
      if (!enemy.checkHp()) {
        await this.send('敌人倒下了！');
        // enemy killed
        if (enemy.sum() > this.sum()) {
          this.grow(1.1);
        }
        if (enemy.type === 'Monster') {
          this.grow(1.81);
        }
        if (enemy.sum() > 2500) {
          // TODO style 7
        }
        await this.send(`玩家能力获得提升！\n${this.print()}`);
        return true;
      }

      sleep(3000);
      this.hp -= Math.max(enemy.atk - this.def, 0);
      await this.send(`玩家受到攻击\n${this.print()}`);
      if (!this.checkHp()) {
        const ran = rand(0, 999);
        if (ran === 666) {
          this.hp += 1000;
          await this.send(`死者苏生！\n${this.print()}`);
        } else {
          // player killed
          await this.send('玩家倒下了！');
          return false;
        }
      }
    }
    return false;
  }

  rest(bot, id) {
    this.reg(bot, id);

    if (this.hp < 1000) {
      this.hp += 50;
      this.send(`得到了恢复！\n${this.print()}`);
    } else {
      this.atk--;
      this.def--;
      this.send(`摸鱼？玩家能力下降\n${this.print()}`);
    }
    return true;
  }

  train(bot, id) {
    this.reg(bot, id);

    let ran = rand(0, 2);
    switch (ran) {
      case 0:
        this.hp += 10;
        this.send(`生命值上升\n${this.print()}`);
        break;
      case 1:
        this.atk += 10;
        this.send(`攻击上升\n${this.print()}`);
        break;
      case 2:
        this.def += 10;
        this.send(`防御上升\n${this.print()}`);
        break;
      default:
        break;
    }

    ran = rand(0, 9999);
    if (ran === 9999) {
      // TODO style 7
    }

    this.count += 30;
    return this.checkCount();
  }

  checkCount() {
    if (this.age === 5) {
      if (this.count > 1000) {
        this.send('你老死了');
        return false;
      }
    } else {
      this.age++;
      if (this.age === 5) {
        this.hp = Math.floor(this.hp / 2);
      }
      this.send('你变老了');
      return true;
    }
  }
};
