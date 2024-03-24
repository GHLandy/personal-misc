/**
 * 毫秒延时
 * @param millisecond 毫秒数，默认 1000 毫秒
 */
export async function msDelay(millisecond = 1000) {
  await new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
}

/**
 * 秒延时
 * @param second 秒数，默认 1 秒
 */
export async function secDelay(second = 1) {
  await msDelay(second * 1000);
}
