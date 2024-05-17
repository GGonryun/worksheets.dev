import { TaskFrequency, TaskProgress, TaskStatus } from '@worksheets/prisma';
import { isExpired } from '@worksheets/util/time';

export const parseStatus = (
  frequency: TaskFrequency,
  state: TaskProgress | undefined | null
): TaskStatus => {
  if (!state) {
    return 'PENDING';
  }

  if (frequency === 'ONCE' && state.status === 'COMPLETED') {
    return 'COMPLETED';
  }

  if (!state.expiresAt) {
    return frequency === 'INFINITE' ? 'ACTIVE' : 'PENDING';
  }

  if (isExpired(state.expiresAt.getTime())) {
    return 'ACTIVE';
  }

  return state.status;
};
