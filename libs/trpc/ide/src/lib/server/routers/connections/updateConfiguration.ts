import { updateUserConnectionConfiguration } from '@worksheets/feat/app-connections';
import { privateProcedure } from '../../procedures';
import { z } from '@worksheets/zod';

const updateConfigurationRequestSchema = z.object({
  connectionId: z.string(),
  details: z.object({
    name: z.string(),
    enabled: z.boolean(),
  }),
});

const updateConfigurationResponseSchema = z.object({
  ok: z.boolean(),
  errors: z.record(z.string()),
});

export default privateProcedure
  .input(updateConfigurationRequestSchema)
  .output(updateConfigurationResponseSchema)
  .mutation(async ({ input }) => {
    return await updateUserConnectionConfiguration(input);
  });
