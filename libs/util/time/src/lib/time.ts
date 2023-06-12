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
