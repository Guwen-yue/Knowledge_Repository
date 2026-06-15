// ========== 粒子系统 ==========

import { PARTICLE } from '../config.js';
import { randomExplosionColor, randFloat } from '../utils/math.js';

class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.life = 0;
    this.decay = 0;
    this.size = 0;
    this.color = '';
    this.active = false;
  }

  init(x, y, color) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = randFloat(1, 6);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1.0;
    this.decay = randFloat(0.02, 0.05);
    this.size = randFloat(2, 5);
    this.color = color || randomExplosionColor();
    this.active = true;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.97;
    this.vy *= 0.97;
    this.life -= this.decay;
    if (this.life <= 0) this.active = false;
  }

  render(ctx) {
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export class ParticleSystem {
  constructor() {
    this.particles = [];
    for (let i = 0; i < PARTICLE.maxCount; i++) {
      this.particles.push(new Particle());
    }
  }

  /** 在指定位置生成爆炸粒子 */
  spawnExplosion(x, y, count = PARTICLE.explosionCount, color) {
    let spawned = 0;
    for (const p of this.particles) {
      if (!p.active && spawned < count) {
        p.init(x, y, color);
        spawned++;
      }
    }
  }

  /** 在指定位置生成单色小火花 */
  spawnSpark(x, y, color, count = 5) {
    this.spawnExplosion(x, y, count, color);
  }

  update() {
    for (const p of this.particles) {
      if (p.active) p.update();
    }
  }

  render(ctx) {
    for (const p of this.particles) {
      if (p.active) p.render(ctx);
    }
  }

  clear() {
    for (const p of this.particles) {
      p.active = false;
    }
  }
}
