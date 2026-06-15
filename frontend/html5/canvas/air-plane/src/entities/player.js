// ========== 玩家战机 ==========

import { GAME_WIDTH, GAME_HEIGHT, PLAYER, WEAPON_LEVELS } from '../config.js';
import { clamp } from '../utils/math.js';

export class Player {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = GAME_WIDTH / 2;
    this.y = GAME_HEIGHT * 0.8;
    this.width = PLAYER.width;
    this.height = PLAYER.height;
    this.hp = PLAYER.maxHp;
    this.maxHp = PLAYER.maxHp;
    this.bombs = PLAYER.initBombs;
    this.weaponLevel = 1;
    this.shieldTimer = 0;
    this.invincibleTimer = 0;
    this.active = true;
    this.lastFireTime = 0;
    // 屏幕震动
    this.shakeTimer = 0;
    this.shakeIntensity = 0;
  }

  /** 获取当前武器配置 */
  get weapon() {
    return WEAPON_LEVELS[Math.min(this.weaponLevel, 4)];
  }

  /** 受到伤害 */
  takeDamage(damage = 1) {
    if (this.invincibleTimer > 0 || this.shieldTimer > 0) return false;
    this.hp -= damage;
    this.invincibleTimer = PLAYER.invincibleDuration;
    this.shakeTimer = 200;
    this.shakeIntensity = 5;
    if (this.hp <= 0) {
      this.active = false;
    }
    return true;
  }

  /** 使用炸弹 */
  useBomb() {
    if (this.bombs <= 0) return false;
    this.bombs--;
    return true;
  }

  /** 升级武器 */
  upgradeWeapon() {
    this.weaponLevel = Math.min(this.weaponLevel + 1, 4);
  }

  /** 添加护盾 */
  addShield(duration = 5000) {
    this.shieldTimer = duration;
  }

  /** 添加生命 */
  addLife() {
    this.hp = Math.min(this.hp + 1, this.maxHp);
  }

  /** 添加炸弹 */
  addBomb() {
    this.bombs = Math.min(this.bombs + 1, PLAYER.maxBombs);
  }

  update(dt, inputX, inputY) {
    // 平滑跟随输入
    this.x += (inputX - this.x) * 0.15;
    this.y += (inputY - this.y) * 0.15;

    // 限制在屏幕内
    this.x = clamp(this.x, this.width, GAME_WIDTH - this.width);
    this.y = clamp(this.y, this.height, GAME_HEIGHT - this.height);

    // 更新计时器
    if (this.invincibleTimer > 0) this.invincibleTimer -= dt;
    if (this.shieldTimer > 0) this.shieldTimer -= dt;
    if (this.shakeTimer > 0) this.shakeTimer -= dt;
  }

  render(ctx, time) {
    if (!this.active) return;

    ctx.save();

    // 受击无敌闪烁
    if (this.invincibleTimer > 0 && Math.floor(time / 100) % 2 === 0) {
      ctx.globalAlpha = 0.4;
    }

    // 机身
    ctx.fillStyle = '#0af';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.height);
    ctx.lineTo(this.x - this.width, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.closePath();
    ctx.fill();

    // 座舱
    ctx.fillStyle = '#5cf';
    ctx.beginPath();
    ctx.ellipse(this.x, this.y - 2, 6, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // 引擎火焰
    const flameH = 8 + Math.random() * 8;
    ctx.fillStyle = '#f80';
    ctx.beginPath();
    ctx.moveTo(this.x - 8, this.y + this.height);
    ctx.lineTo(this.x + 8, this.y + this.height);
    ctx.lineTo(this.x, this.y + this.height + flameH);
    ctx.closePath();
    ctx.fill();

    // 内焰
    ctx.fillStyle = '#ff0';
    ctx.beginPath();
    ctx.moveTo(this.x - 4, this.y + this.height);
    ctx.lineTo(this.x + 4, this.y + this.height);
    ctx.lineTo(this.x, this.y + this.height + flameH * 0.6);
    ctx.closePath();
    ctx.fill();

    // 护盾
    if (this.shieldTimer > 0) {
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 + Math.sin(time * 0.01) * 0.2})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.width + 10, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }
}
