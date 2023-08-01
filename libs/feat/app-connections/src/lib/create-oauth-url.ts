import { TRPCError } from '@trpc/server';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { OAuthClient } from '@worksheets/util/oauth/client';
import { createHandshake } from './handshakes';

const db = newApplicationsDatabase();

export const createOAuthUrl = async (opts: {
  userId: string;
  appId: string;
  fieldId: string;
}) => {
  // get the app connection from the database
  const field = db.getConnectionField(opts.appId, opts.fieldId);

  // field must support oauth
  if (field.type !== 'oauth') {
    throw new TRPCError({
      code: 'METHOD_NOT_SUPPORTED',
      message: `Application ${opts.appId} does not support oauth`,
    });
  }

  let handshakeId: string;
  try {
    handshakeId = await createHandshake(opts);
  } catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Failed to create handshake for ${opts.appId}`,
      cause: error,
    });
  }

  const client = new OAuthClient(field.options);

  return {
    url: client.getUri(handshakeId),
  };
};
