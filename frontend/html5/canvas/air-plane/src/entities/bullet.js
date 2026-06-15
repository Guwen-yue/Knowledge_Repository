// ========== 子弹实体 ==========

import { GAME_WIDTH, GAME_HEIGHT } from '../config.js';

export class Bullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.width = 4;
    this.height = 12;
    this.damage = 1;
    this.active = false;
    this.isPlayer = true; // true=玩家子弹, false=敌方子弹
    this.color = '#ff0';
  }

  init(x, y, vx, vy, speed, isPlayer = true) {
    this.x = x - this.width / 2;
    this.y = y;
    this.vx = vx || 0;
    this.vy = vy || -8;
    this.speed = speed || 8;
    this.isPlayer = isPlayer;
    this.damage = 1;
    this.active = true;
    this.color = isPlayer ? '#ff0' : '#f55';
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    // 出屏回收
    if (this.y < -20 || this.y > GAME_HEIGHT + 20 ||
        this.x < -20 || this.x > GAME_WIDTH + 20) {
      this.active = false;
    }
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    if (this.isPlayer) {
      // 玩家子弹：细长
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } else {
      // 敌方子弹：圆形
      ctx.beginPath();
      ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /** 获取碰撞框 */
  get bounds() {
    return { x: this.x, y: this.y, width: this.width, height: this.height };
  }
}

/** 子弹 reset 函数 */
export function resetBullet(b) {
  b.active = false;
  b.x = 0;
  b.y = 0;
}
