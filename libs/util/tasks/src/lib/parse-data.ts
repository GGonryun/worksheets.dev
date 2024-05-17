import { TaskType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { isPrismaJsonObject } from '@worksheets/util/prisma';

import { TaskData } from './types';

export const parseTaskData = <T extends TaskType>(
  _: T,
  data?: unknown
): TaskData[T] => {
  if (!isPrismaJsonObject(data)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Data is not an object',
    });
  }
  // TODO: add more validation
  return data as TaskData[T];
};
