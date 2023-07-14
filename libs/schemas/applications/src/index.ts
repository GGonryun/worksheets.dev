import { z } from '@worksheets/zod';

export const applicationDetailsSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  description: z.string(),
});

export type ApplicationDetails = z.infer<typeof applicationDetailsSchema>;

export const settingTypeSchema = z.union([
  z.literal('flag'),
  z.literal('token'),
  z.literal('oauth'),
]);

export type SettingType = z.infer<typeof settingTypeSchema>;

export type ApplicationMetadata = z.infer<typeof applicationMetadata>;
export const applicationMetadata = z.object({
  enabled: z
    .boolean()
    .default(true)
    .describe('if the application is enabled for all users'),
  public: z
    .boolean()
    .default(false)
    .describe('if the application can be used by anyone'),
  gallery: z
    .boolean()
    .default(false)
    .describe('if the app is visible on the gallery'),
  external: z
    .boolean()
    .default(false)
    .describe("if the application should count towards 'external' usage"),
});

export type CallMethodRequest = z.infer<typeof callMethodRequestSchema>;
export const callMethodRequestSchema = z.object({
  path: z.string(),
  input: z.any().describe('any json data'),
  connection: z
    .string()
    .optional()
    .describe(
      'use a connection for the execution if this method requires sensitive tokens or data'
    ),
  metadata: z
    .unknown()
    .describe("optional metadata to pass to the method's execution."),
});

export type CallMethodV2Request = z.infer<typeof callMethodV2RequestSchema>;
export const callMethodV2RequestSchema = z.object({
  appId: z.string(),
  methodId: z.string(),
  input: z.any().describe('any json data'),
  context: z.any(),
});

export type CallMethodResponse = z.infer<typeof callMethodResponseSchema>;
export const callMethodResponseSchema = z.any().describe('any json data');

export type ListApplicationMethodsRequest = z.infer<
  typeof listApplicationMethodsRequestSchema
>;
export const listApplicationMethodsRequestSchema = z.object({
  appId: z.string(),
});

export type ListApplicationMethodsResponse = z.infer<
  typeof listApplicationMethodsResponseSchema
>;
export const listApplicationMethodsResponseSchema = z.array(
  z.object({
    id: z.string(),
    label: z.string(),
    description: z.string().optional(),
    input: z.unknown(),
    output: z.unknown(),
    example: z.string(),
  })
);

export type ListApplicationsRequest = z.infer<
  typeof listApplicationsRequestSchema
>;
export const listApplicationsRequestSchema = z.object({
  ...applicationMetadata.partial().shape,
  customizable: z.boolean().default(false),
});
export type ListApplicationsResponse = z.infer<
  typeof listApplicationsResponseSchema
>;
export const listApplicationsResponseSchema = z.array(applicationDetailsSchema);

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
  fields: formFieldsSchema,
  description: z.string(),
});
