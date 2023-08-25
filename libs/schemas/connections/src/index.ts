import { applicationBasicsSchema } from '@worksheets/schemas-applications';
import { z } from '@worksheets/zod';

export type ConnectionStatuses = z.infer<typeof connectionStatusesSchema>;
export const connectionStatusesSchema = z.enum([
  'active',
  'error',
  'warning',
  'disabled',
  'pending',
  'unknown',
]);

export type CredentialStatuses = z.infer<typeof credentialStatusesSchema>;
export const credentialStatusesSchema = z.enum([
  'active',
  'error',
  'warning',
  'pending',
  'unknown',
]);

export type ConnectionBasics = z.infer<typeof connectionBasicsSchema>;
export const connectionBasicsSchema = z.object({
  id: z.string(),
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
export const getConnectionsPageResponseSchema = z.array(connectionBasicsSchema);

export type GetConnectionDetailsRequest = z.infer<
  typeof getConnectionDetailsRequestSchema
>;
export const getConnectionDetailsRequestSchema = z.object({
  appId: z.string(),
  connectionId: z.string(),
});

export type PresentationalField = z.infer<typeof presentationalFieldShema>;
export const presentationalFieldShema = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum(['sensitive', 'oauth', 'text']),
  value: z.string(), // for oauth buttons, the value contains whether or not the user's token is valid
  helpUrl: z.string(),
});

export type GetConnectionDetailsResponse = z.infer<
  typeof getConnectionDetailsResponseSchema
>;
export const getConnectionDetailsResponseSchema = z.object({
  id: z.string(),
  appId: z.string(),
  header: z.object({
    name: z.string(),
    logo: z.string(),
    categories: z.array(z.string()),
    setupTime: z.string(),
    createdAt: z.number(),
    updatedAt: z.number(),
  }),
  details: z.object({
    instructions: z.string().describe('Markdown'),
    description: z.string(),
    security: z.string().describe('Markdown'),
  }),
  credentials: z.object({
    status: z.enum(['active', 'error', 'warning', 'pending', 'unknown']),
    dialog: z.object({
      severity: z.enum(['error', 'warning', 'info', 'none']),
      content: z.string(),
    }),
    fields: z.array(presentationalFieldShema),
  }),
  configuration: z.object({
    name: z.string(),
    enabled: z.boolean(),
  }),
});

export type ConnectionEntity = z.infer<typeof ConnectionEntitySchema>;
export const ConnectionEntitySchema = z.object({
  id: z.string(),
  appId: z.string(),
  userId: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  name: z.string(),
  enabled: z.boolean(),
  fields: z.record(z.string()),
});

export type GetOAuthUrlRequest = z.infer<typeof getOAuthUrlRequestSchema>;
export const getOAuthUrlRequestSchema = z.object({
  appId: z.string(),
  fieldId: z.string(),
  connectionId: z.string().optional(),
});

export type GetOAuthUrlResponse = z.infer<typeof getOAuthUrlResponseSchema>;
export const getOAuthUrlResponseSchema = z.object({
  url: z.string(),
  connectionId: z.string(),
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
  connectionId: z.string(),
  fieldId: z.string(),
  expiration: z.number(),
});

/* List User Connections */
export type ListUserConnectionsRequest = z.infer<
  typeof listUserConnectionsRequestSchema
>;
export const listUserConnectionsRequestSchema = z.object({
  appId: z.string(),
});

export type UserConnection = z.infer<typeof userConnectionSchema>;
export const userConnectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  status: connectionStatusesSchema,
  app: applicationBasicsSchema,
});

export type ListUserConnectionsResponse = z.infer<
  typeof listUserConnectionsResponseSchema
>;
export const listUserConnectionsResponseSchema = z.array(userConnectionSchema);
