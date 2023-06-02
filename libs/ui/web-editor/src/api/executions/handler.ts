import { skeleton } from '@worksheets/util/next';
import { get } from './get';
import { del } from './delete';

export const executionsHandler = skeleton({ get, del });
