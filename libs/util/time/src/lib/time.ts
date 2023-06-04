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
