import { newApplication, newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

const echo = newMethod({
  id: 'echo',
  label: 'Echo',
  settings: null,
  description:
    "Echo's our inputs back to us for testing/verification of the secure tokens feature",
  input: z.string(),
  output: z.string(),
  async call({ input, settings }) {
    console.debug(
      'received tokens',
      settings.primary,
      settings.secondary,
      settings.tertiary
    );
    return input;
  },
});

export const sysDisabled = newApplication({
  id: 'sys_disabled',
  label: 'System Disabled Method',
  description: 'This is a test method for testing the scopes of an application',
  settings: null,
  methods: [echo],
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/paper-plane-svgrepo-com.svg',
  meta: {
    enabled: false,
    public: false,
    gallery: false,
    external: false,
  },
});
