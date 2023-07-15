import { auth } from '@worksheets/firebase/server';
import { newApiTokenDatabase } from '@worksheets/data-access/api-tokens';
import { API_TOKEN_PREFIX } from './constants';
import { TRPCError } from '@trpc/server';
import { hasher, splitTokenFromHeader } from './util';
import { calculateCycle, isExpired } from '@worksheets/util/time';
import { quotas } from './quotas';
import { dxi } from '@worksheets/feat/session-replay';
import { limits } from './limits';
import { TypeOf } from 'zod';
import { metrics } from '@worksheets/feat/server-monitoring';
import { userAgentSchema, userOverviewSchema } from '@worksheets/schemas-user';

const tokens = newApiTokenDatabase();

async function getUserIdFromApiToken(apiToken: string): Promise<string> {
  const token = apiToken.split(API_TOKEN_PREFIX)[1];
  const id = hasher.unhash(token);
  const table = await tokens.get(id);
  if (table.hash != token)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'hash does not match original token',
    });

  if (isExpired(table.expires)) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'token has expired',
    });
  }

  return table.uid;
}

const getUser = async (
  uid: string
): Promise<TypeOf<typeof userAgentSchema>> => {
  const user = await auth().getUser(uid);

  return {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    disabled: user.disabled,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    metadata: {
      lastSignInTime: user.metadata.lastSignInTime,
      creationTime: user.metadata.creationTime,
    },
  };
};

const getUserFromFirebaseIdToken = async (authorization?: string) => {
  if (authorization) {
    const token = splitTokenFromHeader(authorization);
    try {
      if (!token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'authorization header cannot be empty',
        });
      }

      const user = await auth().verifyIdToken(token);

      return await getUser(user.uid);
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Unexpected error verifying token.',
        cause: error,
      });
    }
  }
  return undefined;
};

const getUserFromApiToken = async (authorization?: string) => {
  if (authorization) {
    const token = splitTokenFromHeader(authorization);
    try {
      if (!token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'authorization header cannot be empty',
        });
      }

      const userId = await getUserIdFromApiToken(token);

      return await getUser(userId);
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Unexpected error verifying token.',
        cause: error,
      });
    }
  }
  return undefined;
};

const acknowledge = async (
  user: TypeOf<typeof userAgentSchema>,
  additionalProperties?: object
) => {
  const dxiUser = {
    uid: user.uid,
    displayName: user.displayName ?? '',
    email: user.email ?? '',
    properties: {
      emailVerified: user.emailVerified,
      disabled: user.disabled,
      phoneNumber: user.phoneNumber ?? '',
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
      extra: additionalProperties ?? {},
      quotas: {},
    },
  };
  if (await quotas.exist(user.uid)) {
    const { id, ...userQuotas } = await quotas.get(user.uid);

    dxiUser.properties.quotas = userQuotas;
    await dxi.updateUser(user.uid, dxiUser);

    metrics.increment({ type: 'returning-users', payload: { uid: id } });
  } else {
    const userQuotas = await quotas.create(user.uid);

    dxiUser.properties.quotas = userQuotas;
    await dxi.createUser(dxiUser);

    metrics.increment({ type: 'new-users', payload: { uid: user.uid } });
  }

  // fullstory identify.
};

const overview = async (
  user: TypeOf<typeof userAgentSchema>
): Promise<TypeOf<typeof userOverviewSchema>> => {
  const userQuotas = await quotas.get(user.uid);
  const userLimits = await limits.get(user.uid);
  const numTokens = await tokens.count({
    f: 'uid',
    o: '==',
    v: user.uid,
  });

  return {
    uid: user.uid,
    quotas: userQuotas,
    meta: {
      plan: 'hobby',
      cycle: calculateCycle(),
      email: user.email,
      name: user.displayName,
    },
    limits: {
      tokens: userLimits.maxApiTokens,
    },
    counts: {
      tokens: numTokens,
    },
  };
};

const deleteUser = async (user: TypeOf<typeof userAgentSchema>) => {
  // get all of the user's resources and delete them. but most importantly, delete the user's account's and quotas and limits and active worksheets and tokens and connections and executions.
  console.info(`TODO: delete user ${user.uid}`);
};

export const user = {
  get: getUser,
  getUserFromFirebaseIdToken,
  getUserFromApiToken,
  acknowledge,
  overview,
  delete: deleteUser,
};
