// ========== 音效管理 ==========

export class AudioManager {
  constructor() {
    this.sounds = {};
    this.audioContext = null;
    this.unlocked = false;
    this.bgmSource = null;
    this.bgmGain = null;
    this.masterVolume = 0.5;
  }

  /** 解锁 AudioContext（需用户手势触发） */
  unlock() {
    if (this.unlocked) return;
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      // 播放空 buffer 解锁
      const buffer = this.audioContext.createBuffer(1, 1, 22050);
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioContext.destination);
      source.start(0);
      this.unlocked = true;
    } catch (e) {
      console.warn('AudioContext unlock failed:', e);
    }
  }

  /** 加载音效 */
  async load(name, url) {
    if (!this.audioContext) return;
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this.sounds[name] = await this.audioContext.decodeAudioData(arrayBuffer);
    } catch (e) {
      console.warn(`Failed to load sound "${name}":`, e);
    }
  }

  /** 播放音效（支持多实例重叠） */
  play(name, volume = 1) {
    if (!this.sounds[name] || !this.unlocked) return;
    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = volume * this.masterVolume;
      source.buffer = this.sounds[name];
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      source.start(0);
    } catch (e) {}
  }

  /** 播放背景音乐（循环） */
  playBGM(name, volume = 0.3) {
    if (!this.sounds[name] || !this.unlocked) return;
    this.stopBGM();
    try {
      this.bgmSource = this.audioContext.createBufferSource();
      this.bgmGain = this.audioContext.createGain();
      this.bgmGain.gain.value = volume * this.masterVolume;
      this.bgmSource.buffer = this.sounds[name];
      this.bgmSource.loop = true;
      this.bgmSource.connect(this.bgmGain);
      this.bgmGain.connect(this.audioContext.destination);
      this.bgmSource.start(0);
    } catch (e) {}
  }

  /** 停止背景音乐 */
  stopBGM() {
    if (this.bgmSource) {
      try { this.bgmSource.stop(); } catch (e) {}
      this.bgmSource = null;
    }
  }
}
