import { z } from 'zod';
import {
  listTemplates,
  templateDetailsSchema,
} from '@worksheets/feat/templates-gallery';
import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      appIds: z
        .string()
        .describe('comma separated list of app ids to filter by'),
    })
  )
  .output(z.array(templateDetailsSchema))
  .query(async ({ input: { appIds } }) => {
    return listTemplates({ appIds: appIds.split(',').filter(Boolean) });
  });
