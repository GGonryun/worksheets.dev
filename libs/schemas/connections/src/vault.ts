import { z } from '@worksheets/zod';

export type ListVaultConnectorsResponse = z.infer<
  typeof listVaultConnectorsResponseSchema
>;
export const listVaultConnectorsResponseSchema = z.array(
  z.object({
    appId: z.string(),
    title: z.string(),
    logo: z.string(),
  })
);
