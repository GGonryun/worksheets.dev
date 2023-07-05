/**
 * @name randomBetween
 * @param min the minimum value exclusive
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
  return Math.min(Math.round((current / max) * 100), 100);
}
