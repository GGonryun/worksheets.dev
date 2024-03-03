/**
 * Checks if a given timestamp is in the past.
 */
export const isPast = (timestamp: number): boolean => {
  return timestamp < Date.now();
};

export const currentYear = new Date().getFullYear();

/**
 * Create a timestamp in milliseconds relative to UTC time from a specific date, month, year, hour, minute, and second, and millisecond.
 */
export function createTimestamp(
  year: number,
  month: number,
  date: number,
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0
) {
  return Date.UTC(year, month - 1, date, hour, minute, second, millisecond);
}

export function convertMillisecondsToSeconds(milliseconds: number): number {
  return Math.round(milliseconds / 1000);
}

export function convertSecondsToMilliseconds(seconds: number): number {
  return seconds * 1000;
}

export const minutesFromNow = (minutes: number) =>
  new Date(Date.now() + 60000 * minutes);
export const hoursFromNow = (hours: number) =>
  new Date(Date.now() + 3600000 * hours);
export const daysFromNow = (days: number) =>
  new Date(Date.now() + 86400000 * days);
export const weeksFromNow = (weeks: number) =>
  new Date(Date.now() + 604800000 * weeks);
export const monthsFromNow = (months: number) =>
  new Date(Date.now() + 2629800000 * months);

export const minutesAgo = (minutes: number) =>
  new Date(Date.now() - 60000 * minutes);
export const hoursAgo = (hours: number) =>
  new Date(Date.now() - 3600000 * hours);
export const daysAgo = (days: number) => new Date(Date.now() - 86400000 * days);
export const weeksAgo = (weeks: number) =>
  new Date(Date.now() - 604800000 * weeks);
export const monthsAgo = (months: number) =>
  new Date(Date.now() - 2629800000 * months);

export const printDate = (stamp: string | Date | number, locale = 'en-US') => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const date = new Date(stamp);

  return date.toLocaleDateString(locale, options);
};

/**
 * @name printRelativeDate
 * @description prints a relative date like "2 days ago at 2:30 PM"
 * @param stamp the date to print
 * @param locale the locale to print in
 * @returns a string of the relative date
 * @example printRelativeDate(new Date()) // "Today at 2:30 PM"
 * @example printRelativeDate(new Date(Date.now() - 86400000)) // "Yesterday at 2:30 PM"
 * @example printRelativeDate(new Date(Date.now() - 86400000 * 2)) // "2 days ago at 2:30 PM"
 * @example printRelativeDate(new Date(Date.now() - 86400000 * 7)) // "Last week at 2:30 PM"
 * @example printRelativeDate(new Date(Date.now() - 86400000 * 7 * 2)) // "2 weeks ago at 2:30 PM"
 * @example printRelativeDate(new Date(Date.now() - 86400000 * 30)) // "Last month at 2:30 PM"
 * @example printRelativeDate(new Date(Date.now() - 86400000 * 30 * 2)) // "2 months ago at 2:30 PM"
 * @example printRelativeDate(new Date(Date.now() - 86400000 * 365)) // "Last year at 2:30 PM"
 *
 * @todo we're currently estimating months as 30 days and years as 365 days, this is not accurate.
 */
export const printRelativeDate = ({
  stamp,
  locale = 'en-US',
  now = new Date(),
  includeTime = true,
}: {
  stamp: string | Date | number;
  locale?: string;
  now?: Date;
  includeTime?: boolean;
}) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };

  const date = new Date(stamp);

  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.round(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.round(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.round(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 7)
  );
  const diffInMonths = Math.round(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 30)
  );
  const diffInYears = Math.round(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 365)
  );

  const printTime = (text: string) =>
    includeTime
      ? `${text} at ${date.toLocaleTimeString(locale, options)}`
      : text;

  if (diffInMinutes < 60) {
    return printTime(`${diffInMinutes} minutes ago`);
  } else if (diffInHours < 24) {
    return printTime(`${diffInHours} hours ago`);
  } else if (diffInDays < 7) {
    return printTime(`${diffInDays} days ago`);
  } else if (diffInWeeks === 1) {
    return printTime(`Last week`);
  } else if (diffInWeeks < 4) {
    return printTime(`${diffInWeeks} weeks ago`);
  } else if (diffInMonths === 1) {
    return printTime(`Last month`);
  } else if (diffInMonths < 12) {
    return printTime(`${diffInMonths} months ago`);
  } else if (diffInYears === 1) {
    return printTime(`Last year`);
  } else {
    return printTime(`${diffInYears} years ago`);
  }
};

