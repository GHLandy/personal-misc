/**
 * 获取文件头
 * @param {File} file 文件对象
 * @param {number} byteLength 文件对象
 */
export async function getFileHeader(file, byteLength = 4) {
  const firstNByte = file.slice(0, byteLength);
  const arrayBuFFer = await firstNByte.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuFFer).subarray(0, 4);
  let header = '';
  for (let i = 0; i < uint8Array.length; i++) {
    header += uint8Array[i].toString(16).toUpperCase();
  }
  return header;
}

/**
 * 文件头对应的文件扩展名
 * @constant
 */
export const HeaderFileExtensionMap = {
  '89504E47': 'png',
  47494638: 'gif',
  FFD8FFE0: 'jpg',
  FFD8FFE1: 'jpg',
  FFD8FFE2: 'jpg',
  25504446: 'pdf',
};

/**
 * base64 数据转为 Blob
 * @param {string} base64Str 不带格式化的，形如 UEsDBBQAAAgIAIl4Wlo5hm/
 */
export function base64ToBlob(base64Str, mime) {
  const bstr = atob(base64Str);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime ?? '' });
}

/**
 * DataURL 转 Blob 或 File
 * @param {string} dataURL 带格式，形如 data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA
 * @param {string} [fileName] 文件名
 * @returns {Blob | File}
 */
function dataURLtoBlobOrFile(dataURL, fileName) {
  const [head, tail] = dataURL.split(',');
  const [mime] = head.match(/:(.*?);/);
  const ext = mime.split('/')[1];
  const bstr = atob(tail);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  if (!fileName) {
    return new Blob([u8arr], { type: mime });
  }

  return new File([u8arr], `${fileName}.${ext}`, { type: mime });
}

/**
 * DataURL 转 Blob
 * @param {string} dataURL 带格式，形如 data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA
 * @returns {Blob}
 */
export function dataURLtoBlob(dataURL) {
  return dataURLtoBlobOrFile(dataURL);
}

/**
 * DataURL 转 File
 * @param {string} dataURL 带格式，形如 data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA
 * @param {string} [fileName] 文件名
 * @returns {File}
 */
export function dataURLtoFile(dataURL, fileName) {
  if (!fileName) {
    fileName = `file-${+new Date()}`;
  }

  // @ts-ignore
  return dataURLtoBlobOrFile(dataURL, fileName);
}

/**
 * 读取 File 或 Blob 为 DataURL
 * @param {File | Blob} file input 的 type 为 file 时拿到的
 * @returns {PromiseLike<string>}
 */
export function fileToDataURL(file) {
  return new Promise((resolve) => {
    const fr = new FileReader();
    // @ts-ignore
    fr.onload = (e) => resolve(e.target.result);
    fr.readAsDataURL(file);
  });
}

/**
 * 文件转为字节数组 (其他语言的 Byte[] 类型)
 * @param {File} file input 框获得的 File 对象
 * @returns {Promise<number[]>}
 */
export async function fileToUint8Array(file) {
  const arrayBuffer = await fileToArrayBuffer(file);
  const bytes = new Uint8Array(arrayBuffer);
  const byteArr = [];
  for (var i = 0; i < bytes.length; i++) {
    byteArr.push(bytes[i]);
  }
  return byteArr;
}
