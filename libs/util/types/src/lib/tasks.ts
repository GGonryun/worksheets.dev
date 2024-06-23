import { Prisma } from '@worksheets/prisma';

export type TaskProgress = Prisma.TaskProgressGetPayload<true> & {
  completions: number;
};
