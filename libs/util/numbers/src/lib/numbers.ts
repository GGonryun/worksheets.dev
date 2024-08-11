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
export function calculatePercentage(
  current: number,
  max: number,
  precision = 0
) {
  if (!current || !max) return 0;
  if (current < 0 || max < 0) return 0;

  return Number(((current / max) * 100).toFixed(precision ?? 0));
}

export function toPercentage(current: number, max = 1, precision = 0) {
  return `${calculatePercentage(current, max, precision)}%`;
}

export const isLucky = (chance: number): boolean => {
  const luck = Math.random();
  return luck <= chance;
};

export const nth = (d: number) => {
  const dString = String(d);
  const last = +dString.slice(-2);
  if (last > 3 && last < 21) return 'th';
  switch (last % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export const randomFloatBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 */
export const randomIntBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
