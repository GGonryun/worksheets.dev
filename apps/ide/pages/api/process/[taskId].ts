import { newPublicHandler, skeleton } from '@worksheets/util/next';
import { processTask } from '@worksheets/feat/task-processing';
import { taskStateEntity } from '@worksheets/data-access/tasks';
import { z } from 'zod';

const input = z
  .object({
    // taskId from path.
    taskId: z.string().nonempty(),
  })
  .strict();

const output = taskStateEntity;
const post = newPublicHandler({ input, output })(
  async ({ data: { taskId } }) => {
    return await processTask(taskId);
  }
);

export default skeleton({ post });
