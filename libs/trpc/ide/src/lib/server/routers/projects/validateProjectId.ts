import { z } from '@worksheets/zod';
import { privateProcedure } from '../../procedures';
import { isProjectIdGloballyUnique } from '@worksheets/feat-project-management';

export default privateProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(
    z.object({
      valid: z.boolean(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    return { valid: await isProjectIdGloballyUnique({ projectId: input.id }) };
  });
