import { skeleton } from '@worksheets/util/next';
import { global } from './global';

export type { DryExecutionRequest, DryExecutionResponse } from './global';

export const testRunHandler = skeleton({ global });
