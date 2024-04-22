import * as crypto from 'crypto';

export const randomUUID = () => {
  return crypto.randomUUID();
};
