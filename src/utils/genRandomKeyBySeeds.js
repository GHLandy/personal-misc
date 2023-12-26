import { Base62List } from '../constants/misc';

/**
 * 通过种子 (如大小写字母、数字) 生成指定长度的 key
 * @param {number} [length] 不传入这默认为 16 位
 * @param {string[]} [seeds] 不传入默认为 0-9a-zA-Z
 * @returns {string}
 */
export function genRandomKeyBySeeds(length = 16, seeds = Base62List) {
  let str = '';
  for (let index = 0; index < length; index++) {
    const randomIndex = Math.round(Math.random() * (seeds.length - 1));
    str += seeds[randomIndex];
  }

  return str;
}
