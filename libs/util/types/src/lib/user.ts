import { UserType } from '@prisma/client';
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  isPublisher: z.boolean(),
  username: z.string(),
  bio: z.string().nullable(),
  email: z.string(),
  type: z.nativeEnum(UserType),
});

export type UserSchema = z.infer<typeof userSchema>;