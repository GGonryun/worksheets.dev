import { applicationBasicsSchema } from '@worksheets/schemas-applications';
import { connectionStatusesSchema } from '@worksheets/schemas-connections';
import { z } from '@worksheets/zod';

export type ServiceEndpointInfo = z.infer<typeof serviceEndpointInfoSchema>;
export const serviceEndpointInfoSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  logo: z.string(),
});

export type ServiceStatus = z.infer<typeof serviceStatusSchema>;
export const serviceStatusSchema = z.enum([
  'connected',
  'disabled',
  'unstable',
  'uninstalled',
  'unknown',
]);

export type ServiceCategory = z.infer<typeof serviceCategorySchema>;
export const serviceCategorySchema = z.enum([
  'social',
  'media',
  'data',
  'storage',
  'finance',
  'location',
  'communication',
  'internal',
  'prediction',
]);

export type ServiceDescription = z.infer<typeof serviceDescriptionSchema>;
export const serviceDescriptionSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  logo: z.string(),
  category: serviceCategorySchema,
  endpoints: z.array(z.string()),
  providers: z.array(applicationBasicsSchema),
});

export type ConnectedServiceDescription = z.infer<
  typeof connectedServiceDescriptionSchema
>;
export const connectedServiceDescriptionSchema = z.object({
  ...serviceDescriptionSchema.shape,
  connection: z.object({
    status: serviceStatusSchema,
    appId: z.string().optional(),
  }),
});

export type ListServicesResponse = z.infer<typeof listServicesResponseSchema>;
export const listServicesResponseSchema = z.array(serviceDescriptionSchema);

export type CategorizeServicesResponse = z.infer<
  typeof categorizeServicesResponseSchema
>;
export const categorizeServicesResponseSchema = z.record(
  serviceCategorySchema,
  z.array(connectedServiceDescriptionSchema)
);

export type ServiceConfigurationEntity = z.infer<
  typeof serviceConfigurationEntity
>;
export const serviceConfigurationEntity = z.object({
  id: z.string(),
  userId: z.string(),
  serviceId: z.string(),
  connectionId: z
    .string()
    .describe("The connection is where we get the user's context from"),
  enabled: z.boolean().describe("whether this user's service is enabled"),
});

export type GetServiceDetailsRequest = z.infer<
  typeof getServiceDetailsRequestSchema
>;
export const getServiceDetailsRequestSchema = z.object({
  serviceId: z.string(),
});

export type ServiceProvider = z.infer<typeof serviceProviderSchema>;
export const serviceProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  logo: z.string(),
  status: connectionStatusesSchema,
});

export type GetServiceDetailsResponse = z.infer<
  typeof getServiceDetailsResponseSchema
>;
export const getServiceDetailsResponseSchema = z.object({
  service: serviceDescriptionSchema,
  configuration: z
    .object({
      // TODO: refactor the service page to use connections instead of providers.
      // providerId: z.string(),
      enabled: z.boolean(),
    })
    .optional(),
  providers: z.array(serviceProviderSchema),
  endpoints: z.array(serviceEndpointInfoSchema),
});

export type SelectServiceProviderRequest = z.infer<
  typeof selectServiceProviderRequestSchema
>;
export const selectServiceProviderRequestSchema = z.object({
  serviceId: z.string(),
  providerId: z.string(),
});

export type SelectServiceProviderResponse = z.infer<
  typeof selectServiceProviderResponseSchema
>;
export const selectServiceProviderResponseSchema = z.object({
  ok: z.boolean(),
});

export type ToggleServiceRequest = z.infer<typeof toggleServiceRequestSchema>;

export const toggleServiceRequestSchema = z.object({
  serviceId: z.string(),
});

export type ToggleServiceResponse = z.infer<typeof toggleServiceResponseSchema>;
export const toggleServiceResponseSchema = z.object({
  ok: z.boolean(),
});
