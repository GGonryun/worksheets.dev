export function round(number: number, decimals = 2): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
  }).format(number);
}

export function formatMoney(x: number) {
  return `$${x.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function shorthandNumber(n: number): string {
  // if n is more than 1 million return 1m
  if (n >= 1000000) {
    return `${round(n / 1000000, 2)}m`;
  }
  // if n is more than 1 thousand return 1k
  if (n >= 1000) {
    return `${round(n / 1000, 2)}k`;
  }
  // else return n
  return `${n}`;
}

/**
 * Does a simple calculation to get a percentage. Does not work with negative numbers.
 * @param current
 * @param max
 * @returns A number between 0 and 100.
 */
export function calculatePercentage(current: number, max: number) {
  if (!current || !max) return 0;
  if (current < 0 || max < 0) return 0;

  return Math.round((current / max) * 100);
}

export function toPercentage(current: number, max = 1) {
  return `${calculatePercentage(current, max)}%`;
}
