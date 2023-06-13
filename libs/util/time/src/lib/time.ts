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
 * @name addHoursToCurrentTime
 * @description adds hours to the current time
 * @param {number} hours the number of hours to add
 */
export function addHoursToCurrentTime(
  hours: number,
  currentTime = new Date()
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
  currentTime = new Date()
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
  const hours = Math.floor(offset / hoursToMs);
  const minutes = Math.floor((offset % hoursToMs) / minutesToMs);
  const seconds = Math.floor((offset % minutesToMs) / secondsToMs);
  return { hours, minutes, seconds };
};

/**
 * @name printDuration
 * @description prints the number of hours, minutes and seconds remaining.
 * @param {Duration} duration the duration to print
 * @returns {string} in HH:MM:SS.MMMM format
 */
export const printDuration = ({
  hours,
  minutes,
  seconds,
}: Duration): string => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
