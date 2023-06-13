/**
 * @name calculateDataVolume
 * @description calculates the data volume of an object
 * @param obj the object to calculate the data volume of
 * @returns the data volume of the object
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * const dataVolume = calculateDataVolume(obj);
 * console.info(dataVolume);
 * // => 13
 */
export const calculateDataVolume = (obj: unknown) => {
  if (!obj) return 0;
  return new TextEncoder().encode(JSON.stringify(obj)).length;
};

/**
 * @name FIRESTORE_LIMIT
 * @description the maximum size of an object allowed by firestore
 * @type {number}
 * @see https://cloud.google.com/datastore/docs/concepts/limits
 */
export const FIRESTORE_LIMIT = 1048487;

/**
 * @name isDataVolumeTooLargeForFirestore
 * @description checks to see if the data volume of an object exceeds the maximum size allowed by firestore
 * @param {unknown} obj the object to check
 * @param {number} multiplier reduces the possible maximum of the object by multipling its size against it (e.g. 0.5 would reduce the maximum size by half)
 * @returns {boolean} true if the data volume of the object exceeds the maximum size allowed by firestore, otherwise false
 *
 * @todo this functions should be colocated with the firestore package
 */
export const isDataVolumeTooLargeForFirestore = (
  obj: unknown,
  multiplier?: number
): boolean => {
  multiplier = multiplier ?? 1;
  const size = calculateDataVolume(obj) * multiplier;
  const isTooBig = size > FIRESTORE_LIMIT;
  // log if we've encountered a data volume exceeding our limit
  if (isTooBig) {
    console.warn(
      `Data volume too large for firestore ${size}. Data will be truncated.`
    );
  }
  return isTooBig;
};

/**
 * @name convertToKilobytes
 * @description converts a number of bytes to kilobytes
 * @param {number} bytes the number of bytes to convert
 * @returns {number} the number of kilobytes
 *
 * @example
 * const kilobytes = convertToKilobytes(1000);
 * console.info(kilobytes);
 * // => 1
 */
export const convertToKilobytes = (bytes: number): number => {
  // covert bytes to kilobytes
  return bytes / 1000;
};
