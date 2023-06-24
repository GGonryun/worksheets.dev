import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { publicProcedure } from '../../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { settingTypeSchema } from '@worksheets/apps/framework';

const db = newApplicationsDatabase();

export const formFieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: settingTypeSchema,
  required: z.boolean(),
});

const formFields = z.array(formFieldSchema);
type FormFields = z.infer<typeof formFields>;

export default publicProcedure
  .input(z.object({ appId: z.string() }))
  .output(z.object({ name: z.string(), logo: z.string(), fields: formFields }))
  .query(async ({ input: { appId } }) => {
    const app = db.getApp(appId);

    if (!app.settings) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Application does not have settings to modify',
      });
    }

    const fields: FormFields = [];
    for (const key in app.settings) {
      const setting = app.settings[key];

      fields.push({
        id: key,
        name: setting.label ?? key,
        type: setting.type,
        required: setting.required,
      });
    }

    return { name: app.label ?? '', logo: app.logo ?? '', fields };
  });
