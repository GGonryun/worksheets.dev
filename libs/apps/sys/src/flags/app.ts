import {
  newApplication,
  newFlagSetting,
  newMethod,
  newSettings,
} from '@worksheets/apps/framework';

const settings = newSettings({
  primary: newFlagSetting({
    label: 'Primary Flag',
  }),
  secondary: newFlagSetting({}),
  tertiary: newFlagSetting({}),
});

const flags = newMethod({
  id: 'test',
  label: 'Flags Test',
  description:
    'Logs flags for testing/verification of the secure flags feature',
  settings,
  input: null,
  output: null,
  async call({ settings }) {
    console.info(
      '[CALL][sys.flags.flags]: received flags',
      settings.primary,
      settings.secondary,
      settings.tertiary
    );
  },
});

export const sysFlags = newApplication({
  id: 'sys_flags',
  label: 'System Flags',
  description: '',
  settings,
  methods: [flags],
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/paper-plane-svgrepo-com.svg',
  meta: {
    enabled: true,
    public: false,
    gallery: false,
    external: false,
  },
});
