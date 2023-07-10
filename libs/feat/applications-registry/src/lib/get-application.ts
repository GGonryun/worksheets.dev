import { FormFields } from '@worksheets/schemas-applications';
import { db } from './util';

export const getApplication = (applicationId: string) => {
  const app = db.getApp(applicationId);

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
};
