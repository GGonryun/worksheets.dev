import { protectedProcedure } from '../../../trpc';
import { z } from 'zod';
import { getWorksheetConnections } from '@worksheets/feat/worksheets-connections';

export default protectedProcedure.input(z.string()).query(async ({ input }) => {
  console.info(`getting worksheet connections for worksheet ${input}`);
  return await getWorksheetConnections({
    worksheetId: input,
  });
});
