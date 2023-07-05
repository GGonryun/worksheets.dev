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

export const sysExternal = newApplication({
  id: 'sys_external',
  label: 'System Scoped Method',
  description:
    'This is a test method used for testing external application system behaviors',
  settings: null,
  methods: [echo],
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/paper-plane-svgrepo-com.svg',
  meta: {
    enabled: true,
    public: false,
    gallery: false,
    external: false,
  },
});
