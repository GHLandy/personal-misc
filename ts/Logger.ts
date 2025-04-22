/**
 * 通用 Logger
 */
export class Logger {
  private prefix;
  private _info = console.info.bind(console);
  private _warn = console.warn.bind(console);
  private _error = console.error.bind(console);

  constructor(prefix = 'Logger') {
    this.prefix = prefix;
  }

  // eslint-disable-next-line
  info(...args: any[]) {
    this._info(`%c ${this.prefix} `, 'font-size: 14px; background: #00f3f3', ...args);
  }

  // eslint-disable-next-line
  warn(...args: any[]) {
    this._warn(`%c ${this.prefix} `, 'font-size: 14px; background: #00f3f3', ...args);
  }

  // eslint-disable-next-line
  error(...args: any[]) {
    this._error(`%c ${this.prefix} `, 'font-size: 14px; background: #00f3f3', ...args);
  }
}
