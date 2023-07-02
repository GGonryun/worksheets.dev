import { getRateLimits } from './get-rate-limits';

// returns false if requesting the quantity will put us over the limit
export const isEmpty = async (opts: { id: string; meta: string }) => {
  const limits = await getRateLimits(opts.id, opts.meta);

  return limits.quantity <= 0;
};
