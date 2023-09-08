import { z } from '@worksheets/zod';

type ErrorCodes =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'METHOD_NOT_FOUND'
  | 'PRECONDITION_FAILED'
  | 'CONFLICT'
  | 'INTERNAL_SERVER_ERROR'
  | 'RATE_LIMITED'
  | 'UNKNOWN_ERROR'
  | 'SERVICE_UNAVAILABLE';

export const commonErrorSchema = (code: ErrorCodes) =>
  z.object({
    code: z.literal(code).describe('A code that identifies the error'),
    message: z
      .string()
      .describe(
        "A message that describes the error's cause and possible solutions"
      )
      .max(128),
  });

export type ApplicationBasics = z.infer<typeof applicationBasicsSchema>;
export const applicationBasicsSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  description: z.string(),
});

export type SettingType = z.infer<typeof settingTypeSchema>;
export const settingTypeSchema = z.union([
  z.literal('flag'),
  z.literal('token'),
  z.literal('oauth'),
]);

export type ApplicationCategory = z.infer<typeof applicationCategorySchema>;
export const applicationCategorySchema = z.union([
  z.literal('analytics'),
  z.literal('media'),
  z.literal('communication'),
  z.literal('email'),
  z.literal('calendar'),
  z.literal('images'),
  z.literal('productivity'),
  z.literal('utilities'),
  z.literal('system'),
  z.literal('storage'),
  z.literal('data'),
  z.literal('sms'),
  z.literal('incident-response'),
  z.literal('marketing'),
  z.literal('chat'),
  z.literal('artificial-intelligence'),
  z.literal('notes'),
]);

export type ApplicationFilterType = z.infer<typeof applicationFilterTypeSchema>;
export const applicationFilterTypeSchema = z.union([
  z.literal('category'),
  z.literal('tag'),
]);

export type ApplicationTag = z.infer<typeof applicationTagSchema>;
export const applicationTagSchema = z.union([
  z.literal('new'),
  z.literal('internal'),
  z.literal('popular'),
  z.literal('featured'),
  z.literal('free'),
  z.literal('paid'),
  z.literal('beta'),
]);

export type CallMethodRequest = z.infer<typeof callMethodRequestSchema>;
export const callMethodRequestSchema = z.object({
  appId: z.string(),
  methodId: z.string(),
  input: z.any().describe('any json data'),
  context: z.any(),
});

export type CallMethodResponse = z.infer<typeof callMethodResponseSchema>;
export const callMethodResponseSchema = z.any().describe('any json data');

export type GetApplicationDetailsRequest = z.infer<
  typeof getApplicationDetailsRequestSchema
>;
export const getApplicationDetailsRequestSchema = z.object({
  appId: z.string(),
});

export type GetApplicationDetailsResponse = z.infer<
  typeof getApplicationDetailsResponseSchema
>;

export const getApplicationDetailsResponseSchema = z.object({
  appId: z.string(),
  lastUpdated: z.number(),
  title: z.string(),
  subtitle: z.string(),
  logo: z.string(),
  categories: z.array(applicationCategorySchema),
  tags: z.array(applicationTagSchema),
  description: z.string(),
  faq: z.array(z.array(z.string())),
  creator: z.string(),
  tutorial: z.string(),
});

export type MethodExampleData = z.infer<typeof methodExampleDataSchema>;
export const methodExampleDataSchema = z.object({
  description: z.string().optional(),
  schema: z.any().describe('a json 7 schema object'),
  examples: z.array(z.string().describe('json strings that match the schema')),
});

export type ApplicationMethodDetailsResponse = z.infer<
  typeof applicationMethodDetailsResponseSchema
>;
export const applicationMethodDetailsResponseSchema = z.object({
  appId: z.string(),
  methodId: z.string(),
  label: z.string(),
  description: z.string().optional(),
  pricing: z.number(),
  examples: z.object({
    request: methodExampleDataSchema,
    response: z.record(
      z.string().describe('status code of the response'),
      methodExampleDataSchema
    ),
    code: z.object({
      curl: z.string().describe('A json-ified curl command'),
    }),
  }),
});

export type ListApplicationMethodDetailsRequest = z.infer<
  typeof listApplicationMethodDetailsRequestSchema
>;
export const listApplicationMethodDetailsRequestSchema = z.object({
  appId: z.string(),
});

export type ListApplicationMethodDetailsResponse = z.infer<
  typeof listApplicationMethodDetailsResponseSchema
>;

export const listApplicationMethodDetailsResponseSchema = z.array(
  applicationMethodDetailsResponseSchema
);

export type ListApplicationsRequest = z.infer<
  typeof listApplicationsRequestSchema
>;
export const listApplicationsRequestSchema = z.object({
  gallery: z.boolean().default(false),
  featured: z.boolean().default(false),
  features: z.array(z.enum(['connections'])).default([]),
});
export type ListApplicationsResponse = z.infer<
  typeof listApplicationsResponseSchema
>;
export const listApplicationsResponseSchema = z.array(
  z.object({
    ...applicationBasicsSchema.shape,
    categories: z.array(applicationCategorySchema),
    tags: z.array(applicationTagSchema),
    lastUpdated: z.number(),
  })
);

export type FormField = z.infer<typeof formFieldSchema>;
export const formFieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: settingTypeSchema,
  required: z.boolean(),
});

export type FormFields = z.infer<typeof formFieldsSchema>;
export const formFieldsSchema = z.array(formFieldSchema);

export type GetApplicationRequest = z.infer<typeof getApplicationRequestSchema>;
export const getApplicationRequestSchema = z.object({ appId: z.string() });

export type GetApplicationResponse = z.infer<
  typeof getApplicationResponseSchema
>;
export const getApplicationResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  description: z.string(),
});

export type GetApplicationConnectionDetailsRequest = z.infer<
  typeof getApplicationConnectionDetailsRequestSchema
>;
export const getApplicationConnectionDetailsRequestSchema = z.object({
  appId: z.string(),
});

export type GetApplicationConnectionDetailsResponse = z.infer<
  typeof getApplicationConnectionDetailsResponseSchema
>;
export const getApplicationConnectionDetailsResponseSchema = z.object({
  appId: z.string(),
  logo: z.string(),
  title: z.string(),
  setupTime: z.number(),
  instructions: z.string(),
  security: z.string(),
  tutorialUrl: z.string(),
});
