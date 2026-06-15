// ========== 主菜单场景 ==========

import { GAME_WIDTH, GAME_HEIGHT } from '../config.js';

export class MenuScene {
  constructor(game) {
    this.game = game;
    this.titleAlpha = 0;
    this.titleY = GAME_HEIGHT * 0.3;
    this.stars = [];
    this._initStars();
  }

  _initStars() {
    for (let i = 0; i < 80; i++) {
      this.stars.push({
        x: Math.random() * GAME_WIDTH,
        y: Math.random() * GAME_HEIGHT,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 1.5 + 0.5,
      });
    }
  }

  enter() {
    this.titleAlpha = 0;
    this.game.input.onTap((type, pos) => this.handleTouch(type, pos));
  }

  exit() {
    this.game.input.onTap(null);
  }

  handleTouch(type, pos) {
    if (type === 'start') {
      this.game.switchState('playing');
    }
  }

  update(dt) {
    this.titleAlpha = Math.min(1, this.titleAlpha + dt * 0.002);

    // 星空滚动
    for (const s of this.stars) {
      s.y += s.speed;
      if (s.y > GAME_HEIGHT) {
        s.y = 0;
        s.x = Math.random() * GAME_WIDTH;
      }
    }
  }

  render(ctx, time) {
    // 背景
    ctx.fillStyle = '#0a0a2e';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 星空
    ctx.fillStyle = '#fff';
    for (const s of this.stars) {
      ctx.globalAlpha = 0.3 + s.size * 0.2;
      ctx.fillRect(s.x, s.y, s.size, s.size);
    }
    ctx.globalAlpha = 1;

    ctx.save();
    ctx.globalAlpha = this.titleAlpha;

    // 标题
    ctx.fillStyle = '#0af';
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AIR PLANE', GAME_WIDTH / 2, this.titleY);

    // 副标题
    ctx.fillStyle = '#888';
    ctx.font = '14px monospace';
    ctx.fillText('雷电战机', GAME_WIDTH / 2, this.titleY + 40);

    // 开始按钮（闪烁）
    const blink = Math.sin(time * 0.004) * 0.3 + 0.7;
    ctx.globalAlpha = blink * this.titleAlpha;
    ctx.fillStyle = '#fff';
    ctx.font = '18px monospace';
    ctx.fillText('点击屏幕开始游戏', GAME_WIDTH / 2, GAME_HEIGHT * 0.6);

    // 操作说明
    ctx.globalAlpha = 0.5 * this.titleAlpha;
    ctx.fillStyle = '#aaa';
    ctx.font = '12px monospace';
    ctx.fillText('触摸拖动控制战机', GAME_WIDTH / 2, GAME_HEIGHT * 0.7);
    ctx.fillText('自动开火 · 点击使用炸弹', GAME_WIDTH / 2, GAME_HEIGHT * 0.7 + 20);

    ctx.restore();
  }
}
