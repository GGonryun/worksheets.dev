import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import { listTemplates } from '@worksheets/feat/templates-gallery';
export default protectedProcedure
  .input(
    z.object({
      appIds: z.array(z.string()).optional(),
    })
  )
  .query(async ({ input: { appIds } }) => {
    return listTemplates({ appIds });
  });
