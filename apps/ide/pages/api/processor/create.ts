import { newPublicHandler, skeleton } from '@worksheets/util/next';
import { createTask } from '@worksheets/feat/task-processing';
import { z } from 'zod';

const createTaskRequest = z
  .object({
    taskId: z.string().nonempty().optional(),
    worksheetId: z.string().nonempty(),
    input: z.unknown(),
  })
  .strict();

const createTaskResponse = z.string().nonempty().describe('The task id');

export type CreateTaskRequst = z.infer<typeof createTaskRequest>;
export type CreateTaskResponse = z.infer<typeof createTaskResponse>;

const post = newPublicHandler({
  input: createTaskRequest,
  output: createTaskResponse,
})(async ({ data: { taskId, worksheetId, input } }) => {
  return await createTask(taskId, worksheetId, input, {
    //TODO: support overriding the default task settings for api
  });
});

export default skeleton({ post });
