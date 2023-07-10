import { z } from 'zod';
import { createWorksheetRequestSchema } from '@worksheets/schemas-worksheets';

export type StageDeploymentRequest = z.infer<typeof stageDeploymentRequest>;
export const stageDeploymentRequest = z.object({
  requests: z.array(createWorksheetRequestSchema),
});

export type OperationAction = z.infer<typeof operationActions>;
export const operationActions = z.enum(['create', 'update', 'delete', 'noop']);

export type StageDeploymentResponse = z.infer<typeof stageDeploymentResponse>;
export const stageDeploymentResponse = z.object({
  errors: z.array(
    z.object({
      code: z.string(),
      message: z.string(),
    })
  ),
  operations: z.array(
    z.object({
      name: z.string(),
      action: operationActions,
    })
  ),
  connections: z.array(
    z.object({
      worksheetName: z.string(),
      name: z.string(),
      type: z.string(),
    })
  ),
});

export type CommitDeploymentRequest = z.infer<typeof commitDeploymentRequest>;
export const commitDeploymentRequest = z.object({
  requests: z.array(createWorksheetRequestSchema),
});

export type CommitDeploymentResponse = z.infer<typeof commitDeploymentResponse>;
export const commitDeploymentResponse = z.union([
  z.object({
    success: z.literal(true),
    states: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        action: operationActions,
        // TODO: notify user's that their worksheets have references and they need to complete the deployment on the website.
        state: z.enum(['okay', 'missing-connections']),
      })
    ),
  }),
  z.object({
    success: z.literal(false),
    errors: z.array(
      z.object({
        name: z.string(),
        message: z.string(),
        code: z.string(),
      })
    ),
  }),
]);
