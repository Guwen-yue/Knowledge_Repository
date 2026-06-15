// ========== BOSS 实体 ==========

import { GAME_WIDTH, GAME_HEIGHT, BOSS_CONFIG } from '../config.js';

export class Boss {
  constructor() {
    this.x = GAME_WIDTH / 2;
    this.y = -80;
    this.width = BOSS_CONFIG.width;
    this.height = BOSS_CONFIG.height;
    this.hp = BOSS_CONFIG.hp;
    this.maxHp = BOSS_CONFIG.hp;
    this.speed = BOSS_CONFIG.speed;
    this.score = BOSS_CONFIG.score;
    this.active = false;
    this.phase = 'enter'; // enter, fight, die
    this.targetY = 80;
    this.fireTimer = 0;
    this.firePattern = 0; // 攻击模式切换
    this.patternTimer = 0;
    this.angle = 0;
  }

  init() {
    this.x = GAME_WIDTH / 2;
    this.y = -this.height;
    this.hp = BOSS_CONFIG.hp;
    this.maxHp = BOSS_CONFIG.hp;
    this.active = true;
    this.phase = 'enter';
    this.fireTimer = 0;
    this.firePattern = 0;
    this.patternTimer = 0;
    this.angle = 0;
  }

  update(dt) {
    if (!this.active) return;

    switch (this.phase) {
      case 'enter':
        // 入场
        this.y += 1.5;
        if (this.y >= this.targetY) {
          this.y = this.targetY;
          this.phase = 'fight';
        }
        break;

      case 'fight':
        // 左右移动
        this.angle += dt * 0.001;
        this.x = GAME_WIDTH / 2 + Math.sin(this.angle) * (GAME_WIDTH * 0.3);

        this.fireTimer += dt;
        this.patternTimer += dt;

        // 每 5 秒切换攻击模式
        if (this.patternTimer > 5000) {
          this.patternTimer = 0;
          this.firePattern = (this.firePattern + 1) % 3;
        }

        if (this.hp <= 0) {
          this.phase = 'die';
        }
        break;

      case 'die':
        // 死亡动画（由外部处理爆炸粒子）
        this.active = false;
        break;
    }
  }

  /** 获取当前应该发射的子弹配置 */
  getFireBullets() {
    if (this.phase !== 'fight') return [];
    const bullets = [];

    switch (this.firePattern) {
      case 0: // 扇形弹
        if (this.fireTimer > 400) {
          this.fireTimer = 0;
          for (let i = -2; i <= 2; i++) {
            const angle = (Math.PI / 2) + i * 0.3;
            bullets.push({
              x: this.x,
              y: this.y + this.height,
              vx: Math.cos(angle) * 3,
              vy: Math.sin(angle) * 3,
            });
          }
        }
        break;

      case 1: // 直线弹幕
        if (this.fireTimer > 200) {
          this.fireTimer = 0;
          bullets.push({
            x: this.x - 30,
            y: this.y + this.height,
            vx: 0,
            vy: 4,
          });
          bullets.push({
            x: this.x + 30,
            y: this.y + this.height,
            vx: 0,
            vy: 4,
          });
        }
        break;

      case 2: // 追踪弹
        if (this.fireTimer > 800) {
          this.fireTimer = 0;
          bullets.push({
            x: this.x,
            y: this.y + this.height,
            vx: 0,
            vy: 3,
          });
        }
        break;
    }

    return bullets;
  }

  render(ctx, time) {
    if (!this.active) return;

    ctx.save();

    // BOSS 机身
    ctx.fillStyle = '#c22';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height);
    ctx.lineTo(this.x - this.width, this.y - this.height * 0.3);
    ctx.lineTo(this.x - this.width * 0.6, this.y - this.height);
    ctx.lineTo(this.x + this.width * 0.6, this.y - this.height);
    ctx.lineTo(this.x + this.width, this.y - this.height * 0.3);
    ctx.closePath();
    ctx.fill();

    // 装甲纹路
    ctx.strokeStyle = '#f44';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x - this.width * 0.4, this.y - this.height * 0.5);
    ctx.lineTo(this.x + this.width * 0.4, this.y - this.height * 0.5);
    ctx.stroke();

    // 核心
    const pulse = 0.8 + Math.sin(time * 0.005) * 0.2;
    ctx.fillStyle = `rgba(255, 100, 0, ${pulse})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 12, 0, Math.PI * 2);
    ctx.fill();

    // 血条
    const barW = this.width * 2;
    const barH = 6;
    const barX = this.x - this.width;
    const barY = this.y - this.height - 15;
    ctx.fillStyle = '#333';
    ctx.fillRect(barX, barY, barW, barH);
    const hpRatio = this.hp / this.maxHp;
    ctx.fillStyle = hpRatio > 0.5 ? '#0f0' : hpRatio > 0.2 ? '#ff0' : '#f00';
    ctx.fillRect(barX, barY, barW * hpRatio, barH);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, barH);

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
