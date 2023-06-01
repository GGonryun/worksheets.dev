import { skeleton } from '@worksheets/util/next';
import { post } from './post';
import { get } from './get';
import { del } from './delete';
export type { PostExecutionResponse, PostExecutionRequest } from './post';

export const executionHandler = skeleton({ post, get, del });
