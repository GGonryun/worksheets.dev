import { OAuthSetting, Settings } from '@worksheets/apps/framework';
import { OAuthClient } from '@worksheets/util/oauth/client';

export const mapSecureProperties = async (
  properties: Record<string, unknown>,
  fields: Settings,
  transformer: (
    value: unknown,
    key: string,
    setting: Settings[string]
  ) => Promise<unknown>
): Promise<Record<string, unknown>> => {
  const acc: Record<string, unknown> = {};
  for (const key of Object.keys(properties)) {
    const value = properties[key];
    const setting = fields[key];
    const decrypted = cryptographer.decrypt(value as string);
    acc[key] = await transformer(decrypted, key, setting);
  }
  return acc;
};

export const getLatestTokens = async (
  value: unknown,
  setting: OAuthSetting,
  onRefresh: (serialized: string) => Promise<void>
): Promise<unknown> => {
  if (value === undefined || value === null) return value; // don't try to refresh empty values

  const client = new OAuthClient(setting.options);

  const tokens = client.convertToOAuthToken(value as string);

  if (tokens.expired() && tokens.refreshToken) {
    console.log('[OAUTH] found expired token');
    const refreshed = await tokens.refresh();
    const serialized = client.serializeToken(refreshed);
    await onRefresh(serialized);
    console.log('[OAUTH] refreshed expired token');
    return client.convertToOAuthToken(serialized);
  }

  return tokens;
};

export const cryptographer = {
  // TODO: encrypt/decrypt tokens using a key stored in the user's profile.
  encrypt: (value: string) => value,
  decrypt: (value: string) => value,
};

// const getLatestTokens = async (setting: SettingEntity): Promise<OAuthToken> => {
//   if (setting.type !== 'oauth') {
//     throw new TRPCError({
//       code: 'unsupported-operation',
//       message: `invalid setting type, expected 'oauth' received '${setting.type}' `,
//     });
//   }

//   if (!setting.data) {
//     throw new TRPCError({
//       code: 'unsupported-operation',
//       message: `setting must have a token set`,
//     });
//   }

//   const method = applicationsDb.borrow(setting.method);

//   const prop = findOAuthProperty(method, setting.key);

//   const client = new OAuthClient(prop.options);

//   const tokens = client.convertToOAuthToken(setting.data as string);

//   if (tokens.expired() && tokens.refreshToken) {
//     const refreshed = await tokens.refresh();

//     setting.data = client.serializeToken(refreshed);

//     await settingsDb.update({ ...setting });

//     return refreshed;
//   }

//   return tokens;
// };
