import { newMethod } from '@worksheets/apps-core';
import { sendBatchRequest, dryRunResponse } from './schemas';

export default newMethod({
  appId: 'sinch',
  methodId: 'dryRunBatch',
  input: sendBatchRequest,
  output: dryRunResponse,
});
