// ========== 工具函数 ==========

/** 随机整数 [min, max] */
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 随机浮点 [min, max) */
export function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/** 两点距离 */
export function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/** AABB 碰撞检测 */
export function rectOverlap(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

/** 圆形碰撞检测 */
export function circleOverlap(x1, y1, r1, x2, y2, r2) {
  const d = distance(x1, y1, x2, y2);
  return d < r1 + r2;
}

/** 限制范围 */
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

/** 线性插值 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/** 角度转弧度 */
export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

/** HSL 颜色生成 */
export function hslColor(h, s, l) {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

/** 随机颜色（暖色系，用于爆炸） */
export function randomExplosionColor() {
  const h = randInt(0, 60); // 红-黄范围
  return hslColor(h, 100, randInt(50, 70));
}
