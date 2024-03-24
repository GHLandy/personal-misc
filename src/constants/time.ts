/** 一秒钟包含的毫秒数 */
export const secondMilliseconds = 1000;

/** 一分钟包含的毫秒数 */
export const minuteMilliseconds = secondMilliseconds * 60;

/** 一小时包含的毫秒数 */
export const hourMilliseconds = minuteMilliseconds * 60;

/** 一天包含的毫秒数 */
export const dayMilliseconds = hourMilliseconds * 24;

/** 一分钟包含的秒数 */
export const minuteSeconds = 60;

/** 一小时包含的秒数 */
export const hourSeconds = minuteSeconds * 60;

/** 一天包含的秒数 */
export const daySeconds = hourSeconds * 24;

/** dayjs 日期格式，形如 2022-12-26 */
export const DateFormatStr = 'YYYY-MM-DD';

/** dayjs 时间格式，形如 08:10:00 */
export const TimeFormatStr = 'HH:mm:ss';

/** dayjs 日期时间格式，形如 2022-12-26 08:10:00 */
export const DateTimeFormatStr = `${DateFormatStr} ${TimeFormatStr}`;
