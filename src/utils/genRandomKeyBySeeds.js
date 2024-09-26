/**
 * 通过种子 (如大小写字母、数字) 生成指定长度的 key
 * @param {string[]} seeds 传入字符串列表，如大小写字母、数字列表等
 * @param {number} length 默认为 16 位
 */
export function genRandomKeyBySeeds(seeds, length = 16) {
  if (!seeds || !seeds.length) {
    return '';
  }

  let str = '';
  for (let index = 0; index < length; index++) {
    const randomIndex = Math.round(Math.random() * (seeds.length - 1));
    str += seeds[randomIndex];
  }

  return str;
}
