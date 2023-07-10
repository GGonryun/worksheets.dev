import { z } from '@worksheets/zod';
import { worksheetsEntitySchema } from './entities';

export type ConnectionWorksheetsRequest = z.infer<
  typeof connectionWorksheetsRequestSchema
>;
export const connectionWorksheetsRequestSchema = z.object({
  connectionId: z.string(),
});

export type ConnectionWorksheetsResponse = z.infer<
  typeof connectionWorksheetsResponseSchema
>;
export const connectionWorksheetsResponseSchema = z.array(
  worksheetsEntitySchema
);

export type ListConnectionsRequest = z.infer<
  typeof listConnectionsRequestSchema
>;
export const listConnectionsRequestSchema = z
  .object({
    limit: z.number().optional().default(10),
  })
  .optional();

export type ListConnectionsResponse = z.infer<
  typeof listConnectionsResponseSchema
>;
export const listConnectionsResponseSchema = z.array(
  z.object({
    id: z.string().optional(),
    connectionName: z.string().optional(),
    app: z.object({
      id: z.string(),
      label: z.string(),
      logo: z.string().optional(),
    }),
    validation: z.object({
      status: z.union([
        z.literal('active'),
        z.literal('inactive'),
        z.literal('incomplete'),
      ]),
      message: z.string(),
    }),
    updatedAt: z.string(),
  })
);
