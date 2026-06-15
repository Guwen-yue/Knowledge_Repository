// ========== 通用对象池 ==========

export class ObjectPool {
  /**
   * @param {Function} createFn - 创建新对象
   * @param {Function} resetFn - 重置对象
   * @param {number} maxSize - 最大预分配数量
   */
  constructor(createFn, resetFn, maxSize = 1000) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
    this.active = [];

    for (let i = 0; i < maxSize; i++) {
      this.pool.push(createFn());
    }
  }

  /** 从池中获取一个对象 */
  get() {
    let obj = this.pool.pop();
    if (!obj) {
      // 池耗尽，回收最早的 active
      if (this.active.length > 0) {
        obj = this.active.shift();
      } else {
        obj = this.createFn();
      }
    }
    this.active.push(obj);
    return obj;
  }

  /** 释放对象回池 */
  release(obj) {
    const idx = this.active.indexOf(obj);
    if (idx !== -1) {
      this.active.splice(idx, 1);
      this.resetFn(obj);
      this.pool.push(obj);
    }
  }

  /** 更新所有活跃对象，自动回收不活跃的 */
  updateAll(dt) {
    for (let i = this.active.length - 1; i >= 0; i--) {
      const obj = this.active[i];
      obj.update(dt);
      if (!obj.active) {
        this.active.splice(i, 1);
        this.resetFn(obj);
        this.pool.push(obj);
      }
    }
  }

  /** 渲染所有活跃对象 */
  renderAll(ctx) {
    for (let i = 0; i < this.active.length; i++) {
      this.active[i].render(ctx);
    }
  }

  /** 清空所有活跃对象 */
  clear() {
    while (this.active.length > 0) {
      const obj = this.active.pop();
      this.resetFn(obj);
      this.pool.push(obj);
    }
  }

  /** 当前活跃数量 */
  get count() {
    return this.active.length;
  }
}
