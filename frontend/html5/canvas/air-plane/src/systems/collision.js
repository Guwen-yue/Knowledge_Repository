// ========== 碰撞检测系统 ==========

import { rectOverlap } from '../utils/math.js';
import { POWERUP_TYPES } from '../config.js';

export class CollisionSystem {
  /**
   * 检测所有碰撞
   * @returns {Object} 碰撞结果 { kills, playerHits, powerupPickups }
   */
  static checkAll(playerBullets, enemies, enemyBullets, player, powerups, boss) {
    const result = {
      kills: [],         // 被击杀的敌机信息 { x, y, score, type }
      playerHits: 0,     // 玩家被击中次数
      powerupPickups: [], // 拾取的道具类型
    };

    // 1. 玩家子弹 vs 敌机
    for (let i = playerBullets.active.length - 1; i >= 0; i--) {
      const b = playerBullets.active[i];
      if (!b.active) continue;

      // vs 普通敌机
      for (let j = enemies.active.length - 1; j >= 0; j--) {
        const e = enemies.active[j];
        if (!e.active) continue;

        if (rectOverlap(b.bounds, e.bounds)) {
          e.hp -= b.damage;
          b.active = false;

          if (e.hp <= 0) {
            result.kills.push({
              x: e.x, y: e.y,
              score: e.score,
              type: e.type,
            });
            e.active = false;
          }
          break;
        }
      }

      // vs BOSS
      if (boss && boss.active && boss.phase === 'fight' && b.active) {
        if (rectOverlap(b.bounds, boss.bounds)) {
          boss.hp -= b.damage;
          b.active = false;
          if (boss.hp <= 0) {
            result.kills.push({
              x: boss.x, y: boss.y,
              score: boss.score,
              type: 'BOSS',
            });
          }
        }
      }
    }

    // 2. 敌方子弹 vs 玩家
    if (player.active) {
      for (let i = enemyBullets.active.length - 1; i >= 0; i--) {
        const b = enemyBullets.active[i];
        if (!b.active) continue;

        if (rectOverlap(b.bounds, player.bounds)) {
          if (player.takeDamage()) {
            result.playerHits++;
          }
          b.active = false;
        }
      }

      // 3. 敌机撞击玩家
      for (let i = enemies.active.length - 1; i >= 0; i--) {
        const e = enemies.active[i];
        if (!e.active) continue;

        if (rectOverlap(player.bounds, e.bounds)) {
          if (player.takeDamage()) {
            result.playerHits++;
          }
          e.hp -= 1;
          if (e.hp <= 0) {
            e.active = false;
            result.kills.push({
              x: e.x, y: e.y,
              score: Math.floor(e.score / 2),
              type: e.type,
            });
          }
        }
      }

      // 4. 玩家拾取道具
      for (let i = powerups.active.length - 1; i >= 0; i--) {
        const p = powerups.active[i];
        if (!p.active) continue;

        if (rectOverlap(player.bounds, p.bounds)) {
          result.powerupPickups.push(p.typeKey);
          p.applyEffect(player);
          p.active = false;
        }
      }
    }

    return result;
  }
}
