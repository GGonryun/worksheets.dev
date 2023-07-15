import {
  listMethodExecutionsRequestSchema,
  listMethodExecutionsResponseSchema,
} from '@worksheets/schemas-executions';
import { privateProcedure } from '../../../procedures';
import { listMethodExecutions } from '@worksheets/feat-method-execution';

export default privateProcedure
  .input(listMethodExecutionsRequestSchema)
  .output(listMethodExecutionsResponseSchema)
  .query(async ({ input, ctx }) => {
    return await listMethodExecutions({ ...input, userId: ctx.user.uid });
  });
