export function isExpired(
  timestamp: number,
  against: number = new Date().getTime()
) {
  return against > timestamp;
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
