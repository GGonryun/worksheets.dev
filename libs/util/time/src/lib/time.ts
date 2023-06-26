export function isExpired(
  timestamp: number,
  against: number = new Date().getTime()
) {
  return against > timestamp;
}

export function convertMillisecondsToSeconds(milliseconds: number): number {
  return Math.round(milliseconds / 1000);
}

export function expireAfter({
  minutes = 0,
  hours = 0,
  days = 0,
}: {
  minutes?: number;
  hours?: number;
  days?: number;
}): number {
  const minutesToMs = 60000;
  let offset = 0;

  offset += minutes * minutesToMs;
  offset += hours * 60 * minutesToMs;
  offset += days * 24 * 60 * minutesToMs;

  return Date.now() + offset;
}

/**
 * @name dateFromTimestamp
 * @description converts a timestamp to a date
 * @param {number} timestamp the timestamp to convert
 * @returns {Date} the date
 */
export const dateFromTimestamp = (timestamp: number): Date => {
  return new Date(timestamp);
};

/**
 * @name addDurationToCurrentTime
 * @description adds a duration to the current time
 * @param {Duration} duration the duration to add
 * @param {Date} currentTime the current time to check against useful if testing and we need to set a fixed time.
 * @returns {Date} the new time
 * @example
 * const now = new Date();
 * const duration = { hours: 1, minutes: 2, seconds: 3 };
 * const newTime = addDurationToCurrentTime(duration, now);
 * console.info(newTime);
 * // 2021-03-04T14:02:03.000Z
 */
export const addDurationToCurrentTime = (
  duration: Duration,
  currentTime: Date = new Date()
): Date => {
  const newTime = addHoursToCurrentTime(duration.hours, currentTime);
  const newTime2 = addMinutesToCurrentTime(duration.minutes, newTime);
  const newTime3 = addSecondsToCurrentTime(duration.seconds, newTime2);
  return newTime3;
};

/**
 * @name addDaysToCurrentTime
 * @description adds days to the current time
 * @param {number} days the number of days to add
 * @param {Date} currentTime the current time to check against useful if testing and we need to set a fixed time.
 */
export function addDaysToCurrentTime(
  days: number,
  currentTime: Date = new Date()
): Date {
  const newTime: Date = new Date(currentTime.getTime() + days * 86400000);
  return newTime;
}

/**
 * @name addHoursToCurrentTime
 * @description adds hours to the current time
 * @param {number} hours the number of hours to add
 * @param {Date} currentTime the current time to check against useful if testing and we need to set a fixed time.
 */
export function addHoursToCurrentTime(
  hours: number,
  currentTime: Date = new Date()
): Date {
  const newTime: Date = new Date(currentTime.getTime() + hours * 3600000);
  return newTime;
}

export function addMinutesToCurrentTime(
  minutes: number,
  currentTime = new Date()
): Date {
  const newTime: Date = new Date(currentTime.getTime() + minutes * 60000);
  return newTime;
}

export function addSecondsToCurrentTime(
  seconds: number,
  currentTime = new Date()
): Date {
  const newTime = new Date(currentTime.getTime() + seconds * 1000);
  return newTime;
}

/**
 * @name waitFor
 * @definition used to wait for a specified amount of time before continuing execution, calculated in milliseconds.
 * @params {number} wait - the amount of time to wait in milliseconds.
 * @returns {Promise<void>} a promise that resolves when the wait is complete.
 */
export const waitFor = (wait: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, wait));
};

/**
 * @name withinMinutes
 * @description checks if a timestamp is within a specified number of minutes
 * @param {number} timestamp the timestamp to check
 * @param {number} minutes the number of minutes to check against
 * @param {Date} currentTime the current time to check against useful if testing and we need to set a fixed time.
 */
export const withinMinutes = (
  timestamp: number,
  minutes: number,
  currentTime: Date = new Date()
): boolean => {
  const minutesToMs = 60000;
  const offset = minutes * minutesToMs;
  return timestamp - offset < currentTime.getTime();
};

/**
 * @name secondsRemaining
 * @description calculates the number of seconds remaining in a timestamp
 * @param {number} timestamp the timestamp to check
 * @param {Date} currentTime the current time to check against useful if testing and we need to set a fixed time.
 * @returns {number} the number of seconds remaining in the timestamp
 */
export const secondsRemaining = (
  timestamp: number,
  currentTime: Date = new Date()
): number => {
  const secondsToMs = 1000;
  const offset = timestamp - currentTime.getTime();
  return Math.floor(offset / secondsToMs);
};

