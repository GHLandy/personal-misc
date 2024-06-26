/**
 * 发布订阅模式
 */
export class PublishSubscribe {
  /** 监听的事件 */
  events: { [key: string]: ((...args: any[]) => void)[] } = {};

  /**
   * 添加事件监听
   * @param eventName 事件名称
   * @param callback 事件回调
   */
  addEventListener(eventName: string, callback: (...args: any[]) => void) {
    if (typeof callback !== 'function') {
      console.warn(`Event::${eventName}, callback need to be function`);
      return;
    }

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  /**
   * 移除事件监听
   * @param eventName 事件名称
   * @param callback 事件回调
   */
  removeEventListener(eventName: string, callback: (...args: any[]) => void) {
    if (!this.events[eventName]) {
      console.warn(`Event::${eventName}, not registered`);
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
   * @param eventName 事件名称
   * @param args 传给事件回调的参数
   */
  dispatchEvent(eventName: string, ...args: any[]) {
    if (!this.events[eventName]) {
      console.warn(`Event::${eventName}, not registered`);
      return;
    }

    this.events[eventName].forEach((listener) => {
      listener(...args);
    });
  }
}
