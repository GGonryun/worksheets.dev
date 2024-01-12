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
