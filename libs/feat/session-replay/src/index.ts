import { UpdateUserRequest, init } from '@fullstory/server-api-client';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { RequiredBy } from '@worksheets/util/types';

export const FULLSTORY_SESSION_REPLAY_DEV_ERROR =
  'FullStory is in dev mode and is not recording';

const fsClient = init({
  apiKey: SERVER_SETTINGS.ENVIRONMENT.VARIABLES.FULLSTORY.API_KEY(),
});

const updateUser = async (uid: string, body: Omit<UserProperties, 'uid'>) => {
  if (!SERVER_SETTINGS.ENVIRONMENT.IS_PRODUCTION()) {
    console.log('[FULLSTORY] not updating properties in development', uid);
    return;
  }
  const req: UpdateUserRequest = {
    uid,
    display_name: body.displayName,
    email: body.email,
    properties: body.properties,
  };
  try {
    await fsClient.users.update(uid, req);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('Failed to get user by id')
    ) {
      console.warn('[FULLSTORY] user not found. attempting to create', uid);
      await fsClient.users.create(req);
    } else {
      console.warn("[FULLSTORY] user couldn't be updated", uid, error);
    }
  }
};

type UserProperties = {
  uid?: string;
  displayName?: string;
  email?: string;
  properties?: object;
};

const createUser = async (body: RequiredBy<UserProperties, 'uid'>) => {
  if (!SERVER_SETTINGS.ENVIRONMENT.IS_PRODUCTION()) {
    console.log('[FULLSTORY] not creating user in development', body.uid);
    return;
  }

  const req: UpdateUserRequest = {
    uid: body.uid,
    display_name: body.displayName,
    email: body.email,
    properties: body.properties,
  };

  await fsClient.users.create(req);
};

export const dxi = {
  updateUser,
  createUser,
};
