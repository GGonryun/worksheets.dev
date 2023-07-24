import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
export const sys = newApp({
  appId: 'sys',
  description:
    'The system libraries consist of classes which are used by many applications. They include functionality for saving logs, accessing information about the system, and more.',
  label: 'System',
  context: z.null(),
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/sys.svg',
  methods: {
    log: newMethod({
      appId: 'sys',
      methodId: 'log',
      label: 'Log',
      description:
        'Logs information to the system console. This method is used for debugging by Worksheets developers. This method takes any JSON input and logs it to our internal console.',
      input: z.any(),
      output: z.null(),
    }),
  },
});
