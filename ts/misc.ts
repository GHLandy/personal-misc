/**
 * 毫秒延时
 * @param millisecond 毫秒数，默认 1000 毫秒
 */
export async function delay(millisecond = 1000) {
  await new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
}

/**
 * 计算哈希值 (sha1, sha256, sha384, sha512)
 * @returns
 */
export async function computeBufferHash(
  buffer: ArrayBuffer,
  algorithm: 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512' = 'SHA-256',
) {
  const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * 计算文件得哈希值 (sha1, sha256, sha384, sha512)
 */
export async function computeFileHash(
  file: File,
  algorithm: 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512' = 'SHA-256',
) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = async function (e) {
      const fileContent = e.target!.result as ArrayBuffer;
      const buffer = new Uint8Array(fileContent);
      const hash = await computeBufferHash(buffer, algorithm);
      resolve(hash);
    };
    reader.readAsArrayBuffer(file);
  });
}
