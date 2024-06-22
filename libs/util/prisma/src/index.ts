import { TRPCError } from '@trpc/server';
import {
  Prisma,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import { S_TO_MS } from '@worksheets/util/time';

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

const DEADLOCK_OR_WRITE_CONFLICT = 'P2034';
const CONCURRENT_TRANSACTIONS = 'P2037';

export const whenWriteConflictOrDeadlock = (e: unknown): boolean => {
  console.warn(
    'whenWriteConflictOrDeadlock',
    e,
    e instanceof Prisma.PrismaClientKnownRequestError,
    (e as Prisma.PrismaClientKnownRequestError)?.code
  );
  return (
    e instanceof Prisma.PrismaClientKnownRequestError &&
    // Retry if the error was due to a write conflict or deadlock
    // See: https://www.prisma.io/docs/reference/api-reference/error-reference#p2034
    (e.code === DEADLOCK_OR_WRITE_CONFLICT ||
      // Too many concurrent transactions
      // See: https://www.prisma.io/docs/orm/reference/error-reference#p2037
      e.code === CONCURRENT_TRANSACTIONS)
  );
};

const RETRY_DEFAULTS = {
  retry: whenWriteConflictOrDeadlock,
  isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  maxAttempts: 5,
  backOff: 500,
  maxWait: S_TO_MS(5),
  timeout: S_TO_MS(15),
};

export const retryTransaction = async <T>(
  prisma: PrismaClient,
  fn: (tx: PrismaTransactionalClient) => Promise<T>,
  opts: Partial<{
    retry: (e: unknown) => boolean;
    isolationLevel: Prisma.TransactionIsolationLevel;
    maxAttempts: number;
    backOff: number;
    maxWait: number;
    timeout: number;
  }> = RETRY_DEFAULTS
): Promise<T> => {
  const maxAttempts = opts?.maxAttempts ?? RETRY_DEFAULTS.maxAttempts;
  const isolationLevel = opts?.isolationLevel ?? RETRY_DEFAULTS.isolationLevel;
  const maxWait = opts?.maxWait ?? RETRY_DEFAULTS.maxWait;
  const timeout = opts?.timeout ?? RETRY_DEFAULTS.timeout;
  const backOff = opts?.backOff ?? RETRY_DEFAULTS.backOff;
  const retry = opts?.retry ?? RETRY_DEFAULTS.retry;

  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      attempts++;
      return await prisma.$transaction(fn, {
        isolationLevel,
        maxWait,
        timeout,
      });
    } catch (e) {
      if (retry(e)) {
        const delay = backOff * attempts;
        console.warn(`Transaction failed, retrying after ${delay}ms`, e);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw e;
    }
  }
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Failed to process requested. Please try again.',
  });
};
