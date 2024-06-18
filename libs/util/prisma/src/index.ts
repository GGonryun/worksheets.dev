import {
  Prisma,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';

export const isPrismaJsonObject = (
  value: unknown
): value is Prisma.JsonObject => {
  if (value == null || typeof value !== 'object' || Array.isArray(value))
    return false;
  return true;
};

export const convertJson = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T = string | number | boolean | Record<string, any> | Array<any> | null
>(
  json: Prisma.JsonValue
): T => {
  return json as T;
};

export const retryTransaction = async <T>(
  prisma: PrismaClient,
  fn: (tx: PrismaTransactionalClient) => Promise<T>,
  retry: (e: unknown) => boolean = whenWriteConflictOrDeadlock,
  isolationLevel: Prisma.TransactionIsolationLevel = Prisma
    .TransactionIsolationLevel.Serializable
): Promise<T> => {
  let attempts = 0;
  const max = 5;
  const backOff = 1000;

  while (attempts < max) {
    try {
      attempts++;
      return prisma.$transaction(fn, {
        isolationLevel,
      });
    } catch (e) {
      if (retry(e)) {
        const delay = backOff * attempts;
        console.debug(`Retrying transaction after ${delay}ms`, e);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw e;
    }
  }
  throw new Error('Failed transaction, exhausted retries');
};

export const whenWriteConflictOrDeadlock = (e: unknown): boolean => {
  // Retry the transaction only if the error was due to a write conflict or deadlock
  // See: https://www.prisma.io/docs/reference/api-reference/error-reference#p2034
  return (
    e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2034'
  );
};
