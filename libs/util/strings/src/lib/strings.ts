export function maskStringExceptLastN(input: string, n: number): string {
  if (!input) return input;
  if (input.length < n) return input;
  const maskedLength = input.length - n;
  const maskedString = '*'.repeat(maskedLength);
  const lastFiveCharacters = input.slice(-n);
  return maskedString + lastFiveCharacters;
}

export function maskStringExceptLastFive(input: string): string {
  return maskStringExceptLastN(input, 5);
}
