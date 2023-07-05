import { TypeOf } from 'zod';
import {
  apiTokenEntity,
  newApiTokenDatabase,
} from '@worksheets/data-access/api-tokens';
import { limits } from './limits';
import { TRPCError } from '@trpc/server';
import { API_TOKEN_PREFIX } from './constants';
import { formatTimestampLong, isExpired } from '@worksheets/util/time';
import { hasher } from './util';

const db = newApiTokenDatabase();

const checkMaxTokens = async (uid: string, value: number) => {
  if (await limits.exceeds({ uid, type: 'maxApiTokens', value })) {
    throw new TRPCError({
      code: 'PRECONDITION_FAILED',
      message:
        "You've exceeded your quota of API tokens. Contact support to increase your quota.",
    });
  }
};

const createTokenRequestSchema = apiTokenEntity.omit({
  id: true,
  createdAt: true,
  hash: true,
});

const createToken = async (
  req: TypeOf<typeof createTokenRequestSchema>
): Promise<string> => {
  const values = await db.query({ f: 'uid', o: '==', v: req.uid });

  await checkMaxTokens(req.uid, values.length + 1);

  const id = db.id();
  const hash = hasher.hash(id);

  await db.insert({
    id: hash,
    createdAt: Date.now(),
    hash,
    ...req,
  });

  return `${API_TOKEN_PREFIX}${hash}`;
};

const genericAccessFailure = {
  code: 'UNAUTHORIZED' as const,
  message: 'You are not authorized to delete this token.',
};

const deleteTokenHandler = async (req: { uid: string; id: string }) => {
  if (!(await db.has(req.id))) {
    throw new TRPCError(genericAccessFailure);
  }

  const token = await db.get(req.id);

  if (token.uid !== req.uid) {
    console.error("unauthorized attempt to delete another user's token", req);
    throw new TRPCError(genericAccessFailure);
  }

  return await db.delete(req.id);
};

export const listTokens = async (req: { uid: string }) => {
  const tokens = await db.query({ f: 'uid', o: '==', v: req.uid });
  return tokens.map((token) => ({
    id: token.id,
    name: token.name,
    createdAt: formatTimestampLong(token.createdAt),
    expiresOn: formatTimestampLong(token.expires),
    expired: isExpired(token.expires),
  }));
};

export const tokens = {
  create: createToken,
  delete: deleteTokenHandler,
  list: listTokens,
};
