// ========== 游戏常量配置 ==========

// 逻辑画布尺寸（竖屏）
export const GAME_WIDTH = 375;
export const GAME_HEIGHT = 667;

// 玩家配置
export const PLAYER = {
  width: 30,
  height: 30,
  speed: 6,
  maxHp: 5,
  initBombs: 2,
  maxBombs: 5,
  invincibleDuration: 2000, // 受击无敌时间 ms
};

// 子弹配置
export const BULLET = {
  playerSpeed: 8,
  enemySpeed: 4,
  playerDamage: 1,
};

// 武器等级配置
export const WEAPON_LEVELS = {
  1: { fireRate: 150, pattern: [{ dx: 0, dy: -10, speed: 8 }] },
  2: { fireRate: 130, pattern: [{ dx: -6, dy: -10, speed: 8 }, { dx: 6, dy: -10, speed: 8 }] },
  3: { fireRate: 110, pattern: [{ dx: 0, dy: -12, speed: 10 }, { dx: -10, dy: -8, speed: 8 }, { dx: 10, dy: -8, speed: 8 }] },
  4: { fireRate: 90, pattern: [{ dx: 0, dy: -12, speed: 12 }, { dx: -8, dy: -10, speed: 10 }, { dx: 8, dy: -10, speed: 10 }, { dx: -16, dy: -6, speed: 8 }, { dx: 16, dy: -6, speed: 8 }] },
};

// 敌机类型配置
export const ENEMY_TYPES = {
  grunt: { width: 28, height: 28, hp: 1, speed: 2, score: 100, color: '#888' },
  fast:  { width: 24, height: 24, hp: 1, speed: 4, score: 150, color: '#f80' },
  tank:  { width: 36, height: 36, hp: 5, speed: 1.2, score: 300, color: '#844' },
};

// BOSS 配置
export const BOSS_CONFIG = {
  width: 80,
  height: 80,
  hp: 80,
  speed: 1,
  score: 5000,
  color: '#f00',
};

// 道具类型
export const POWERUP_TYPES = {
  WEAPON: { color: '#ff0', icon: 'W', effect: 'weaponUp', dropRate: 0.3 },
  SHIELD: { color: '#0ff', icon: 'S', effect: 'shield', dropRate: 0.15 },
  BOMB:   { color: '#f55', icon: 'B', effect: 'addBomb', dropRate: 0.15 },
  LIFE:   { color: '#0f0', icon: '♥', effect: 'addLife', dropRate: 0.1 },
};

// 粒子配置
export const PARTICLE = {
  maxCount: 500,
  explosionCount: 20,
};
