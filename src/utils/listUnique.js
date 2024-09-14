/**
 * 列表去重
 * @param {number[] | string[] | object[]} list 列表 (数字、字符串、对象列表)
 * @param {string} [key = null] 通过那个键去重 (数字、字符串列表则不用传)
 * @param {boolean} [head = false] 默认 false 取后边的，true 取前边的
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
