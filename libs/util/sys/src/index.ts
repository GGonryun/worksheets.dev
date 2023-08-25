/**
 * @description: Wait for the specified time
 * @param {number} seconds
 * @return {*}
 * @remark 1s = 1000ms
 * @remark uses setTimeout
 * @example waitSeconds(1).then(() => console.log('1s'))
 */
export const waitSeconds = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

/**
 * @description: Checks if the last bit of the last character of a string
 * @param {string} str
 * @return {boolean} true if the last bit of the last character is 1
 */
export const isLastBitOne = (str: string) => {
  if (!str) return false;
  const lastChar = str[str.length - 1];
  const lastCharCode = lastChar.charCodeAt(0);
  const lastBit = lastCharCode & 1;
  return lastBit === 1;
};
