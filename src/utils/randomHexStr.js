/**
 * 随机最多 15 位十六进制字符串
 * @return {string}
 */
export function randomHexStr() {
  return Number(Math.random().toFixed(15).slice(2)).toString(16);
}
