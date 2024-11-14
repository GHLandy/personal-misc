/**
 * a 标签下载，需要响应头 Content-Type 为 application/octet-stream 才能下载
 * @param {string} url 需要下载的 url
 * @param {string} fileName 下载保存时候的文件名称
 */
export function achorDownload(url, fileName) {
  const achorElement = document.createElement('a');

  achorElement.href = url;
  achorElement.setAttribute('download', fileName);
  achorElement.click();
  achorElement.remove();
}
