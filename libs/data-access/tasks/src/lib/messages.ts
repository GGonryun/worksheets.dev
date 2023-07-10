import { newPubSub } from '@worksheets/firebase/pubsub';
import { taskCompleteStateEntity } from '@worksheets/schemas-executions';
import { z } from 'zod';

/**
 * @name processTaskMessageEntity
 * @description a message containing a task id to process
 */
export const processTaskMessageEntity = z.object({
  // the task we are processing
  taskId: z.string(),
});

export type ProcessTaskMessage = z.infer<typeof processTaskMessageEntity>;

export const newProcessTaskBus = () =>
  newPubSub<ProcessTaskMessage>('process-tasks');

/**
 * @name taskCompleteMessageEntity
 * @description a message containing a task id that has completed
 */
export const taskCompleteMessageEntity = z.object({
  // the task we are processing
  taskId: z.string(),
  // when the task finished
  timestamp: z
    .number()
    .default(() => Date.now())
    .optional(),
  // the task completion state
  state: taskCompleteStateEntity,
});

export type TaskCompleteMessage = z.infer<typeof taskCompleteMessageEntity>;

// a new pubsub bus for task completion messages
export const newTaskCompleteBus = () =>
  newPubSub<TaskCompleteMessage>('task-complete');
