import { reapRateLimits } from './reap';
import { isEmpty } from './check';
import { throttle } from './throttle';

export const limits = {
  throttle,
  isEmpty,
  reap: reapRateLimits,
};
