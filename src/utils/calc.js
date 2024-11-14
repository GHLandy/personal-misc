/**
 * 兼容数字转化, 将不小心输入的 string、null、undefined 转为 0
 * @param {number} num
 * @returns {number}
 */
function compactNumber(num) {
  return Number(num || null) || 0;
}

/**
 * 取小数点后的数位长度
 * @param {number} num
 * @returns {number}
 *
 * @example 例如：1.223 => 3 或 0.45 => 2
 */
function lengthAfterDot(num) {
  let len;

  try {
    len = compactNumber(num).toString().split('.')[1].length;
  } catch (e) {
    len = 0;
  }

  return len;
}

/**
 * 移除数字的小数点
 * @param {number} num
 * @returns {number}
 *
 * @example 例如: 123.034 => 123034
 */
function getNoDotNum(num) {
  return Number(compactNumber(num).toString().replace('.', ''));
}

/**
 * 基本精确加法运算 (仅支持两个数相加)
 * @param {number} a 加数
 * @param {number} b 加数
 * @returns {number}
 */
function accAddBase(a, b) {
  const c = lengthAfterDot(a);
  const d = lengthAfterDot(b);
  const e = 10 ** Math.max(c, d);

  return (accMul(a, e) + accMul(b, e)) / e;
}

/**
 * 基本精确乘法运算 (仅支持两个数相乘)
 * @param {number} a 乘数
 * @param {number} b 乘数
 * @returns {number}
 */
function accMulBase(a, b) {
  const r1 = getNoDotNum(a);

  const r2 = getNoDotNum(b);

  const m = lengthAfterDot(a) + lengthAfterDot(b);

  return (r1 * r2) / 10 ** m;
}

/**
 * 精确加法运算 a + b + c + ... + n 的精确值
 * @param {number[]} args
 * @returns {number}
 */
export function accAdd(...args) {
  return args.reduce((acc, cur) => accAddBase(acc, cur), 0);
}

/**
 * 精确加法运算 a - b 的精确值
 * @param {number} a 被减数
 * @param {number} b 减数
 * @returns {number}
 */
export function accSub(a, b) {
  const c = lengthAfterDot(a);
  const d = lengthAfterDot(b);
  const e = 10 ** Math.max(c, d);

  return (accMul(a, e) - accMul(b, e)) / e;
}

/**
 * 精确乘法运算 a × b × c × ... × n 的精确值
 * @param {number[]} args
 * @returns {number}
 */
export function accMul(...args) {
  return args.reduce((acc, cur) => accMulBase(acc, cur), 1);
}

/**
 * 精确除法运算 a ÷ b 的精确值
 * @param {number} a 被除数
 * @param {number} b 除数
 * @returns {number}
 */
export function accDiv(a, b) {
  const r1 = getNoDotNum(a);
  const r2 = getNoDotNum(b);
  const d = lengthAfterDot(b) - lengthAfterDot(a);

  return (r1 / r2) * 10 ** d;
}
