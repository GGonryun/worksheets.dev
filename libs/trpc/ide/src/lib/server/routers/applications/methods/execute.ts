import { executeMethod } from '@worksheets/feat/task-processing';
import {
  callMethodRequestSchema,
  callMethodResponseSchema,
} from '@worksheets/schemas-applications';
import { privateProcedure } from '../../../procedures';

export default privateProcedure
  .input(callMethodRequestSchema)
  .output(callMethodResponseSchema)
  .mutation(
    async ({
      input: { path, input, connection },
      ctx: {
        user: { uid: userId },
      },
    }) => {
      return executeMethod({
        path,
        userId,
        input,
        connectionId: connection,
      });
    }
  );
