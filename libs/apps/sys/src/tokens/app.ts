import {
  newApplication,
  newMethod,
  newSettings,
  newTokenSetting,
} from '@worksheets/apps/framework';

const settings = newSettings({
  primary: newTokenSetting({
    required: false,
  }),
  secondary: newTokenSetting({
    required: true,
  }),
  tertiary: newTokenSetting({
    required: true,
  }),
});

const tokens = newMethod({
  id: 'tokens',
  label: 'Token Test',
  description:
    'Logs tokens for testing/verification of the secure tokens feature',
  settings,
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

export const sysTokens = newApplication({
  id: 'sys.tokens',
  label: 'System Tokens',
  description: '',
  settings,
  methods: [tokens],
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/paper-plane-svgrepo-com.svg',
});
