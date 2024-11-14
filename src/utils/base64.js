import CryptoJS from 'crypto-js';

// 1. Base64 数据编码：A-Z、a-z、0-9、+、/ 及 = (= 为补白)
// 规范：https://datatracker.ietf.org/doc/html/rfc4648#section-4
//
// 2. Base64Url 数据编码 (URL、文件名安全)：A-Z、a-z、0-9、- (减号)、_ (下划线) 及 = (= 为补白)
// 规范：https://datatracker.ietf.org/doc/html/rfc4648#section-5
//
// 以下方法为 1. Base64 数据编码

/**
 * 字符串编码为 Base64
 * @param {string} str 原始字符串
 */
export function encodeBase64(str) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
}

/**
 * 解析 Base64 字符为原始字符
 * @param {string} str Base64 字符
 */
export function decodeBase64(str) {
  return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8);
}

export default {
  encode: encodeBase64,
  decode: decodeBase64,
};
