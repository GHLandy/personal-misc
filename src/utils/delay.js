/**
 * 毫秒延时
 * @param millisecond 毫秒数，默认 1000 毫秒
 */
export async function delay(millisecond = 1000) {
  await new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
}
