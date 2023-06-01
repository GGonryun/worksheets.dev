import { newFlagSetting, newMethod } from '@worksheets/apps/framework';

export const flags = newMethod({
  path: 'sys.flags',
  label: 'Flags Test',
  description:
    'Logs flags for testing/verification of the secure flags feature',
  settings: {
    primary: newFlagSetting({
      required: false,
    }),
    secondary: newFlagSetting({
      required: true,
    }),
    tertiary: newFlagSetting({
      required: true,
    }),
  },
  input: null,
  output: null,
  async call({ settings }) {
    console.log(
      'received flags',
      settings.primary,
      settings.secondary,
      settings.tertiary
    );
  },
});
