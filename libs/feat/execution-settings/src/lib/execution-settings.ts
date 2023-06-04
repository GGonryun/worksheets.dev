import { ApplicationLibrary } from '@worksheets/apps/framework';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { newHandshakesDatabase } from '@worksheets/data-access/handshakes';
import {
  SettingEntity,
  newSettingsDatabase,
} from '@worksheets/data-access/settings';
import { HandlerFailure } from '@worksheets/util/next';
import { OAuthClient, OAuthToken } from '@worksheets/util/oauth/client';
import {
  closeRedirect,
  errorRedirect,
  findOAuthProperty,
  findProperty,
} from './util';
import { isExpired } from '@worksheets/util/time';

const settingsDb = newSettingsDatabase();
const applicationsDb = newApplicationsDatabase();
const handshakesDb = newHandshakesDatabase();

export const newPrivateLibrary = (userId: string) => {
  const library = new ApplicationLibrary({
    clerk: applicationsDb,
    settingsLoader: (methodPath) => getSettings(userId, methodPath),
  });
  return library;
};

export const findSettingEntityId = async (
  userId: string,
  methodPath: string,
  propertyKey: string
): Promise<string | undefined> => {
  const settings = await settingsDb.query(
    { f: 'uid', o: '==', v: userId },
    { f: 'method', o: '==', v: methodPath },
    { f: 'key', o: '==', v: propertyKey }
  );

  if (!settings || settings.length < 1) {
    return undefined;
  }

  if (settings.length > 1) {
    console.warn(
      `unexpected: found more than 1 settings with the same method, uid, and key`,
      settings.map((s) => s.id)
    );
  }

  return settings[0].id;
};

export const upsertSetting = async (
  userId: string,
  methodPath: string,
  propertyKey: string,
  data?: unknown
): Promise<{ url?: string }> => {
  const method = applicationsDb.borrow(methodPath);
  const prop = findProperty(method, propertyKey);
  const entityId = await findSettingEntityId(userId, methodPath, propertyKey);
  if (prop.type === 'flag' || prop.type === 'token') {
    await settingsDb.updateOrInsert({
      id: entityId ?? settingsDb.id(),
      uid: userId,
      type: prop.type,
      method: methodPath,
      key: propertyKey,
      data: data,
    });

    return {};
  }

  if (prop.type === 'oauth') {
    const client = new OAuthClient(prop.options);

    const handshakeId = await createHandshake(
      userId,
      entityId,
      methodPath,
      propertyKey
    );

    return { url: client.getUri(handshakeId) };
  }

  throw new HandlerFailure({
    code: 'unsupported-operation',
    message: `cannot save property type`,
    data: prop,
  });
};

export const saveSetting = async (opt: Omit<SettingEntity, 'id'>) => {
  const id = settingsDb.id();
  await settingsDb.insert({
    ...opt,
    id,
  });
};

export const getSettings = async (
  uid: string,
  methodPath: string
): Promise<Record<string, unknown>> => {
  if (!uid) {
    throw new HandlerFailure({
      code: 'unauthorized',
      message: 'cannot get settings without a user associated',
      data: {
        uid,
        methodPath,
        possibleReasons:
          'caused by an anonymous worksheet execution that tried to accesss a method that requires global account settings',
      },
    });
  }

  const settings = await settingsDb.query(
    { f: 'uid', o: '==', v: uid },
    { f: 'method', o: '==', v: methodPath }
  );

  console.info(
    `got ${settings.length} settings for method ${methodPath} for user ${uid}`
  );

  if (settings.length === 0) {
    return {};
  }

  const output: Record<string, unknown> = {};
  for (const setting of settings) {
    const data =
      setting.type !== 'oauth' ? setting.data : await getLatestTokens(setting);

    output[setting.key] = data;
  }
  return output;
};

export const saveOAuthSetting = async (
  url?: string,
  handshakeId?: string
): Promise<{ url: string }> => {
  if (!url) {
    return errorRedirect('INVALID_URL');
  }

  if (!handshakeId) {
    return errorRedirect('INVALID_HANDSHAKE_ID');
  }

  const handshake = await getHandshake(handshakeId);
  if (!handshake) {
    return errorRedirect('INVALID_HANDSHAKE');
  }

  const { methodPath, propertyKey, uid, timestamp, settingId } = handshake;
  if (isExpired(timestamp + 10 * 60 * 1000)) {
    return errorRedirect('EXPIRED_HANDSHAKE');
  }

  const method = applicationsDb.borrow(methodPath);
  const prop = findOAuthProperty(method, propertyKey);

  try {
    const client = new OAuthClient(prop.options);
    const tokens = await client.parseUrl(url);

    console.log(
      'tokens keys received after auth',
      Object.keys(JSON.parse(tokens))
    );

    const id = settingId ?? settingsDb.id();
    await settingsDb.updateOrInsert({
      id,
      uid: uid,
      type: 'oauth',
      method: methodPath,
      key: propertyKey,
      data: tokens,
    });

    await deleteHandshake(handshakeId);
    return closeRedirect();
  } catch (error) {
    console.error(`failed to complete oauth connection`, error);
    return errorRedirect('UNKNOWN_FAILURE');
  }
};

const getLatestTokens = async (setting: SettingEntity): Promise<OAuthToken> => {
  if (setting.type !== 'oauth') {
    throw new HandlerFailure({
      code: 'unsupported-operation',
      message: `invalid setting type, expected 'oauth' received '${setting.type}' `,
    });
  }

  if (!setting.data) {
    throw new HandlerFailure({
      code: 'unsupported-operation',
      message: `setting must have a token set`,
    });
  }

  const method = applicationsDb.borrow(setting.method);

  const prop = findOAuthProperty(method, setting.key);

  const client = new OAuthClient(prop.options);

  const tokens = client.convertToOAuthToken(setting.data as string);

  if (tokens.expired() && tokens.refreshToken) {
    const refreshed = await tokens.refresh();

    setting.data = client.serializeToken(refreshed);

    await settingsDb.update({ ...setting });

    return refreshed;
  }

  return tokens;
};

const createHandshake = async (
  userId: string,
  settingId: string | undefined,
  methodPath: string,
  propertyKey: string
) => {
  const handshakeId = handshakesDb.id();
  await handshakesDb.insert({
    uid: userId,
    id: handshakeId,
    settingId: settingId,
    timestamp: Date.now(),
    methodPath,
    propertyKey,
  });
  return handshakeId;
};

const getHandshake = async (id: string) => {
  if (await handshakesDb.has(id)) {
    return await handshakesDb.get(id);
  }

  throw new HandlerFailure({
    code: 'not-found',
  });
};

const deleteHandshake = async (id: string) => {
  if (await handshakesDb.has(id)) {
    await handshakesDb.delete(id);
  }
  return true;
};
