import { newOAuthSetting } from '@worksheets/apps/framework';
import { z } from 'zod';

export const auth = newOAuthSetting({
  required: false,
  options: {
    clientId: process.env['DROPBOX_APP_CLIENT_KEY'],
    clientSecret: process.env['DROPBOX_APP_SECRET_KEY'],
    authorizationUri:
      'https://www.dropbox.com/oauth2/authorize?token_access_type=offline&response_type=code',
    accessTokenUri: 'https://api.dropboxapi.com/oauth2/token',
    scopes: ['files.metadata.read'],
  },
  schema: z.any(),
});
