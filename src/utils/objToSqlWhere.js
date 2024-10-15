/**
 * 数组各项拼接组成字符串 如：数组 `[1, 2, 3]` 转为 `1, 2, 3`
 * @param {array} arr
 * @param {{(any): string}} itemFn
 * @param {string} separator
 * @param {string} initialValue
 * @returns
 */
function handleArrToStr(
  arr = [],
  itemFn = (item) => `${item}`,
  separator = ', ',
  initialValue = '',
) {
  return arr.reduce((acc, item) => {
    const itemStr = itemFn(item);
    if (!acc) {
      return itemStr;
    }
    return `${acc}${separator}${itemStr}`;
  }, initialValue);
}

/**
 * 数组 [1, 2, 3] 转为字符串 ('1', '2', '3') 用于 IN 语句
 * @param {array} arr
 * @returns {string}
 */
function handleArrayValue(arr = []) {
  const tmpStr = handleArrToStr(arr, (item) => `'${item}'`);
  return `(${tmpStr})`;
}

/**
 * condition 对象键值转换为 SQL WHERE 条件
 *
 * - `{ key: 1 }` 转为 `key = '1'`
 * - `{ 'key:>': 1 }` 转为 `key > '1'`
 * - `{ 'key': [1, 2] }` 转为 `key IN ('1', '2')`
 * - `{ 'key1,key2': 1 }` 转为 `(key1 = '1' OR key2 = '1')`
 * - `{ 'key1,key2:>': 1 }` 转为 `(key1 > '1' OR key2 > '1')`
 * - `{ 'key1,key2': [1, 2] }` 转为 `(key1 IN ('1', '2') OR key2 IN ('1', '2'))`
 *
 * 最后转换结果使用 AND 连接，同时在前面附带 WHERE，如 `WHERE a = '1' AND (b = '2' OR c = '2')`
 */
export function objToSqlWhere(condition = {}) {
  const keys = Object.keys(condition);
  if (!keys.length) {
    return '';
  }

  const conditionStr = keys.reduce((acc, key) => {
    const [multiKey, opt] = String.prototype.split.call(key, ':');
    let operator = opt || '=';

    let itemStr = `${multiKey} ${operator} '${condition[key]}'`;
    if (Array.isArray(condition[key])) {
      itemStr = `${multiKey} IN ${handleArrayValue(condition[key])}`;
    }

    if (multiKey.includes(',')) {
      const tmpStr = multiKey.split(',').reduce((ac, it) => {
        let itStr = `${it} ${operator} '${condition[key]}'`;
        if (Array.isArray(condition[key])) {
          itStr = `${it} IN ${handleArrayValue(condition[key])}`;
        }
        if (!ac) {
          return itStr;
        }
        return `${ac} OR ${itStr}`;
      }, '');
      itemStr = `(${tmpStr})`;
    }

    if (!acc) {
      return itemStr;
    }

    return `${acc} AND ${itemStr}`;
  }, '');

  return `WHERE ${conditionStr}`;
}
