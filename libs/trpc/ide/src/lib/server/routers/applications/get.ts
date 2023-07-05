import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { Severity, publicProcedure } from '../../trpc';
import { z } from 'zod';
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
  .meta({
    logging: Severity.ERROR,
    openapi: {
      method: 'GET',
      path: '/applications/{appId}',
      tags: ['applications'],
      summary: 'Get application information',
      description: 'Get application information',
    },
  })
  .input(z.object({ appId: z.string() }))
  .output(
    z.object({
      id: z.string(),
      name: z.string(),
      logo: z.string(),
      fields: formFields,
      description: z.string(),
    })
  )
  .query(async ({ input: { appId } }) => {
    const app = db.getApp(appId);

    const fields: FormFields = [];

    if (app.settings) {
      for (const key in app.settings) {
        const setting = app.settings[key];

        fields.push({
          id: key,
          name: setting.label ?? key,
          type: setting.type,
          required: setting.required,
        });
      }
    }

    return {
      id: app.id,
      name: app.label,
      logo: app.logo,
      description: app.description ?? '',
      fields,
    };
  });
