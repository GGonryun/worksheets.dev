import { z } from 'zod';
import { limits, user } from '@worksheets/feat/user-management';
import { TRPCError } from '@trpc/server';
import { listConnections } from '@worksheets/feat/execution-settings';
import { privateProcedure } from '../../../procedures';

export default privateProcedure
  .output(z.boolean())
  .query(async ({ ctx: { user: u } }) => {
    const overview = await user.overview(u);

    const connectionLimit = overview?.limits.connections;
    if (connectionLimit == null) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Server could not find your token limit',
      });
    }

    const connections = await listConnections(u);

    const result = await limits.exceeds({
      uid: u.uid,
      type: 'maxConnections',
      value: connections.length + 1,
    });
    console.log('did exceed limit?', result);
    return result;
  });
