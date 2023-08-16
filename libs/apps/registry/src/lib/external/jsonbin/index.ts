import { newApp } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import createBin from './createBin';
import deleteBin from './deleteBin';
import listBins from './listBins';
import readBin from './readBin';
import updateBin from './updateBin';

export default newApp({
  appId: 'jsonbin',
  context: z.object({
    masterKey: z
      .string()
      .describe(
        'MasterKey is your Core API Access Key. You will need this Key to access mostly any API end-point on JSONBin. You could find the key on the API Keys page.'
      ),
  }),
  methods: {
    createBin,
    updateBin,
    deleteBin,
    listBins,
    readBin,
  },
});
