// ========== 波次管理器 ==========

import { GAME_WIDTH } from '../config.js';
import { randInt } from '../utils/math.js';

// 波次配置
const WAVE_CONFIG = [
  // { time, type, count, pattern, interval }
  { time: 0,     type: 'grunt', count: 3, pattern: 'straight', interval: 600, spawnZone: 'random' },
  { time: 4000,  type: 'grunt', count: 5, pattern: 'straight', interval: 400, spawnZone: 'random' },
  { time: 9000,  type: 'fast',  count: 4, pattern: 'zigzag',   interval: 500, spawnZone: 'random' },
  { time: 14000, type: 'grunt', count: 6, pattern: 'straight', interval: 300, spawnZone: 'random' },
  { time: 18000, type: 'tank',  count: 2, pattern: 'straight', interval: 1000, spawnZone: 'center' },
  { time: 23000, type: 'fast',  count: 8, pattern: 'zigzag',   interval: 250, spawnZone: 'random' },
  { time: 28000, type: 'BOSS',  count: 1, pattern: 'center',   interval: 0,   spawnZone: 'center' },
  // 第二轮（难度提升）
  { time: 40000, type: 'grunt', count: 8, pattern: 'sine',     interval: 300, spawnZone: 'random' },
  { time: 45000, type: 'fast',  count: 6, pattern: 'zigzag',   interval: 350, spawnZone: 'random' },
  { time: 50000, type: 'tank',  count: 3, pattern: 'straight', interval: 800, spawnZone: 'random' },
  { time: 56000, type: 'fast',  count: 10, pattern: 'sine',    interval: 200, spawnZone: 'random' },
  { time: 62000, type: 'BOSS',  count: 1, pattern: 'center',   interval: 0,   spawnZone: 'center' },
];

export class WaveManager {
  constructor() {
    this.gameTime = 0;
    this.currentWaveIndex = 0;
    this.spawnQueue = [];
    this.isBossWave = false;
    this.allWavesDone = false;
  }

  reset() {
    this.gameTime = 0;
    this.currentWaveIndex = 0;
    this.spawnQueue = [];
    this.isBossWave = false;
    this.allWavesDone = false;
  }

  update(dt) {
    this.gameTime += dt;

    // 检查是否触发新波次
    while (this.currentWaveIndex < WAVE_CONFIG.length &&
           this.gameTime >= WAVE_CONFIG[this.currentWaveIndex].time) {
      const wave = WAVE_CONFIG[this.currentWaveIndex];
      this._enqueueWave(wave);
      if (wave.type === 'BOSS') this.isBossWave = true;
      this.currentWaveIndex++;
    }

  }

  _enqueueWave(wave) {
    for (let i = 0; i < wave.count; i++) {
      this.spawnQueue.push({
        delay: i * wave.interval,
        spawnTime: this.gameTime + i * wave.interval,
        type: wave.type,
        pattern: wave.pattern,
        spawnZone: wave.spawnZone,
        index: i,
        total: wave.count,
      });
    }
  }

  _processSpawnQueue() {
    // 返回已到生成时间的条目
    const toSpawn = [];
    for (let i = this.spawnQueue.length - 1; i >= 0; i--) {
      if (this.gameTime >= this.spawnQueue[i].spawnTime) {
        toSpawn.push(this.spawnQueue[i]);
        this.spawnQueue.splice(i, 1);
      }
    }
    return toSpawn;
  }

  /** 获取应该生成的敌机（供外部调用） */
  getSpawns() {
    const spawns = [];
    for (let i = this.spawnQueue.length - 1; i >= 0; i--) {
      if (this.gameTime >= this.spawnQueue[i].spawnTime) {
        spawns.push(this.spawnQueue[i]);
        this.spawnQueue.splice(i, 1);
      }
    }
    return spawns;
  }

  /** 计算生成位置 */
  getSpawnPosition(spawn) {
    const margin = 40;
    switch (spawn.spawnZone) {
      case 'center':
        return { x: GAME_WIDTH / 2, y: -40 };
      case 'random':
      default:
        return { x: randInt(margin, GAME_WIDTH - margin), y: -40 };
    }
  }

  /** BOSS 击败后重置 bossWave 标记 */
  onBossDefeated() {
    this.isBossWave = false;
  }

  /** 是否还有更多波次 */
  get hasMoreWaves() {
    return this.currentWaveIndex < WAVE_CONFIG.length || this.spawnQueue.length > 0;
  }
}
