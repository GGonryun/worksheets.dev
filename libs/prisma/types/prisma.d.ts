import { PrismaClient } from '@prisma/client';

export {};

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}
