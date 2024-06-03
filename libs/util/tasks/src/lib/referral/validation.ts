import { TRPCError } from '@trpc/server';

export const validateReferralInput = (opts: {
  existing: unknown;
  input: unknown;
}) => {
  const { existing, input } = opts;

  if (!existing || typeof existing !== 'object' || !Array.isArray(existing)) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid existing input',
      cause: existing,
    });
  }
  if (!input || typeof input !== 'string') {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid input',
      cause: input,
    });
  }

  // check if input is already in existing
  if (existing.includes(input)) {
    console.debug('Referral input already exists', { existing, input });
    return { state: existing, skip: true };
  }

  // return merged state
  return { state: [...existing, input], skip: false };
};
