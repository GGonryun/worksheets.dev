// returns data volume in bytes, convert to KB by dividing by 1000
export const calculateDataVolume = (obj: unknown) => {
  if (!obj) return 0;
  return new TextEncoder().encode(JSON.stringify(obj)).length;
};

export const BYTES_IN_KILOBYTE = 1000;

// converts a number to kilobytes in bytes
export const kilobytes = (number: number) => {
  return number * BYTES_IN_KILOBYTE;
};