/**
 * Prints the amount of time remaining using the largest unit of time possible.
 * @param opts
 * @param locale
 * @param now
 * @example printTimeRemaining({ stamp: new Date(Date.now() + 86400000 * 2) }) // "2 days"
 * @example printTimeRemaining({ stamp: new Date(Date.now() + 86400000 * 2) }) // "2 days"
 * @example printTimeRemaining({ stamp: new Date(Date.now() + 3600000 * 2)) }) // "2 hours"
 * @example printTimeRemaining({ stamp: new Date(Date.now() + 3600000 * 1/2) }) // "30 minutes"
 */
export const printTimeRemaining = (stamp: string | number | Date) => {
  // print the largest unit of time possible
  const date = new Date(stamp);
  const now = new Date();
  const diffInMilliseconds = date.getTime() - now.getTime();
  const diffInMinutes = Math.round(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.round(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.round(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 7)
  );
  const diffInMonths = Math.round(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 30)
  );
  const diffInYears = Math.round(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 365)
  );

  if (diffInMinutes === 1) return `${diffInMinutes} min`;
  if (diffInMinutes < 60) {
    return `${diffInMinutes} mins`;
  }
  if (diffInHours < 24) {
    return `${diffInHours} hrs`;
  }
  if (diffInDays < 7) {
    return `${diffInDays} days`;
  }
  if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks`;
  }
  if (diffInMonths < 12) {
    return `${diffInMonths} months`;
  }
  if (diffInYears === 1) return `${diffInYears} year`;
  if (diffInYears > 1) return `${diffInYears} years`;
  return '0 minutes';
};

export const printShortDate = (
  stamp: number | string | Date,
  locale = 'en-US'
) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  const date = new Date(stamp);

  return date.toLocaleDateString(locale, options);
};

export const printShortDateTime = (
  stamp: number | string | Date,
  locale = 'en-US'
) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const date = new Date(stamp);

  return date.toLocaleDateString(locale, options);
};

/**
 *
 * @param stamp Stamp is a string provided in the form MM-DD-YYYY
 * @returns a date formatted as YYYY-MM-DD
 */
export const formatAmericanDate = (stamp: string) => {
  const [month, day, year] = stamp.split('-');
  return `${year}-${month}-${day}`;
};

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
 * @name timeUntil
 * @definition used to calculate the amount of time until a specified date and time.
 * @params {number} timestamp - the timestamp to calculate the amount of time until.
 * @returns {number} the amount of time in milliseconds until the specified time.
 */

export const timeUntil = (timestamp: number): number => {
  return timestamp - Date.now();
};

/**
 * @name millisecondsToDuration
 * @definition used to convert a number of milliseconds into a duration string.
 * @params {number} milliseconds - the number of milliseconds to convert.
 * @returns {string} the duration string.
 * @example millisecondsToDuration(1000) // "00:00:01"
 * @example millisecondsToDuration(1000 * 60) // "00:01:00"
 * @example millisecondsToDuration(1000 * 60 * 60) // "01:00:00"
 */
export const millisecondsToDuration = (milliseconds: number): string => {
  // count the number of hours, minutes, and seconds in the milliseconds
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
  const seconds = Math.floor(milliseconds / 1000) % 60;

  // print the hours, minutes, and seconds in the format HH:MM:SS
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export type Duration = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const millisecondsAsDuration = (milliseconds: number): Duration => {
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
  const seconds = Math.floor(milliseconds / 1000) % 60;

  return { days, hours, minutes, seconds };
};

export const getNextUTCMidnight = (): Date => {
  const nextMidnight = new Date();
  nextMidnight.setUTCHours(24, 0, 0, 0);
  return nextMidnight;
};

export const durationToString = (duration: Duration): string => {
  const { days, hours, minutes, seconds } = duration;
  if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;

  return `${seconds}s`;
};
