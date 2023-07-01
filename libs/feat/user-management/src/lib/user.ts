import { auth } from '@worksheets/firebase/server';
import { flags } from './flags';
import { newApiTokenDatabase } from '@worksheets/data-access/api-tokens';
import { API_TOKEN_PREFIX } from './constants';
import { TRPCError } from '@trpc/server';
import { hasher, isApiToken, splitTokenFromHeader } from './util';
import { isExpired } from '@worksheets/util/time';
import { quotas } from './quotas';
import { limits } from '@worksheets/feat/server-management';

const db = newApiTokenDatabase();

async function getUserIdFromApiToken(apiToken: string): Promise<string> {
  const token = apiToken.split(API_TOKEN_PREFIX)[1];
  const id = hasher.unhash(token);
  const table = await db.get(id);
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
    !(await limits.throttle({
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

const getUser = async (uid: string) => {
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

export const user = {
  get: getUser,
  getFromAuthorization: getUserFromAuthrorization,
};
