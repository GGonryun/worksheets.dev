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

export function escapeNewLines(string: string) {
  return string.replace(/\\n/g, '\n');
}

// upper case the first letter of a string
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function reverseString(string: string) {
  return string.split('').reverse().join('');
}

// remove all non-alphanumeric characters
export function cleanseAlphaNumeric(string: string) {
  return string.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * @description adds commas to large numbers over 1000
 * @param {number} number
 * @returns {string}
 */
export function addCommasToNumber(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * @description replace spaces with any character
 * @param {string} string
 */
export function replaceSpaces(string: string, character: string): string {
  return string.replace(/\s/g, character);
}
