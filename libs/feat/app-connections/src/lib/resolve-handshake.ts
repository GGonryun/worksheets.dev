import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import {
  OAuthClient,
  closeRedirect,
  errorRedirect,
} from '@worksheets/util/oauth/client';
import { isExpired } from '@worksheets/util/time';
import { deleteHandshake, getHandshake } from './handshakes';
import { newConnectionsDatabase } from '@worksheets/data-access/connections';

const connections = newConnectionsDatabase();
const applications = newApplicationsDatabase();

export const resolveHandshake = async (
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

  const { appId, fieldId, userId, expiration } = handshake;
  if (isExpired(expiration)) {
    return errorRedirect('EXPIRED_HANDSHAKE');
  }

  const field = applications.getConnectionField(appId, fieldId);
  if (!field) {
    return errorRedirect('INVALID_SETTING');
  }

  if (field.type !== 'oauth') {
    return errorRedirect('INVALID_SETTING_TYPE');
  }

  try {
    const client = new OAuthClient(field.options);
    const tokens = await client.parseUrl(url);
    const serialized = client.serialize(tokens);

    const id = connections.id();
    await connections.insert({
      id,
      appId,
      userId,
      fields: {
        [fieldId]: serialized,
      },
      status: 'active',
      error: '',
    });

    await deleteHandshake(handshakeId);
    return closeRedirect();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`more details`, error.message);
    }
    console.error(`failed to complete oauth connection`, error);
    return errorRedirect('UNKNOWN_FAILURE');
  }
};
