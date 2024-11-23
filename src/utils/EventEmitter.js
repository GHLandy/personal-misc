/**
 * 事件触发器
 */
export class EventEmitter {
  /**
   * 监听的事件
   * @type {{ [key: string]: ((...args: any[]) => void)[] }}
   */
  events = {};

  /**
   * 添加事件监听
   * @param {string} eventName 事件名称
   * @param {{ (...args: any[]): void }} callback 事件回调
   */
  on(eventName, callback) {
    if (typeof callback !== 'function') {
      console.warn(`Event::${eventName}, callback Must Be a function.`);
      return;
    }

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  /**
   * 移除事件监听
   * @param {string} eventName 事件名称
   * @param {{ (...args: any[]): void }} callback 事件回调
   */
  off(eventName, callback) {
    if (!this.events[eventName]) {
      console.warn(`Event::${eventName}, Not registered`);
      return;
    }

    const index = this.events[eventName].findIndex((listener) => listener === callback);

    if (index !== -1) {
      this.events[eventName].splice(index, 1);
    }

    if (!this.events[eventName].length) {
      delete this.events[eventName];
    }
  }

  /**
   * 触发事件
   * @param {string} eventName 事件名称
   * @param {any[]} args 传给事件回调的参数
   */
  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      console.warn(`Event::${eventName}, Not registered`);
      return;
    }

    this.events[eventName].forEach((listener) => {
      listener(...args);
    });
  }
}
