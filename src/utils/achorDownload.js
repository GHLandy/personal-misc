/**
 * @param {Blob} blob 需要下载得 Blob (通过接口拿到 Blob)
 * @param {string} fileName 下载保存时候的文件名称
 */
export function commonDownload(blob, fileName) {
  const objURL = window.URL.createObjectURL(blob);
  const achorElement = document.createElement('a');
  achorElement.href = objURL;
  achorElement.setAttribute('download', fileName);
  achorElement.click();
  achorElement.remove();
  window.URL.revokeObjectURL(objURL);
}
