import { newMethod } from '@worksheets/apps-core';
import { sendBatchRequest, sentBatchSchema } from './schemas';

export default newMethod({
  appId: 'sinch',
  methodId: 'sendBatch',
  input: sendBatchRequest,
  output: sentBatchSchema,
});
