// ========== 游戏结束场景 ==========

import { GAME_WIDTH, GAME_HEIGHT } from '../config.js';

export class GameOverScene {
  constructor(game) {
    this.game = game;
    this.finalScore = 0;
    this.highScore = 0;
    this.alpha = 0;
  }

  enter() {
    this.finalScore = this.game.playScene?.hud.score || 0;
    this.highScore = this.game.playScene?.hud.highScore || 0;
    this.alpha = 0;
    this.game.input.onTap((type, pos) => this.handleTouch(type, pos));
  }

  exit() {
    this.game.input.onTap(null);
  }

  handleTouch(type, pos) {
    if (type === 'start' && this.alpha > 0.8) {
      this.game.switchState('playing');
    }
  }

  update(dt) {
    this.alpha = Math.min(1, this.alpha + dt * 0.003);
  }

  render(ctx, time) {
    // 半透明遮罩
    ctx.fillStyle = `rgba(0, 0, 0, ${this.alpha * 0.7})`;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.save();
    ctx.globalAlpha = this.alpha;

    // GAME OVER
    ctx.fillStyle = '#f44';
    ctx.font = 'bold 32px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GAME OVER', GAME_WIDTH / 2, GAME_HEIGHT * 0.3);

    // 分数
    ctx.fillStyle = '#fff';
    ctx.font = '20px monospace';
    ctx.fillText(`SCORE: ${this.finalScore}`, GAME_WIDTH / 2, GAME_HEIGHT * 0.45);

    // 最高分
    ctx.fillStyle = '#ff0';
    ctx.font = '16px monospace';
    ctx.fillText(`BEST: ${this.highScore}`, GAME_WIDTH / 2, GAME_HEIGHT * 0.52);

    // 新纪录提示
    if (this.finalScore >= this.highScore && this.finalScore > 0) {
      const pulse = Math.sin(time * 0.005) * 0.3 + 0.7;
      ctx.globalAlpha = pulse * this.alpha;
      ctx.fillStyle = '#ff0';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('🏆 NEW RECORD! 🏆', GAME_WIDTH / 2, GAME_HEIGHT * 0.6);
      ctx.globalAlpha = this.alpha;
    }

    // 重新开始（闪烁）
    const blink = Math.sin(time * 0.004) * 0.3 + 0.7;
    ctx.globalAlpha = blink * this.alpha;
    ctx.fillStyle = '#fff';
    ctx.font = '16px monospace';
    ctx.fillText('点击屏幕重新开始', GAME_WIDTH / 2, GAME_HEIGHT * 0.72);

    ctx.restore();
  }
}
