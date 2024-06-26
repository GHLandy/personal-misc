const AlphabetUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/** 大写字符列表 */
export const UpperCaseList = AlphabetUpperCase.split('');

/** 小写字符列表 */
export const LowerCaseList = UpperCaseList.map(
  (item) => String.prototype.toLowerCase.call(item) as string,
);

const DecimalDigit = '0123456789';

/** 数字列表 */
export const NumericList = DecimalDigit.split('');

/** Base64 编码字符 0-9a-zA-Z+/ */
export const Base64List = [...UpperCaseList, ...LowerCaseList, ...NumericList, '+', '/'];
