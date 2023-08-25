import { upsertUserConnection } from '@worksheets/feat/app-connections';
import { privateProcedure } from '../../procedures';
import { z } from '@worksheets/zod';

const upsertConnectionRequestSchema = z.object({
  appId: z.string(),
  connectionId: z
    .string()
    .optional()
    .describe('providing a connection id turns the request into an update'),
  data: z.record(z.string()),
});

const upsertConnectionResponseSchema = z.object({
  connectionId: z.string(),
});

export default privateProcedure
  .input(upsertConnectionRequestSchema)
  .output(upsertConnectionResponseSchema)
  .mutation(async ({ input, ctx }) => {
    return {
      connectionId: await upsertUserConnection({
        appId: input.appId,
        connectionId: input.connectionId,
        userId: ctx.user.uid,
        data: input.data,
      }),
    };
  });
