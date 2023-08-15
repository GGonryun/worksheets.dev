import { newApp } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import dryRunBatch from './dryRunBatch';
import listBatches from './listBatches';
import sendBatch from './sendBatch';

export default newApp({
  appId: 'sinch',
  context: z.object({
    apiToken: z.string(),
    servicePlanId: z.string(),
  }),
  methods: {
    dryRunBatch,
    listBatches,
    sendBatch,
  },
});
