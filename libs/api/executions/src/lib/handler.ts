import { skeleton } from '@worksheets/util/next';
import { get } from './get';
import { del } from './delete';

export type { GetExecutionsResponse } from './get';
export const executionsHandler = skeleton({ get, del });