export type Duration = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * @name durationRemaining
 * @description calculates the number of hours, minutes and seconds remaining in a timestamp
 * @param {number} timestamp the timestamp to check
 * @param {Date} currentTime the current time to check against useful if testing and we need to set a fixed time.
 * @returns {object} the number of hours, minutes and seconds remaining in the timestamp
 *
 * @example
 * const now = new Date();
 * const timestamp = addMinutesToCurrentTime(3, now).getTime();
 * const remaining = durationRemaining(timestamp, now);
 * console.info(remaining);
 * // { hours: 0, minutes: 2, seconds: 59 }
 */
export const durationRemaining = (
  timestamp: number,
  currentTime: Date = new Date()
): Duration => {
  const secondsToMs = 1000;
  const minutesToMs = 60000;
  const hoursToMs = 3600000;
  const offset = timestamp - currentTime.getTime();
  const days = Math.floor(offset / (hoursToMs * 24));
  const hours = Math.floor((offset % (hoursToMs * 24)) / hoursToMs);
  const minutes = Math.floor((offset % hoursToMs) / minutesToMs);
  const seconds = Math.floor((offset % minutesToMs) / secondsToMs);
  return { days, hours, minutes, seconds };
};

/**
 * @name printDuration
 * @description prints the number of hours, minutes and seconds remaining.
 * @param {Duration} duration the duration to print
 * @returns {string} in HH:MM:SS.MMMM format
 */
export const printDuration = ({
  days,
  hours,
  minutes,
  seconds,
}: Duration): string => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

/**
 * @name printCountdownDuration
 * @description returns a human readable string of the duration remaining
 * @param {Duration} duration the duration to print
 */
export const printCountdownDuration = ({
  days,
  hours,
  minutes,
  seconds,
}: Duration) => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const daysString = days > 0 ? `${days}d ` : '';
  const hoursString = hours > 0 ? `${hours}h ` : '';
  const minutesString = minutes > 0 ? `${minutes}m ` : '';
  const secondsString = `${pad(seconds)}s`;
  return `${daysString}${hoursString}${minutesString}${secondsString}`;
};

/**
 * @name durationFromSeconds
 */
export const durationFromSeconds = (seconds: number): Duration => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return { days, hours, minutes, seconds: remainingSeconds };
};
/**
 * a function that converts a millisecond unix timestamp to a string format like 6/15/23, 8:02 PM
 * @param timestamp a millisecond unix timestamp
 * @returns a string format of MM/DD/YY, HH:MM AM/PM
 */
export const formatTimestamp = (timestamp: number = Date.now()) => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear() % 100;
  const hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour < 12 ? 'AM' : 'PM';
  const hour12 = hour % 12;
  const hourString = hour12 === 0 ? '12' : hour12.toString();
  const minuteString = minute < 10 ? `0${minute}` : minute.toString();

  return `${month}/${day}/${year}, ${hourString}:${minuteString} ${ampm}`;
};

/**
 * a function that converts millisecond unix timestamp to a string format Jun 15, 2023, 8:47:51 PM
 * @param timestamp a millisecond unix timestamp
 * @returns a string format of MMM DD, YYYY, HH:MM:SS AM/PM
 */
export const formatTimestampLong = (timestamp?: number) => {
  if (!timestamp) return 'Invalid Date';
  const date = new Date(timestamp);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const ampm = hour < 12 ? 'AM' : 'PM';
  const hour12 = hour % 12;
  const hourString = hour12 === 0 ? '12' : hour12.toString();
  const minuteString = minute < 10 ? `0${minute}` : minute.toString();
  const secondString = second < 10 ? `0${second}` : second.toString();

  return `${month} ${day}, ${year}, ${hourString}:${minuteString}:${secondString} ${ampm}`;
};

/**
 * gets a date's utc timestamp in milliseconds
 */
export const getCurrentHourInMilliseconds = (
  timestamp: number = Date.now()
) => {
  const date = new Date(timestamp);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};

/**
 * print millseconds as a user friendly duration
 */
export const prettyPrintMilliseconds = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const hoursString = hours > 0 ? `${hours}h ` : '';
  const minutesString = minutes > 0 ? `${minutes}m ` : '';
  const secondsString = seconds > 0 ? `${seconds % 60}s ` : '';
  const millisecondsString = minutes < 1 ? `${milliseconds % 1000}ms ` : '';

  return `${hoursString}${minutesString}${secondsString}${millisecondsString}`;
};
