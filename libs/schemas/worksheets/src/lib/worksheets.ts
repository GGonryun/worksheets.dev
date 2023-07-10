import { logLevelEntity } from '@worksheets/schemas-logging';
import { z } from 'zod';
import { worksheetsEntitySchema } from './entities';

export const overridableCreationPropertiesSchema = z.object({
  timeout: z.number().optional().describe('Timeout in seconds'),
  verbosity: logLevelEntity
    .optional()
    .describe('The worksheets default log level when running a task'),
  connections: z
    .array(z.string())
    .optional()
    .describe(
      "Worksheet's connections. These should be the ids of connections you've already made."
    ),
});

export type ExecuteUserWorksheetRequest = z.infer<
  typeof executeUserWorksheetRequestSchema
>;
export const executeUserWorksheetRequestSchema = z.object({
  identifier: z
    .string()
    .describe('The execution id or the name of the worksheet to execute'),
  input: z.unknown(),
  overrides: overridableCreationPropertiesSchema.optional(),
});

export type ExecuteWorksheetResponse = z.infer<
  typeof executeWorksheetResponseSchema
>;
export const executeWorksheetResponseSchema = z
  .string()
  .describe("the execution id of the worksheet's task");

export const executeWorksheetRequestSchema = z.object({
  worksheetId: z
    .string()
    .describe('The execution id or the name of the worksheet to execute'),
  input: z.unknown(),
  overrides: overridableCreationPropertiesSchema.optional(),
});

export type CreateWorksheetRequest = z.infer<
  typeof createWorksheetRequestSchema
>;
export const createWorksheetRequestSchema = z.object({
  name: z.string(),
  text: z.string(),
  description: z.string().optional(),
  ...overridableCreationPropertiesSchema.shape,
});

export type CreateWorksheetResponse = z.infer<
  typeof createWorksheetResponseSchema
>;
export const createWorksheetResponseSchema = z.string();

export type UpdateWorksheetRequest = z.infer<
  typeof updateWorksheetRequestSchema
>;
export const updateWorksheetRequestSchema = worksheetsEntitySchema
  .required({ id: true })
  .partial({
    name: true,
    text: true,
    description: true,
    logLevel: true,
    enabled: true,
    timeout: true,
  })
  .omit({ uid: true, createdAt: true, updatedAt: true });

export type UpdateWorksheetResponse = z.infer<
  typeof updateWorksheetResponseSchema
>;
export const updateWorksheetResponseSchema = worksheetsEntitySchema.omit({
  uid: true,
});

export type ListWorksheetsRequest = z.infer<typeof listWorksheetsRequestSchema>;
export const listWorksheetsRequestSchema = z
  .object({ limit: z.number().min(1).max(10).default(10) })
  .optional();

export type ListWorksheetsResponse = z.infer<
  typeof listWorksheetsResponseSchema
>;
export const listWorksheetsResponseSchema = z.record(worksheetsEntitySchema);

export const getWorksheetRequestSchema = z.object({
  id: z.string(),
});
export const getWorksheetResponseSchema = worksheetsEntitySchema;
export type GetWorksheetRequest = z.infer<typeof getWorksheetRequestSchema>;
export type GetWorksheetResponse = z.infer<typeof getWorksheetResponseSchema>;

export const deleteWorksheetRequestSchema = z.object({
  id: z.string(),
});
export const deleteWorksheetResponseSchema = z.string();
export type DeleteWorksheetRequest = z.infer<
  typeof deleteWorksheetRequestSchema
>;
export type DeleteWorksheetResponse = z.infer<
  typeof deleteWorksheetResponseSchema
>;
