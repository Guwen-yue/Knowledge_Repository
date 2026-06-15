// ========== Game 主类 ==========

import { GAME_WIDTH, GAME_HEIGHT } from './config.js';
import { InputManager } from './input.js';
import { AudioManager } from './audio.js';
import { MenuScene } from './scenes/menu-scene.js';
import { PlayScene } from './scenes/play-scene.js';
import { GameOverScene } from './scenes/gameover-scene.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.input = new InputManager(canvas);
    this.audio = new AudioManager();

    // 场景
    this.playScene = new PlayScene(this);
    this.scenes = {
      menu: new MenuScene(this),
      playing: this.playScene,
      gameover: new GameOverScene(this),
    };
    this.currentState = 'menu';
    this.scenes.menu.enter();

    // 帧率控制
    this.lastTime = 0;
    this.running = false;

    // 解锁音频
    canvas.addEventListener('touchstart', () => this.audio.unlock(), { once: true });
    canvas.addEventListener('mousedown', () => this.audio.unlock(), { once: true });
  }

  /** 切换场景 */
  switchState(newState) {
    this.scenes[this.currentState].exit();
    this.currentState = newState;
    this.scenes[this.currentState].enter();
  }

  /** 启动游戏循环 */
  start() {
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this._loop(t));
  }

  /** 停止游戏循环 */
  stop() {
    this.running = false;
  }

  /** 主循环 */
  _loop(timestamp) {
    if (!this.running) return;

    // deltaTime，限制最大值避免切后台回来爆炸
    let dt = timestamp - this.lastTime;
    this.lastTime = timestamp;
    dt = Math.min(dt, 50); // 最大 50ms，约 20fps 下限

    try {
      // Update
      this.scenes[this.currentState].update(dt);

      // Render
      this.ctx.save();
      this.scenes[this.currentState].render(this.ctx, timestamp);
      this.ctx.restore();
    } catch (err) {
      console.error('Game loop error:', err);
    }

    requestAnimationFrame((t) => this._loop(t));
  }
}
