import { newMethod, newTokenSetting } from '@worksheets/apps/framework';

export const tokens = newMethod({
  path: 'sys.tokens',
  label: 'Token Test',
  description:
    'Logs tokens for testing/verification of the secure tokens feature',
  settings: {
    primary: newTokenSetting({
      required: false,
    }),
    secondary: newTokenSetting({
      required: true,
    }),
    tertiary: newTokenSetting({
      required: true,
    }),
  },
  input: null,
  output: null,
  async call({ settings }) {
    console.debug(
      'received tokens',
      settings.primary,
      settings.secondary,
      settings.tertiary
    );
  },
});
