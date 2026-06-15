// ========== HUD（抬头显示） ==========

import { GAME_WIDTH } from './config.js';

export class HUD {
  constructor() {
    this.score = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.comboTimeout = 2000; // 连击超时 ms
    this.highScore = parseInt(localStorage.getItem('airplane_highscore') || '0');
  }

  reset() {
    this.score = 0;
    this.combo = 0;
    this.comboTimer = 0;
  }

  addScore(baseValue) {
    const multiplier = 1 + Math.floor(this.combo / 5) * 0.5;
    const gained = Math.floor(baseValue * multiplier);
    this.score += gained;
    this.combo++;
    this.comboTimer = this.comboTimeout;

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('airplane_highscore', String(this.highScore));
    }

    return gained;
  }

  update(dt) {
    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        this.combo = 0;
      }
    }
  }

  render(ctx, player, time) {
    ctx.save();

    // 分数
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`SCORE ${this.score}`, 10, 15);

    // 最高分
    ctx.font = '12px monospace';
    ctx.fillStyle = '#888';
    ctx.fillText(`HI ${this.highScore}`, 10, 38);

    // 连击
    if (this.combo > 1) {
      const pulse = 1 + Math.sin(time * 0.01) * 0.1;
      ctx.save();
      ctx.translate(10, 58);
      ctx.scale(pulse, pulse);
      ctx.fillStyle = '#ff0';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(`${this.combo} COMBO`, 0, 0);
      ctx.restore();
    }

    // 血条
    const barX = 10;
    const barY = 80;
    const barW = 100;
    const barH = 8;

    ctx.fillStyle = '#333';
    ctx.fillRect(barX, barY, barW, barH);

    const hpRatio = player.hp / player.maxHp;
    ctx.fillStyle = hpRatio > 0.6 ? '#0f0' : hpRatio > 0.3 ? '#ff0' : '#f00';
    ctx.fillRect(barX, barY, barW * hpRatio, barH);

    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, barH);

    // HP 数字
    ctx.fillStyle = '#fff';
    ctx.font = '10px monospace';
    ctx.fillText(`HP ${player.hp}/${player.maxHp}`, barX + barW + 5, barY + 7);

    // 炸弹
    ctx.font = '14px monospace';
    ctx.fillStyle = '#f55';
    const bombText = '💣'.repeat(player.bombs);
    ctx.fillText(bombText, 10, 98);

    // 武器等级
    ctx.fillStyle = '#ff0';
    ctx.font = '12px monospace';
    ctx.fillText(`WPN Lv.${player.weaponLevel}`, 10, 118);

    // 护盾状态
    if (player.shieldTimer > 0) {
      ctx.fillStyle = '#0ff';
      ctx.fillText(`SHIELD ${(player.shieldTimer / 1000).toFixed(1)}s`, 10, 135);
    }

    ctx.restore();
  }
}
