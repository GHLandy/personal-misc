/**
 * Blob 读取为 ArrayBuffer
 * @param {Blob} blob 需要读取的东西
 * @returns {Promise<ArrayBuffer>}
 */
export function readAsArrayBuffer(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsArrayBuffer(blob);
  });
}

/**
 * Blob 读取为 ArrayBuffer
 * @param {Blob} blob 需要读取的东西
 * @returns {Promise<string>}
 */
export function readAsDataURL(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(blob);
  });
}

/**
 * Blob 读取为 Text
 * @param {Blob} blob 需要读取的东西
 * @returns {Promise<string>}
 */
export function readAsText(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsText(blob);
  });
}
