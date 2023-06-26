import { newSettings, newTokenSetting } from '@worksheets/apps/framework';

export const settings = newSettings({
  key: newTokenSetting({
    required: true,
  }),
});
