import { z } from '@worksheets/zod';
import { privateProcedure } from '../../procedures';
import { testConnectionProperties } from '@worksheets/feat/app-connections';

const testConnectionInputSchema = z.object({
  appId: z.string(),
  data: z.record(z.any()),
});

const testConnectionOutputSchema = z.object({
  ok: z.boolean(),
  errors: z.record(z.string()).describe('Errors by field key'),
});

export default privateProcedure
  .input(testConnectionInputSchema)
  .output(testConnectionOutputSchema)
  .mutation(async ({ input }) => {
    const results = await testConnectionProperties({
      appId: input.appId,
      data: input.data,
    });
    console.log('results', results);

    return {
      ok: Object.values(results.errors ?? {}).filter(Boolean).length === 0,
      // compiler doesn't like direct references to errors because it's an object
      errors: { ...(results.errors ?? {}) },
    };
  });
