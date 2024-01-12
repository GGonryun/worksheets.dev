import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { Adapter } from 'next-auth/adapters';

export const customPrismaAdapter = (prisma: PrismaClient): Adapter =>
  ({
    ...PrismaAdapter(prisma),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async createUser(data: any) {
      // TODO: apply custom logic here
      return prisma.user.create({ data });
    },
  } as Adapter);
