import { UserType } from '@worksheets/prisma';
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  isPublisher: z.boolean(),
  username: z.string(),
  multiplier: z.number(),
  bio: z.string().nullable(),
  email: z.string(),
  type: z.nativeEnum(UserType),
});

export type UserSchema = z.infer<typeof userSchema>;
