import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { Adapter } from 'next-auth/adapters';

export const customPrismaAdapter = (prisma: PrismaClient): Adapter => ({
  ...PrismaAdapter(prisma),
  async createUser(data) {
    // TODO: create a gamer profile for the user when they sign up
    return prisma.user.create({ data });
  },
});
