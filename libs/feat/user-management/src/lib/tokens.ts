import { TypeOf } from 'zod';
import {
  apiTokenEntity,
  newApiTokenDatabase,
} from '@worksheets/data-access/api-tokens';
import { limits } from './limits';
import { TRPCError } from '@trpc/server';
import { API_TOKEN_PREFIX } from './constants';

const db = newApiTokenDatabase();

const checkMaxTokens = async (userId: string, value: number) => {
  if (await limits.exceeds(userId, 'maxApiTokens', value)) {
    throw new TRPCError({
      code: 'PRECONDITION_FAILED',
      message: "You've reached the maximum number of API tokens.",
    });
  }
};

const createTokenRequestSchema = apiTokenEntity.omit({
  id: true,
  createdAt: true,
});

const createToken = async (
  req: TypeOf<typeof createTokenRequestSchema>
): Promise<string> => {
  const values = await db.query({ f: 'id', o: '==', v: req.uid });

  await checkMaxTokens(req.uid, values.length + 1);

  const id = `${db.id()}-${db.id()}`;
  await db.insert({
    id,
    createdAt: Date.now(),
    ...req,
  });

  return `${API_TOKEN_PREFIX}:${id}`;
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

export const tokens = {
  create: createToken,
  delete: deleteTokenHandler,
};
