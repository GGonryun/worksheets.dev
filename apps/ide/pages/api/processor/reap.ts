import { newPublicHandler, skeleton } from '@worksheets/util/next';
import { pushTasksToCompletion } from '@worksheets/feat/task-processing';
import { z } from 'zod';

const output = z.number().describe('The number of tasks reaped');
const post = newPublicHandler({ output })(() => {
  return pushTasksToCompletion(10);
});

export default skeleton({ post });
