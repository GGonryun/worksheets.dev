import { Ratelimit } from '@upstash/ratelimit';
import { createClient } from '@worksheets/services/kv';

export default {
  web: new Ratelimit({
    redis: createClient(),
    limiter: Ratelimit.slidingWindow(5, '5 s'),
    timeout: 1000,
    prefix: 'ratelimit:web',
  }),
  api: new Ratelimit({
    redis: createClient(),
    limiter: Ratelimit.slidingWindow(100, '10 s'),
    timeout: 1000,
    prefix: 'ratelimit:api',
  }),
  uploads: new Ratelimit({
    redis: createClient(),
    limiter: Ratelimit.slidingWindow(20, '60 m'),
    prefix: 'ratelimit:uploads',
  }),
};
