/** 数字列表 */
export const NumericList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/** 小写字符列表 */
export const LowerCaseList = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

/** 大写字符列表 */
export const UpperCaseList = LowerCaseList.map((item) => ''.toUpperCase.call(item));

/** Base64 编码字符 0-9a-zA-Z+/ */
export const Base64List = [...UpperCaseList, ...LowerCaseList, ...NumericList, '+', '/'];
