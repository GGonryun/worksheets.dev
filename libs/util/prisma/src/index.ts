import { Prisma } from '@worksheets/prisma';

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
