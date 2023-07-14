import { createTask } from '@worksheets/feat/task-processing';
import { v4 as uuidv4 } from 'uuid';
import { findWorksheetByNameOrIdentifier } from '@worksheets/feat/worksheets-management';
import { privateProcedure } from '../../procedures';
import {
  executeUserWorksheetRequestSchema,
  executeWorksheetResponseSchema,
} from '@worksheets/schemas-worksheets';

export default privateProcedure
  .meta({
    openapi: {
      protect: true,
      enabled: false,
      method: 'POST',
      path: '/worksheets/{identifier}/execute',
      summary: 'Execute a worksheet',
      tags: ['worksheets', 'executions'],
    },
  })
  .input(executeUserWorksheetRequestSchema)
  .output(executeWorksheetResponseSchema)
  .mutation(
    async ({ ctx: { user }, input: { identifier, input, overrides } }) => {
      const worksheet = await findWorksheetByNameOrIdentifier(
        user.uid,
        identifier
      );

      return await createTask(uuidv4(), worksheet.id, input, {
        verbosity: overrides?.verbosity,
        timeout: overrides?.timeout,
      });
    }
  );
