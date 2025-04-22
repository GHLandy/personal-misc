// 定义事件处理函数的类型
type EventHandler = (...args: any[]) => void; // eslint-disable-line

/**
 * 发布订阅管理类
 * @example
 * cosnt pubSubMgr = new PublishSubscribeManager();
 * const handler = (...args) => console.log(args);
 * const unsubFn = pubSubMgr.subscribe('some-event', handler); // 订阅事件
 * pubSubMgr.publish('some-event', 'some', 'params'); // 发布事件
 * unsubFn(); // 取消订阅 方式一
 * pubSubMgr.unsubscribe('some-event', handler) // 取消订阅 方式二
 */
export class PublishSubscribeManager {
  // 存储所有事件及其对应的处理函数
  private events: Map<string, EventHandler[]>;

  constructor() {
    this.events = new Map();
  }

  /**
   * 订阅事件
   * @param eventName 事件名称
   * @param handler 事件处理函数
   * @throws {TypeError} 当 eventName 不为非空字符串、handler 不是函数时抛出错误
   */
  subscribe(eventName: string, handler: EventHandler): () => void {
    if (!eventName || typeof eventName !== 'string') {
      throw new TypeError(`Event name must be a non-empty string, got ${typeof eventName}`);
    }

    // 运行时检查 handler 类型
    if (typeof handler !== 'function') {
      throw new TypeError(`Event handler must be a function, got ${typeof handler}`);
    }

    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    const handlers = this.events.get(eventName)!;
    if (!handlers.includes(handler)) {
      handlers.push(handler);
    }

    return () => this.unsubscribe(eventName, handler);
  }

  /**
   * 取消订阅事件
   * @param eventName 事件名称
   * @param handler 事件处理函数
   */
  unsubscribe(eventName: string, handler: EventHandler): void {
    if (!this.events.has(eventName)) return;

    const handlers = this.events.get(eventName)!;
    const index = handlers.indexOf(handler);

    if (index !== -1) {
      handlers.splice(index, 1);
    }

    // 如果没有处理函数了，删除该事件
    if (handlers.length === 0) {
      this.events.delete(eventName);
    }
  }

  /**
   * 发布事件
   * @param eventName 事件名称
   * @param args 传递给处理函数的参数
   */
  // eslint-disable-next-line
  publish(eventName: string, ...args: any[]): void {
    if (!this.events.has(eventName)) return;

    const handlers = this.events.get(eventName)!;
    handlers.forEach((handler) => {
      try {
        handler(...args);
      } catch (error) {
        console.error(`Error in event handler for ${eventName}:`, error);
      }
    });
  }

  /**
   * 清除所有事件订阅
   */
  clear(): void {
    this.events.clear();
  }

  /**
   * 获取特定事件的处理函数数量
   * @param eventName 事件名称
   * @returns 处理函数数量
   */
  countSubscribers(eventName: string): number {
    if (!this.events.has(eventName)) return 0;
    return this.events.get(eventName)!.length;
  }
}
