/**
 * @name randomBetween
 * @param min the minimum value inclusive
 * @param max the maximum value inclusive
 * @returns a random number between the min and max values provided
 */
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function round(number: number, decimals = 2) {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
  }).format(number);
}

export function calculatePercentage(current?: number, max?: number) {
  if (!current || !max) return 0;
  if (current > max) return 0;
  if (current < 0 || max < 0) return 0;

  return Math.min(Math.round((current / max) * 100), 100);
}

export function toPercentage(current?: number, max?: number) {
  return `${calculatePercentage(current, max)}%`;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function isOdd(value: number) {
  return value % 2 !== 0;
}

export function isEven(value: number) {
  return value % 2 === 0;
}

export function isPositive(value: number) {
  return value >= 0;
}

export function isNegative(value: number) {
  return value < 0;
}
