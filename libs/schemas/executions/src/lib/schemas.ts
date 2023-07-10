import { z } from 'zod';
import { taskEntity } from './entities';

export const getExecutionRequestSchema = z.object({
  executionId: z.string(),
});
export const getExecutionResponseSchema = taskEntity;
export type GetExecutionRequest = z.infer<typeof getExecutionRequestSchema>;
export type GetExecutionResponse = z.infer<typeof getExecutionResponseSchema>;
