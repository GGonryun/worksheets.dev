import { auth } from '@worksheets/firebase/server';
import { flags } from './flags';
import { newApiTokenDatabase } from '@worksheets/data-access/api-tokens';
import { API_TOKEN_PREFIX } from './constants';
import { TRPCError } from '@trpc/server';
import { hasher, isApiToken, splitTokenFromHeader } from './util';
import { calculateCycle, isExpired } from '@worksheets/util/time';
import { quotas } from './quotas';
import { limits as serverLimits } from '@worksheets/feat/server-management';
import { dxi } from '@worksheets/feat/session-replay';
import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';
import { newConnectionDatabase } from '@worksheets/data-access/settings';
import { limits } from './limits';
import { TypeOf, z } from 'zod';
import {
  userAgentSchema,
  userFlagsEntity,
  userQuotasEntity,
} from '@worksheets/data-access/user-agent';
import {
  findUsersQueuedExecutions,
  findUsersRunningExecutions,
  newTasksDatabase,
} from '@worksheets/data-access/tasks';
import { metrics } from '@worksheets/feat/server-monitoring';

const tasks = newTasksDatabase();
const tokens = newApiTokenDatabase();
const worksheets = newWorksheetsDatabase();
const connections = newConnectionDatabase();

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

  if (
    !(await quotas.request({ uid: table.uid, type: 'tokenUses', quantity: 1 }))
  ) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message: "You've exceeded your allocated quota of API token uses.",
    });
  }

  if (
    !(await serverLimits.throttle({
      id: id,
      meta: 'api-token',
      quantity: 5,
    }))
  ) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message: "You've exceeded your rate-limit of API token uses.",
    });
  }
  return table.uid;
}

async function getUserIdFromFirebaseToken(idToken: string): Promise<string> {
  try {
    const user = await auth().verifyIdToken(idToken);

    return user.uid;
  } catch (error) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unexpected error verifying Firebase token.',
      cause: error,
    });
  }
}

function getUserIdFromToken(unknownToken?: string): Promise<string> {
  if (!unknownToken) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'authorization header cannot be empty',
    });
  }

  if (isApiToken(unknownToken)) {
    return getUserIdFromApiToken(unknownToken);
  }

  return getUserIdFromFirebaseToken(unknownToken);
}

const getUser = async (
  uid: string
): Promise<TypeOf<typeof userAgentSchema>> => {
  const user = await auth().getUser(uid);

  if (user.emailVerified && (await flags.check(uid, 'verified'))) {
    // TODO: move the flag update to a separate function that gets invoked after a user clicks on our custom email verification link instead of doing this check everytime.
    await flags.set(uid, 'verified');
  }

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

const getUserFromAuthrorization = async (authorization?: string) => {
  if (authorization) {
    const token = splitTokenFromHeader(authorization);
    const userId = await getUserIdFromToken(token);

    return await getUser(userId);
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

export const userOverviewSchema = z.object({
  uid: z.string(),
  meta: z.object({
    plan: z.string(),
    cycle: z.string(),
    email: z.string().optional(),
    name: z.string().optional(),
  }),
  quotas: userQuotasEntity,
  flags: userFlagsEntity,
  limits: z.object({
    worksheets: z.number(),
    tokens: z.number(),
    connections: z.number(),
    executions: z.object({
      queued: z.number(),
      running: z.number(),
    }),
  }),
  counts: z.object({
    worksheets: z.number(),
    tokens: z.number(),
    connections: z.number(),
    executions: z.object({
      queued: z.number(),
      running: z.number(),
    }),
  }),
});

const overview = async (
  user: TypeOf<typeof userAgentSchema>
): Promise<TypeOf<typeof userOverviewSchema>> => {
  const userQuotas = await quotas.get(user.uid);
  const userLimits = await limits.get(user.uid);
  const userFlags = await flags.get(user.uid);

  const numWorksheets = await worksheets.count({
    f: 'uid',
    o: '==',
    v: user.uid,
  });

  const numTokens = await tokens.count({
    f: 'uid',
    o: '==',
    v: user.uid,
  });

  const numConnections = await connections.count({
    f: 'uid',
    o: '==',
    v: user.uid,
  });

  const numQueued = (await findUsersQueuedExecutions(tasks, user.uid)).length;
  const numRunning = (await findUsersRunningExecutions(tasks, user.uid)).length;

  return {
    uid: user.uid,
    quotas: userQuotas,
    flags: userFlags,
    meta: {
      plan: 'hobby',
      cycle: calculateCycle(),
      email: user.email,
      name: user.displayName,
    },
    limits: {
      worksheets: userLimits.maxWorksheets,
      tokens: userLimits.maxApiTokens,
      connections: userLimits.maxConnections,
      executions: {
        queued: userLimits.maxQueuedExecutions,
        running: userLimits.maxRunningExecutions,
      },
    },
    counts: {
      worksheets: numWorksheets,
      tokens: numTokens,
      connections: numConnections,
      executions: {
        queued: numQueued,
        running: numRunning,
      },
    },
  };
};

const deleteUser = async (user: TypeOf<typeof userAgentSchema>) => {
  // get all of the user's resources and delete them. but most importantly, delete the user's account's and quotas and limits and active worksheets and tokens and connections and executions.
  console.info(`TODO: delete user ${user.uid}`);
};

export const user = {
  get: getUser,
  getFromAuthorization: getUserFromAuthrorization,
  acknowledge,
  overview,
  delete: deleteUser,
};
