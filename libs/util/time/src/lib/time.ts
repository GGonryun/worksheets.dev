export function isExpired(
  timestamp: number,
  against: number = new Date().getTime()
) {
  return against > timestamp;
}
