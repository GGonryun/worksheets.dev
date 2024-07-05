import { TaskFrequency } from '@worksheets/prisma';
import {
  nextFirstOfMonthUtcMidnight,
  nextSundayUtcMidnight,
  nextUtcMidnight,
} from '@worksheets/util/time';

export const parseExpiration = (frequency: TaskFrequency): Date | null => {
  switch (frequency) {
    case 'DAILY':
      return nextUtcMidnight();
    case 'WEEKLY':
      return nextSundayUtcMidnight();
    case 'MONTHLY':
      return nextFirstOfMonthUtcMidnight();
    case 'ONCE':
    case 'INFINITE':
      return null;
  }
};

export const calculateCompletions = (
  current: number,
  increment: number,
  max: number,
  interval: number
) => {
  console.debug(
    `Calculating completions. Current: ${current}, Increment: ${increment}, Max:${max}, Interval: ${interval}`
  );
  const newTotal = Math.min(current + increment, max);
  const oldTotal = current;
  const newCompletions = Math.floor(newTotal / interval);
  const oldCompletions = Math.floor(oldTotal / interval);
  return newCompletions - oldCompletions;
};
