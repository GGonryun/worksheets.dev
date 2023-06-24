import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { publicProcedure } from '../../trpc';
import { z } from 'zod';
import { ApplicationDefinition } from '@worksheets/apps/framework';

const db = newApplicationsDatabase();

const output = z.object({
  id: z.string(),
  name: z.string(),
});

type Response = z.infer<typeof output>;

export default publicProcedure
  .input(
    z.object({
      customizable: z.boolean().default(false),
    })
  )
  .output(z.array(output))
  .query(async ({ input: { customizable } }) => {
    let all = db.list();

    if (customizable) {
      all = all.filter((app) => Boolean(app.settings));
    }

    return all.map(convert);
  });

const convert = (app: ApplicationDefinition): Response => ({
  id: app.id,
  name: app.label,
});
