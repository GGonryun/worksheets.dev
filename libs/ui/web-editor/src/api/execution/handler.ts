import { skeleton } from '@worksheets/util/next';
import { post } from './post';
import { get } from './get';
export { PostExecutionResponse, PostExecutionRequest } from './post';

export const executionHandler = skeleton({ post, get });
