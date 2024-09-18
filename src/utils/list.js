/**
 * 列表去重
 * @param {number[] | string[] | object[]} list 列表 (数字、字符串、对象列表)
 * @param {string} [key = null] 通过那个键去重 (数字、字符串列表则不用传)
 * @param {boolean} [head = false] 默认 false 取后边的，true 取前边的
 * @returns {any[]}
 */
export function listUnique(list, key = null, head = false) {
  /**
   * @type {any[]}
   */
  let localList = JSON.parse(JSON.stringify(list));
  if (head) {
    localList = localList.reverse();
  }
  return localList.reduce((acc, item, index, arr) => {
    const leftArr = arr.slice(index + 1);

    let bool = leftArr.find((it) => it === item);
    if (key) {
      bool = leftArr.find((it) => it[key] === item[key]);
    }

    if (bool) {
      return [...acc];
    }

    return [...acc, item];
  }, []);
}

/**
 * 列表排序
 * @param {object[]} list
 * @param {string} sortKey 排序的 key, 比如 time
 * @param {'asc' | 'desc'} sorter
 * @returns {any[]}
 */
export function listSort(list = [], sortKey, sorter = 'desc') {
  if (!list.length) {
    return [];
  }
  const localList = JSON.parse(JSON.stringify(list));
  // 顺序 (小 -> 大)
  let sortFn = (a, b) => a[sortKey] - b[sortKey];
  if (sorter === 'desc') {
    // 倒序 (大 -> 小)
    sortFn = (a, b) => b[sortKey] - a[sortKey];
  }
  localList.sort(sortFn);
  return localList;
}
