import { Prisma, TaskFrequency, TaskProgress } from '@worksheets/prisma';
import { assertNever } from '@worksheets/util/errors';
import { daysFromNow, isExpired } from '@worksheets/util/time';

export const parseExpiration = (progress: TaskProgress | null): number => {
  if (!progress || !progress.expiresAt || isExpired(progress.expiresAt)) {
    return -1;
  }

  return progress.expiresAt.getTime();
};

export const setExpirationDate = (
  task: Prisma.TaskGetPayload<true>,
  progress: Prisma.TaskProgressGetPayload<true> | undefined
): Date | null | undefined => {
  // we set an expiration date if the quest does not exist
  if (!progress) {
    return createExpirationDate(task.frequency);
  }
  // or if the quest is resetting because it is expired
  if (isExpired(progress.expiresAt)) {
    return createExpirationDate(task.frequency);
  }
  // otherwise, we return the existing expiration date
  return progress.expiresAt;
};

export const createExpirationDate = (
  frequency: TaskFrequency
): Date | undefined => {
  switch (frequency) {
    case TaskFrequency.DAILY:
      return daysFromNow(1);
    case TaskFrequency.WEEKLY:
      return daysFromNow(7);
    case TaskFrequency.MONTHLY:
      return daysFromNow(30);
    case TaskFrequency.INFINITE:
    case TaskFrequency.ONCE:
      return undefined;
    default:
      throw assertNever(frequency);
  }
};

export const calculateCompletions = (
  current: number,
  increment: number,
  max: number,
  interval: number
) => {
  console.log('Calculating completions', { current, increment, max, interval });
  const newTotal = Math.min(current + increment, max);
  const oldTotal = current;
  const newCompletions = Math.floor(newTotal / interval);
  const oldCompletions = Math.floor(oldTotal / interval);
  return newCompletions - oldCompletions;
};
