import { TRPCError } from '@trpc/server';
import { Prisma } from '@worksheets/prisma';

export const validateFriendInput = (opts: {
  state: unknown;
  progress: Prisma.TaskProgressGetPayload<true> | undefined;
}) => {
  // check to see if state is a non-empty string.
  if (typeof opts.state !== 'string' || !opts.state.trim()) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Invalid friend code.',
      cause: opts,
    });
  }

  if (!opts.progress) {
    return { state: [opts.state], skip: false };
  }

  if (
    typeof opts.progress.state === 'object' &&
    Array.isArray(opts.progress.state)
  ) {
    if (opts.progress.state.includes(opts.state)) {
      return { state: opts.progress.state, skip: true };
    } else {
      return { state: [opts.state, ...opts.progress.state], skip: false };
    }
  }

  // if the type of progress.state is incorrect, then it's probably empty and needs to be initialized with our value.
  return { state: [opts.state], skip: false };
};
