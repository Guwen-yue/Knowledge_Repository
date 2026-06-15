// ========== 游戏主场景 ==========

import { GAME_WIDTH, GAME_HEIGHT, POWERUP_TYPES } from '../config.js';
import { Player } from '../entities/player.js';
import { Bullet, resetBullet } from '../entities/bullet.js';
import { Enemy, resetEnemy } from '../entities/enemy.js';
import { Boss } from '../entities/boss.js';
import { PowerUp, resetPowerUp } from '../entities/powerup.js';
import { ObjectPool } from '../systems/object-pool.js';
import { ParticleSystem } from '../systems/particle.js';
import { WaveManager } from '../systems/wave-manager.js';
import { CollisionSystem } from '../systems/collision.js';
import { HUD } from '../hud.js';
import { randFloat } from '../utils/math.js';

export class PlayScene {
  constructor(game) {
    this.game = game;
    this.player = new Player();
    this.boss = new Boss();
    this.hud = new HUD();
    this.particles = new ParticleSystem();
    this.waveManager = new WaveManager();

    this.playerBullets = new ObjectPool(() => new Bullet(), resetBullet, 300);
    this.enemyBullets = new ObjectPool(() => new Bullet(), resetBullet, 500);
    this.enemies = new ObjectPool(() => new Enemy(), resetEnemy, 50);
    this.powerups = new ObjectPool(() => new PowerUp(), resetPowerUp, 20);

    this.gameTime = 0;
    this.bombEffect = { active: false, timer: 0, duration: 800 };
    this.screenShake = { timer: 0, intensity: 0 };

    // 背景星空
    this.stars = [];
    for (let i = 0; i < 100; i++) {
      this.stars.push({
        x: Math.random() * GAME_WIDTH,
        y: Math.random() * GAME_HEIGHT,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 2 + 0.5,
      });
    }
  }

  enter() {
    this.player.reset();
    this.hud.reset();
    this.waveManager.reset();
    this.playerBullets.clear();
    this.enemyBullets.clear();
    this.enemies.clear();
    this.powerups.clear();
    this.particles.clear();
    this.boss = new Boss();
    this.gameTime = 0;
    this.bombEffect.active = false;
    this.bombCooldown = 0;

    // 炸弹按钮（双击屏幕任意位置使用）
    this.lastTapTime = 0;
    this.game.input.onTap((type, pos) => {
      if (type === 'start') {
        const now = Date.now();
        // 双击间隔 300ms 内算双击
        if (now - this.lastTapTime < 300 && this.bombCooldown <= 0) {
          this._useBomb();
          this.bombCooldown = 1000; // 冷却 1 秒
        }
        this.lastTapTime = now;
      }
    });
  }

  exit() {
    this.game.input.onTap(null);
  }

  _useBomb() {
    if (!this.player.useBomb()) return;

    this.bombEffect.active = true;
    this.bombEffect.timer = 0;
    this.screenShake = { timer: 500, intensity: 8 };

    // 对所有敌机造成伤害
    for (const e of this.enemies.active) {
      if (e.active) {
        e.hp -= 999;
        this.particles.spawnExplosion(e.x, e.y, 15);
        this.hud.addScore(e.score);
      }
    }

    // 对 BOSS 造成伤害
    if (this.boss.active && this.boss.phase === 'fight') {
      this.boss.hp -= 20;
      this.particles.spawnExplosion(this.boss.x, this.boss.y, 30, '#f80');
    }

    // 清除敌方子弹
    this.enemyBullets.clear();

    // 播放音效
    if (this.game.audio) this.game.audio.play('explosion', 0.8);
  }

  _spawnPowerUp(x, y) {
    // 随机掉落道具
    const roll = Math.random();
    let cumulative = 0;
    for (const [key, cfg] of Object.entries(POWERUP_TYPES)) {
      cumulative += cfg.dropRate;
      if (roll < cumulative) {
        const p = this.powerups.get();
        if (p) p.init(x, y, key);
        return;
      }
    }
  }

