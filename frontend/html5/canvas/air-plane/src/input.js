// ========== 触摸输入管理 ==========

import { GAME_WIDTH, GAME_HEIGHT } from './config.js';

export class InputManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = GAME_WIDTH / 2;
    this.y = GAME_HEIGHT * 0.8;
    this.touching = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.tapCallback = null;

    this._bindEvents();
  }

  /** 注册点击回调（用于菜单按钮等） */
  onTap(callback) {
    this.tapCallback = callback;
  }

  /** 获取触摸/鼠标坐标（转换为逻辑坐标） */
  _getPos(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (GAME_WIDTH / rect.width),
      y: (clientY - rect.top) * (GAME_HEIGHT / rect.height),
    };
  }

  _bindEvents() {
    const opts = { passive: false };

    // 触摸事件
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.touching = true;
      const touch = e.touches[0];
      const pos = this._getPos(touch.clientX, touch.clientY);
      this.offsetX = pos.x - this.x;
      this.offsetY = pos.y - this.y;
      if (this.tapCallback) this.tapCallback('start', pos);
    }, opts);

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.touching) return;
      const touch = e.touches[0];
      const pos = this._getPos(touch.clientX, touch.clientY);
      this.x = pos.x - this.offsetX;
      this.y = pos.y - this.offsetY;
    }, opts);

    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.touching = false;
      if (this.tapCallback) this.tapCallback('end', { x: this.x, y: this.y });
    }, opts);

    // 鼠标事件（桌面端）
    this.canvas.addEventListener('mousedown', (e) => {
      console.log('mousedown triggered');
      this.touching = true;
      const pos = this._getPos(e.clientX, e.clientY);
      this.offsetX = pos.x - this.x;
      this.offsetY = pos.y - this.y;
      if (this.tapCallback) this.tapCallback('start', pos);
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.touching) return;
      const pos = this._getPos(e.clientX, e.clientY);
      this.x = pos.x - this.offsetX;
      this.y = pos.y - this.offsetY;
    });

    this.canvas.addEventListener('mouseup', () => {
      this.touching = false;
    });

    // 点击事件（用于菜单等）
    this.canvas.addEventListener('click', (e) => {
      console.log('click triggered');
      const pos = this._getPos(e.clientX, e.clientY);
      if (this.tapCallback) this.tapCallback('start', pos);
    });

    console.log('Input events bound successfully');
  }
}
