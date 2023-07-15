import { TRPCError } from '@trpc/server';
import { newMethodExecutionsDatabase } from '@worksheets/data-access/method-executions';
import { logger } from '@worksheets/feat/logging';

const db = newMethodExecutionsDatabase();

export const deleteExecution = async (opts: {
  userId: string;
  executionId: string;
}) => {
  const id = opts.executionId;
  if (await db.has(id)) {
    const execution = await db.get(id);

    if (execution.uid !== opts.userId) {
      logger.warn("User tried to delete someone else's execution", {
        userId: opts.userId,
        executionId: opts.executionId,
      });

      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Execution ${id} not found`,
      });
    }
    return await db.delete(id);
  }

  throw new TRPCError({
    code: 'NOT_FOUND',
    message: `Execution ${id} not found`,
  });
};
