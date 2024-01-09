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

export function uppercase(string: string) {
  return string.toUpperCase();
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

// TODO: update with zod email validation
export function isEmail(string: string): boolean {
  if (!string) return false;
  if (typeof string !== 'string') return false;
  if (string.includes(' ')) return false;
  // if string doesn't have an @ symbol, it's not an email
  if (!string.includes('@')) return false;
  // if string doesn't have a . somewhere, it's not an email
  if (!string.includes('.')) return false;

  return true;
}

export const validateUrl = (url: string | undefined): string | undefined => {
  if (url == null) {
    return undefined;
  }

  try {
    new URL(url);
  } catch (e) {
    return 'Must specify a valid URL starting with https://';
  }

  // url must start with https://
  if (!url.startsWith('https://')) {
    return 'URL must start with https://';
  }

  return undefined;
};

// does not support port numbers or localhost or http
export const validateHttpsUrl = (url: string | undefined): boolean => {
  const regex =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  return regex.test(url ?? '');
};
