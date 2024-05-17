export * from '@prisma/client';

import { PrismaClient } from '@prisma/client';

import prisma from './lib/client';

// https://github.com/trpc/examples-next-prisma-starter
// https://trpc.io/docs/client/nextjs/setup
// https://github.com/vercel/next.js/tree/canary/examples/blog-starter
export { prisma };

export type PrismaTransactionalClient = Parameters<
  Parameters<PrismaClient['$transaction']>[0]
>[0];

export const MAX_INT = 2147483647;
