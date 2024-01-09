import { round } from '@worksheets/util/numbers';

/**
 * @name printBytes
 * @description prints a shortened string of the bytes provided, e.g. 1000 bytes = 1KB
 * @param bytes the number of bytes to print
 * @returns a string of the bytes provided
 * @example printBytes(1000) // 1KB
 * @example printBytes(1000000) // 1MB
 * @example printBytes(1000000000) // 1GB
 */
export function printBytes(bytes: number) {
  if (bytes >= 1000000000) {
    return `${round(bytes / 1000000000, 2)}GB`;
  }
  if (bytes >= 1000000) {
    return `${round(bytes / 1000000, 2)}MB`;
  }
  if (bytes >= 1000) {
    return `${round(bytes / 1000, 2)}KB`;
  }
  return `${bytes}B`;
}

/**
 * @name toMegabytes
 * @description converts the bytes provided to megabytes
 */

export function toMegabytes(bytes: number) {
  return bytes / 1000000;
}

/**
 * @name fromMegabytes
 * @description converts the megabytes provided to bytes
 */
export function fromMegabytes(megabytes: number) {
  return megabytes * 1000000;
}

export enum FileTypes {
  ZIP = 'application/zip',
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
}

export const isZip = (file: File) => file.type === FileTypes.ZIP;

export const isImage = (file: File) => {
  const { type } = file;
  return (
    type === FileTypes.PNG || type === FileTypes.JPEG || type === FileTypes.JPG
  );
};
