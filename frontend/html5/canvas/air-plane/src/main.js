// ========== 入口文件 ==========

import './style.css';
import { GAME_WIDTH, GAME_HEIGHT } from './config.js';
import { Game } from './game.js';

// ========== Canvas 初始化 ==========
const canvas = document.getElementById('gameCanvas');
const dpr = window.devicePixelRatio || 1;

// 设置固定的游戏逻辑分辨率
canvas.width = GAME_WIDTH * dpr;
canvas.height = GAME_HEIGHT * dpr;

// 缩放上下文，让绘制坐标始终使用逻辑尺寸
const ctx = canvas.getContext('2d');
ctx.scale(dpr, dpr);

// 监听窗口大小变化，确保 Canvas 始终正确显示
function handleResize() {
  // Canvas 的 CSS 尺寸由 CSS 控制，这里不需要额外处理
  // 但需要确保坐标转换正确
}
window.addEventListener('resize', handleResize);

// ========== 阻止触摸默认手势（仅在 Canvas 上） ==========
canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
canvas.addEventListener('touchstart', (e) => {
  // 不阻止默认行为，让点击事件也能触发
}, { passive: true });
canvas.addEventListener('gesturestart', (e) => e.preventDefault());

// 禁用双击缩放
let lastTouchEnd = 0;
canvas.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd < 300) e.preventDefault();
  lastTouchEnd = now;
}, { passive: false });

// ========== 尝试锁定竖屏 ==========
if (screen.orientation?.lock) {
  screen.orientation.lock('portrait').catch(() => {});
}

// ========== 尝试全屏 ==========
function requestFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
}

// 首次交互时进入全屏
canvas.addEventListener('touchstart', () => requestFullscreen(), { once: true });
canvas.addEventListener('click', () => requestFullscreen(), { once: true });

// ========== 启动游戏 ==========
const game = new Game(canvas);
game.start();

console.log('✈️ Air Plane Game Started!');
console.log(`Canvas: ${GAME_WIDTH}x${GAME_HEIGHT} @${dpr}x`);
