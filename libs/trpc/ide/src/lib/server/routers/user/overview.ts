import { z } from 'zod';
import { Severity, protectedProcedure } from '../../trpc';
import { userOverviewSchema, user } from '@worksheets/feat/user-management';
export default protectedProcedure
  .meta({
    logging: Severity.ERROR,
    openapi: {
      enable: true,
      protect: true,
      method: 'GET',
      path: '/user/overview',
      summary: 'User Overview',
      description: 'User Overview',
      tags: ['user'],
    },
  })
  .input(
    z
      .object({
        acknowledge: z.boolean().optional(),
      })
      .optional()
  )
  .output(userOverviewSchema)
  .query(async ({ input, ctx: { user: u } }) => {
    if (input?.acknowledge) await user.acknowledge(u);
    return await user.overview(u);
  });
