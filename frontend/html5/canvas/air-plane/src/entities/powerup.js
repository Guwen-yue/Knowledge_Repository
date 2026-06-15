// ========== 道具实体 ==========

import { GAME_HEIGHT, POWERUP_TYPES } from '../config.js';

export class PowerUp {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 24;
    this.height = 24;
    this.speed = 2;
    this.active = false;
    this.type = null;
    this.typeKey = '';
    this.bobTimer = 0;
  }

  init(x, y, typeKey) {
    this.x = x;
    this.y = y;
    this.typeKey = typeKey;
    this.type = POWERUP_TYPES[typeKey];
    this.active = true;
    this.speed = 1.5;
    this.bobTimer = 0;
  }

  update(dt) {
    this.y += this.speed;
    this.bobTimer += dt;
    if (this.y > GAME_HEIGHT + 30) this.active = false;
  }

  /** 应用道具效果 */
  applyEffect(player) {
    switch (this.type.effect) {
      case 'weaponUp': player.upgradeWeapon(); break;
      case 'shield':   player.addShield(); break;
      case 'addBomb':  player.addBomb(); break;
      case 'addLife':  player.addLife(); break;
    }
  }

  render(ctx, time) {
    if (!this.active) return;

    const bob = Math.sin(this.bobTimer * 0.005) * 3;

    ctx.save();

    // 道具背景光圈
    ctx.fillStyle = this.type.color + '33';
    ctx.beginPath();
    ctx.arc(this.x, this.y + bob, this.width, 0, Math.PI * 2);
    ctx.fill();

    // 道具主体
    ctx.fillStyle = this.type.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y + bob, this.width * 0.7, 0, Math.PI * 2);
    ctx.fill();

    // 图标文字
    ctx.fillStyle = '#000';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.type.icon, this.x, this.y + bob);

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

export function resetPowerUp(p) {
  p.active = false;
}
