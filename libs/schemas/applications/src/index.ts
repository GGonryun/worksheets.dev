import { z } from '@worksheets/zod';

export const applicationBasicsSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  description: z.string(),
});

export type ApplicationBasics = z.infer<typeof applicationBasicsSchema>;

export const settingTypeSchema = z.union([
  z.literal('flag'),
  z.literal('token'),
  z.literal('oauth'),
]);

export type SettingType = z.infer<typeof settingTypeSchema>;

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
  lastUpdated: z.string(),
  title: z.string(),
  subtitle: z.string(),
  logo: z.string(),
  categories: z.array(z.string()),
  description: z.string(),
  creator: z.string(),
  tutorial: z.string(),
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
    sdk: z.string(),
    schema: z.object({
      path: z.string(),
      context: z.any(),
      input: z.any(),
      output: z.any(),
    }),
    curl: z.object({
      request: z.string(),
      response: z.string(),
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
});
export type ListApplicationsResponse = z.infer<
  typeof listApplicationsResponseSchema
>;
export const listApplicationsResponseSchema = z.array(applicationBasicsSchema);

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