  update(dt) {
    this.gameTime += dt;
    if (this.bombCooldown > 0) this.bombCooldown -= dt;
    const input = this.game.input;

    // 更新星空
    for (const s of this.stars) {
      s.y += s.speed;
      if (s.y > GAME_HEIGHT) {
        s.y = 0;
        s.x = Math.random() * GAME_WIDTH;
      }
    }

    // 更新玩家
    this.player.update(dt, input.x, input.y);

    // 自动开火
    const weapon = this.player.weapon;
    if (this.gameTime - this.player.lastFireTime > weapon.fireRate) {
      this.player.lastFireTime = this.gameTime;
      for (const p of weapon.pattern) {
        const b = this.playerBullets.get();
        if (b) b.init(this.player.x + p.dx, this.player.y + this.player.height, p.dx * 0.3, p.dy, p.speed, true);
      }
      if (this.game.audio) this.game.audio.play('shoot', 0.2);
    }

    // 波次管理
    this.waveManager.update(dt);
    const spawns = this.waveManager.getSpawns();
    for (const spawn of spawns) {
      if (spawn.type === 'BOSS') {
        if (!this.boss.active) this.boss.init();
      } else {
        const pos = this.waveManager.getSpawnPosition(spawn);
        const e = this.enemies.get();
        if (e) e.init(pos.x, pos.y, spawn.type, spawn.pattern);
      }
    }

    // 敌机开火
    for (const e of this.enemies.active) {
      if (e.active && e.shouldFire()) {
        const b = this.enemyBullets.get();
        if (b) {
          const dx = this.player.x - e.x;
          const dy = this.player.y - e.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          b.init(e.x, e.y + e.height, (dx / dist) * 2, (dy / dist) * 3 + 1, 3, false);
        }
      }
    }

    // BOSS 更新 & 开火
    if (this.boss.active) {
      this.boss.update(dt);
      const bossBullets = this.boss.getFireBullets();
      for (const bd of bossBullets) {
        const b = this.enemyBullets.get();
        if (b) b.init(bd.x, bd.y, bd.vx, bd.vy, 3, false);
      }
    }

    // 更新所有对象
    this.playerBullets.updateAll(dt);
    this.enemyBullets.updateAll(dt);
    this.enemies.updateAll(dt);
    this.powerups.updateAll(dt);
    this.particles.update();
    this.hud.update(dt);

    // 碰撞检测
    const hits = CollisionSystem.checkAll(
      this.playerBullets, this.enemies, this.enemyBullets,
      this.player, this.powerups, this.boss
    );

    // 处理击杀
    for (const kill of hits.kills) {
      this.particles.spawnExplosion(kill.x, kill.y, 20);
      this.hud.addScore(kill.score);
      if (this.game.audio) this.game.audio.play('explosion', 0.4);

      // 敌机死亡掉落道具
      if (kill.type !== 'BOSS') {
        this._spawnPowerUp(kill.x, kill.y);
      } else {
        // BOSS 掉落多个道具
        for (let i = 0; i < 3; i++) {
          this._spawnPowerUp(kill.x + randFloat(-40, 40), kill.y + randFloat(-20, 20));
        }
        this.waveManager.onBossDefeated();
        this.boss.active = false;
      }
    }

    // 玩家被击中
    if (hits.playerHits > 0) {
      this.screenShake = { timer: 300, intensity: 4 };
      if (this.game.audio) this.game.audio.play('explosion', 0.5);
      if (!this.player.active) {
        // 游戏结束
        setTimeout(() => {
          this.game.switchState('gameover');
        }, 1000);
      }
    }

    // 炸弹特效
    if (this.bombEffect.active) {
      this.bombEffect.timer += dt;
      if (this.bombEffect.timer >= this.bombEffect.duration) {
        this.bombEffect.active = false;
      }
    }

    // 屏幕震动
    if (this.screenShake.timer > 0) {
      this.screenShake.timer -= dt;
    }
  }

  render(ctx, time) {
    ctx.save();

    // 屏幕震动偏移
    if (this.screenShake.timer > 0) {
      const intensity = this.screenShake.intensity * (this.screenShake.timer / 300);
      ctx.translate(
        (Math.random() - 0.5) * intensity * 2,
        (Math.random() - 0.5) * intensity * 2
      );
    }

    // 背景
    ctx.fillStyle = '#0a0a2e';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 星空
    ctx.fillStyle = '#fff';
    for (const s of this.stars) {
      ctx.globalAlpha = 0.2 + s.size * 0.15;
      ctx.fillRect(s.x, s.y, s.size, s.size);
    }
    ctx.globalAlpha = 1;

    // 渲染游戏对象
    this.powerups.renderAll(ctx);
    this.enemies.renderAll(ctx);
    if (this.boss.active) this.boss.render(ctx, time);
    this.playerBullets.renderAll(ctx);
    this.enemyBullets.renderAll(ctx);
    this.player.render(ctx, time);
    this.particles.render(ctx);

    // 炸弹全屏白闪
    if (this.bombEffect.active) {
      const progress = this.bombEffect.timer / this.bombEffect.duration;
      let alpha;
      if (progress < 0.2) {
        alpha = progress / 0.2;
      } else {
        alpha = 1 - (progress - 0.2) / 0.8;
      }
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }

    // HUD（不受震动影响）
    ctx.restore();
    ctx.save();
    this.hud.render(ctx, this.player, time);
    ctx.restore();
  }
}
