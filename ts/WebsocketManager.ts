import { delay } from './misc';
import { PublishSubscribeManager } from './PublishSubscribeManager';

/**
 * WebSocketManager 类
 * @example
 * const wsManager = new WebSocketManager('wss://example.com/socket');
 * wsManager.subscribe('open', (event) => {
 *   console.log('Open event:', event);
 * });
 * wsManager.subscribe('message', (msg) => {
 *   console.log('Received message:', message);
 * });
 * wsManager.subscribe('authError', (msg) => {
 *   console.log('authError:', msg);
 * });
 * wsManager.connect();
 * wsManager.send('Hello, WebSocket!');
 * wsManager.destroy(); // 不在需要 WebSocket 连接时进行销毁、清理事件监听
 */
export class WebSocketManager extends PublishSubscribeManager {
  private socket: WebSocket | null = null;
  private url: string;
  private reconnectInterval: number = 5000; // 重连时间间隔，5s
  private heartbeatInterval: number = 15000; // 心跳时间间隔，15s
  private heartbeatTimer: number = 0;
  private pongTimeout: number = 13000; // pong 超时时间，13s
  private pongTimeoutTimer: number = 0;
  private reconnectAttempts: number = 0; // 重连尝试次数
  private maxReconnectAttempts: number = 10; // 最大重连尝试次数
  private isNetworkOnline: boolean = navigator.onLine; // 添加网络状态追踪
  private authErrCodeList: (number | string)[] = []; // 鉴权错误码列表
  private isAuthError: boolean = false; // 是否鉴权错误
  private isDestroy: boolean = false; // 是否销毁

  constructor(url: string, authErrCodeList: (number | string)[] = []) {
    super();
    this.url = url;
    this.authErrCodeList = authErrCodeList;

    window.addEventListener('online', this.handleNetworkChange.bind(this));
    window.addEventListener('offline', this.handleNetworkChange.bind(this));
  }

  // 添加网络状态处理方法
  private handleNetworkChange() {
    this.isNetworkOnline = navigator.onLine;
    if (navigator.onLine) {
      console.log('Network is online, attempting to reconnect...');
      this.reconnectAttempts = 0; // 重置重连次数
      this.reconnect();
    } else {
      console.log('Network is offline, stopping connection attempts...');
      this.disconnect('offline');
    }
    // 发布网络状态变化事件
    this.publish('networkChange', navigator.onLine);
  }

  public connect() {
    this.isAuthError = false;
    this.isDestroy = false;
    this.socket = new WebSocket(this.url);
    this.socket.addEventListener('open', this.onOpen.bind(this));
    this.socket.addEventListener('close', this.onClose.bind(this));
    this.socket.addEventListener('error', this.onError.bind(this));
    this.socket.addEventListener('message', this.onMessage.bind(this));
  }

  private onOpen(event: Event) {
    console.log('WebSocket opened:', event);
    this.reconnectAttempts = 0;
    this.startHeartbeat();
    this.publish('open', event);
  }

  private async onClose(event: CloseEvent) {
    console.log('WebSocket closed:', event);
    this.publish('close', event);

    this.stopHeartbeat();
    this.stopPongTimeout();

    await delay(1000);

    if (!this.isNetworkOnline) {
      console.error('Network is offline, waiting for network recovery...');
      return;
    }

    if (this.isAuthError || this.isDestroy) {
      return;
    }

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnect();
      }, this.reconnectInterval);
    } else {
      console.error('Maximum reconnect attempts reached.');
      this.publish('maxReconnectReached', this.maxReconnectAttempts);
    }
  }

  private onError(event: Event) {
    console.error('WebSocket error:', event);
    this.publish('error', event);
  }

  private async onMessage(event: MessageEvent) {
    let msg = event.data;
    if (event.data instanceof Blob) {
      msg = await event.data.text();
    }
    if (msg === 'pong') {
      console.log('WebSocket msg: pong');
      this.stopPongTimeout();
      return;
    }

    if (typeof msg === 'string') {
      try {
        msg = JSON.parse(msg);
      } catch (err) {
        console.error('Failed to parse message:', err);
      }
    }

    // 如未设置 authErrCodeList，则默认所有错误码都为鉴权错误，否则为设置的错误码为鉴权错误
    if (
      msg.errCode &&
      (!this.authErrCodeList.length || this.authErrCodeList.includes(msg.errCode))
    ) {
      this.disconnect('authError');
      this.publish('authError', msg);
      return;
    }

    console.log('WebSocket msg:', msg);
    this.publish('message', msg);
  }

  public async send(data: string | object) {
    if (!this.socket) {
      this.connect();
    }

    if (this.socket?.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket waiting...');
      await delay(1000);
      this.send(data);
      return;
    }

    console.log('WebSocket send', data);
    let dataStr = data;
    if (typeof dataStr !== 'string') {
      dataStr = JSON.stringify(dataStr);
    }

    this.socket.send(dataStr);
  }

  private startHeartbeat() {
    this.heartbeatTimer = window.setInterval(() => {
      this.send('ping');
      this.startPongTimeout();
    }, this.heartbeatInterval);
  }

  private stopHeartbeat() {
    clearInterval(this.heartbeatTimer);
  }

  private startPongTimeout() {
    this.pongTimeoutTimer = window.setTimeout(() => {
      console.warn('Pong timeout. Reconnecting...', this.reconnectAttempts);
      this.reconnect();
    }, this.pongTimeout);
  }

  private stopPongTimeout() {
    clearTimeout(this.pongTimeoutTimer);
  }

  private async reconnect() {
    // 如果网络离线，不进行重连
    if (!this.isNetworkOnline) {
      console.log('Network is offline, skipping reconnection attempt...');
      return;
    }

    this.stopHeartbeat();
    this.stopPongTimeout();
    await delay(3000);

    this.publish('reconnecting', this.reconnectAttempts + 1);

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.connect();
    } else {
      console.error('Maximum reconnect attempts reached.');
      this.publish('maxReconnectReached', this.maxReconnectAttempts);
    }
  }

  private disconnect(reason: string) {
    if (!this.socket) {
      return;
    }
    this.socket.close(1000, reason);
    this.socket = null;
  }

  public destroy() {
    this.isDestroy = true;
    this.disconnect('destroy');
    window.removeEventListener('online', this.handleNetworkChange.bind(this));
    window.removeEventListener('offline', this.handleNetworkChange.bind(this));
    this.clear(); // 清理所有事件订阅
  }
}
