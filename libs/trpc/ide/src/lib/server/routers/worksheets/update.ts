import {
  updateWorksheetRequestSchema,
  updateWorksheet,
} from '@worksheets/feat/worksheets-management';
import { protectedProcedure } from '../../trpc';

export default protectedProcedure.input(updateWorksheetRequestSchema).mutation(
  async ({
    input,
    ctx: {
      user: { uid },
    },
  }) => {
    console.info(`updating worksheet ${uid} properties`, input);
    return await updateWorksheet(uid, {
      ...input,
    });
  }
);
