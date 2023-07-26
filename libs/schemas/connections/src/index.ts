import { z } from '@worksheets/zod';

export type ConnectionStatuses = z.infer<typeof connectionStatusesSchema>;
export const connectionStatusesSchema = z.enum([
  'active',
  'disabled',
  'uninstalled',
  'error',
  'warning',
  'unknown',
]);

export type ConnectionDetails = z.infer<typeof connectionDetailsSchema>;
export const connectionDetailsSchema = z.object({
  appId: z.string(),
  name: z.string(),
  logo: z.string(),
  description: z.string(),
  status: connectionStatusesSchema,
});

export type GetConnectionsPageRequest = z.infer<
  typeof getConnectionsPageRequestSchema
>;
export const getConnectionsPageRequestSchema = z.null();

export type GetConnectionsPageResponse = z.infer<
  typeof getConnectionsPageResponseSchema
>;
export const getConnectionsPageResponseSchema = z.array(
  connectionDetailsSchema
);
