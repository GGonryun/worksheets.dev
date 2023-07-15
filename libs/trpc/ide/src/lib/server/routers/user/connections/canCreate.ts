import { z } from 'zod';
import { listConnections } from '@worksheets/feat/execution-settings';
import { privateProcedure } from '../../../procedures';

export default privateProcedure
  .output(z.boolean())
  .query(async ({ ctx: { user: u } }) => {
    const connections = await listConnections(u);

    return true;
  });
