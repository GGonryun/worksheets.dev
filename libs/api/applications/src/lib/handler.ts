import { skeleton } from '@worksheets/util/next';
import { get } from './get';

export type { SerializedNode } from './get';
export const appsHandler = skeleton({ get });
