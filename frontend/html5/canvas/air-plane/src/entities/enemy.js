// ========== 敌机实体 ==========

import { GAME_WIDTH, GAME_HEIGHT, ENEMY_TYPES } from '../config.js';
import { randFloat } from '../utils/math.js';

export class Enemy {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.hp = 1;
    this.maxHp = 1;
    this.speed = 2;
    this.score = 100;
    this.color = '#888';
    this.active = false;
    this.type = 'grunt';
    this.fireTimer = 0;
    this.fireRate = 2000; // 敌机射击间隔 ms
    this.movePattern = 'straight'; // straight, zigzag, sine
    this.moveTimer = 0;
    this.startX = 0;
  }

  init(x, y, type = 'grunt', movePattern = 'straight') {
    const cfg = ENEMY_TYPES[type] || ENEMY_TYPES.grunt;
    this.x = x;
    this.y = y;
    this.startX = x;
    this.width = cfg.width;
    this.height = cfg.height;
    this.hp = cfg.hp;
    this.maxHp = cfg.hp;
    this.speed = cfg.speed;
    this.score = cfg.score;
    this.color = cfg.color;
    this.type = type;
    this.active = true;
    this.fireTimer = Math.random() * this.fireRate;
    this.movePattern = movePattern;
    this.moveTimer = 0;
  }

  update(dt) {
    this.moveTimer += dt;

    switch (this.movePattern) {
      case 'straight':
        this.y += this.speed;
        break;
      case 'zigzag':
        this.y += this.speed;
        this.x = this.startX + Math.sin(this.moveTimer * 0.003) * 60;
        break;
      case 'sine':
        this.y += this.speed * 0.8;
        this.x = this.startX + Math.sin(this.moveTimer * 0.002) * 100;
        break;
      default:
        this.y += this.speed;
    }

    this.fireTimer += dt;

    // 出屏回收
    if (this.y > GAME_HEIGHT + 50 || this.hp <= 0) {
      this.active = false;
    }
  }

  /** 是否应该开火 */
  shouldFire() {
    if (this.fireTimer >= this.fireRate) {
      this.fireTimer = 0;
      return true;
    }
    return false;
  }

  render(ctx) {
    if (!this.active) return;

    ctx.save();

    // 机身
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height);
    ctx.lineTo(this.x - this.width, this.y - this.height);
    ctx.lineTo(this.x + this.width, this.y - this.height);
    ctx.closePath();
    ctx.fill();

    // 血条（只有多血量敌机才显示）
    if (this.maxHp > 1) {
      const barW = this.width * 2;
      const barH = 3;
      const barX = this.x - this.width;
      const barY = this.y - this.height - 8;
      ctx.fillStyle = '#333';
      ctx.fillRect(barX, barY, barW, barH);
      ctx.fillStyle = this.hp > this.maxHp * 0.3 ? '#0f0' : '#f00';
      ctx.fillRect(barX, barY, barW * (this.hp / this.maxHp), barH);
    }

    ctx.restore();
  }

  get bounds() {
    return {
      x: this.x - this.width,
      y: this.y - this.height,
      width: this.width * 2,
      height: this.height * 2,
    };
  }
}

export function resetEnemy(e) {
  e.active = false;
}
