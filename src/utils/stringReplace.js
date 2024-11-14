/**
 * 字符串脱敏替换方法
 * @param {string} str 原始字符串
 * @param {number} startIndex 开始索引，默认 0 表示第一位
 * @param {number} replaceCount 替换次数，默认 0 表示不替换
 * @param {string | {(str: string): string}} replaceChar 替换字符，默认星号 *，或者通过自定义方法替换
 * @returns {string} 返回替换后的字符串
 */
export function stringReplace(str, startIndex = 0, replaceCount = 0, replaceChar = '*') {
  // 传入空值 返回 空字符串
  if (!str) {
    return '';
  }

  // 传入非字符串类型 强转 字符串并返回
  if (typeof str !== 'string') {
    return String(str);
  }

  // 替换次数为负数或 0 原样返回
  if (replaceCount <= 0) {
    return str;
  }

  // 开始索引大于原始字符串最大索引 返回 原始字符串
  if (startIndex > str.length - 1) {
    return str;
  }

  // 开始索引为负数 (-1 表示 length - 1 位 (即倒数第一位)) 先转换为整数索引
  if (startIndex < 0) {
    if (-startIndex > str.length - 1) {
      startIndex = 0;
    } else {
      // 这里用加号 + 是因为 startIndex 本身就是负数了
      startIndex = str.length + startIndex;
    }
  }

  let newStr = '';

  // 循环去替换
  for (let index = 0; index < str.length; index++) {
    if (index < startIndex || index >= startIndex + replaceCount) {
      newStr += str[index]; // 原样字符
    } else if (typeof replaceChar === 'function') {
      newStr += replaceChar(str[index]); // 通过传入的方法，比如需要把数字 1 替换为 A，则由部方法去控制
    } else {
      newStr += replaceChar; // 传入的时候需要字符，比如星号 *
    }
  }

  return newStr;
}
