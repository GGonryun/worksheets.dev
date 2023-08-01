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

export type GetConnectionDetailsRequest = z.infer<
  typeof getConnectionDetailsRequestSchema
>;
export const getConnectionDetailsRequestSchema = z.object({
  appId: z.string(),
});

export type PresentationalField = z.infer<typeof presentationalFieldShema>;
export const presentationalFieldShema = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum(['sensitive', 'button']),
  value: z.string(), // for oauth buttons, the value contains whether or not the user's token is valid
  helpUrl: z.string(),
});

export type GetConnectionDetailsResponse = z.infer<
  typeof getConnectionDetailsResponseSchema
>;
export const getConnectionDetailsResponseSchema = z.object({
  appId: z.string(),
  header: z.object({
    name: z.string(),
    logo: z.string(),
    categories: z.array(z.string()),
    setupTime: z.string(),
  }),
  details: z.object({
    instructions: z.string().describe('Markdown'),
    description: z.string(),
    security: z.string().describe('Markdown'),
  }),
  form: z.object({
    status: connectionStatusesSchema,
    dialog: z.object({
      severity: z.enum(['error', 'warning', 'info', 'none']),
      content: z.string(),
    }),
    fields: z.array(presentationalFieldShema),
  }),
});

export type ConnectionEntity = z.infer<typeof ConnectionEntitySchema>;
export const ConnectionEntitySchema = z.object({
  id: z.string(),
  appId: z.string(),
  userId: z.string(),
  fields: z.record(z.string()),
  status: connectionStatusesSchema,
  error: z.string(),
});

export type GetOAuthUrlRequest = z.infer<typeof getOAuthUrlRequestSchema>;
export const getOAuthUrlRequestSchema = z.object({
  appId: z.string(),
  fieldId: z.string(),
});

export type GetOAuthUrlResponse = z.infer<typeof getOAuthUrlResponseSchema>;
export const getOAuthUrlResponseSchema = z.object({
  url: z.string(),
});

export type DeleteByApplicationRequest = z.infer<
  typeof deleteByApplicationRequestSchema
>;
export const deleteByApplicationRequestSchema = z.object({
  appId: z.string(),
});

export type DeleteByApplicationResponse = z.infer<
  typeof deleteByApplicationResponseSchema
>;

export const deleteByApplicationResponseSchema = z.object({
  ok: z.boolean(),
});

export type UpdateConnectionPropertyRequest = z.infer<
  typeof updateConnectionPropertyRequestSchema
>;
export const updateConnectionPropertyRequestSchema = z.object({
  appId: z.string(),
  fieldId: z.string(),
  value: z.string(),
});

export type UpdateConnectionPropertyResponse = z.infer<
  typeof updateConnectionPropertyResponseSchema
>;
export const updateConnectionPropertyResponseSchema = z.object({
  ok: z.boolean(),
});

export const toggleConnectionStatusRequestSchema = z.object({
  appId: z.string(),
});

export const toggleConnectionStatusResponseSchema = z.object({
  ok: z.boolean(),
});

/** Handshakes */
export type HandshakeEntity = z.infer<typeof handshakeEntitySchema>;
export const handshakeEntitySchema = z.object({
  id: z.string(),
  userId: z.string(),
  appId: z.string(),
  fieldId: z.string(),
  expiration: z.number(),
});
