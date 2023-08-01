import { applicationBasicsSchema } from '@worksheets/schemas-applications';
import { z } from '@worksheets/zod';

// keyed by type, taskid, timestamp
export const methodExecutionEntity = z.object({
  id: z.string(),
  uid: z.string(),
  appId: z.string(),
  methodId: z.string(),
  startedAt: z.number().default(Date.now()),
  finishedAt: z.number(),
  status: z.number(),
});

export const getMethodExecutionRequestSchema = z.object({
  id: z.string(),
});

export const getMethodExecutionResponseSchema = z.object({
  id: z.string(),
  app: applicationBasicsSchema,
  method: z.string(),
  startedAt: z.number(),
  finishedAt: z.number(),
  duration: z.number(),
  status: z.number(),
});

export const listMethodExecutionsRequestSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export const listMethodExecutionsResponseSchema = z.array(
  getMethodExecutionResponseSchema
);

export const deleteMethodExecutionRequestSchema = z.object({
  executionId: z.string(),
});

export const deleteMethodExecutionResponseSchema = z.boolean();

// DATABASE
export type MethodExecutionEntity = z.infer<typeof methodExecutionEntity>;

// GET
export type GetMethodExecutionRequest = z.infer<
  typeof getMethodExecutionRequestSchema
>;
export type GetMethodExecutionResponse = z.infer<
  typeof getMethodExecutionResponseSchema
>;

//LIST
export type ListMethodExecutionsRequest = z.infer<
  typeof listMethodExecutionsRequestSchema
>;
export type ListMethodExecutionsResponse = z.infer<
  typeof listMethodExecutionsResponseSchema
>;

// DELETE
export type DeleteMethodExecutionRequest = z.infer<
  typeof deleteMethodExecutionRequestSchema
>;
export type DeleteMethodExecutionResponse = z.infer<
  typeof deleteMethodExecutionResponseSchema
>;
