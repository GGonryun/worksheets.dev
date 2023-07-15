import { privateProcedure } from '../../../procedures';
import { deleteExecution } from '@worksheets/feat-method-execution';
import {
  deleteMethodExecutionRequestSchema,
  deleteMethodExecutionResponseSchema,
} from '@worksheets/schemas-executions';

export default privateProcedure
  .input(deleteMethodExecutionRequestSchema)
  .output(deleteMethodExecutionResponseSchema)
  .mutation(async ({ input, ctx }) => {
    await deleteExecution({ userId: ctx.user.uid, ...input });
    return true;
  });
