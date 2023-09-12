import { z } from '@worksheets/zod';

export type ListUserTokensResponse = z.infer<
  typeof listUserTokensResponseSchema
>;
export const listUserTokensResponseSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string().nonempty(),
    createdAt: z.string().describe('created at timestamp'),
    expiresOn: z.string().describe('expiration date timestamp'),
    expired: z.boolean().describe('is the token expired?'),
  })
);
