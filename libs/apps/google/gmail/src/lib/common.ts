import { newOAuthSetting, newSettings } from '@worksheets/apps/framework';
import { OAuth2Client } from 'google-auth-library';
import { gmail_v1, google } from 'googleapis';
import { z } from 'zod';

export function newGmailClient(accessToken: string) {
  if (!accessToken) {
    throw new Error('invalid accessToken');
  }
  const client = new OAuth2Client();
  client.setCredentials({ access_token: accessToken });
  return google.gmail({ version: 'v1', auth: client });
}

export async function getCurrentUserEmail(client: gmail_v1.Gmail) {
  const profile = await client.users.getProfile({ userId: 'me' });
  if (!profile.data.emailAddress) {
    throw new Error('could not find email on profile');
  }
  return profile.data.emailAddress;
}

export const settings = newSettings({
  tokens: newOAuthSetting({
    label: 'GMail OAuth Token',
    required: true,
    options: {
      clientId: process.env['GOOGLE_APP_CLIENT_KEY'],
      clientSecret: process.env['GOOGLE_APP_SECRET_KEY'],
      accessTokenUri: 'https://oauth2.googleapis.com/token',
      authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
      scopes: [
        'openid',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.metadata',
      ],
      query: {
        access_type: 'offline',
        include_granted_scopes: 'true',
        prompt: 'consent',
      },
    },
    schema: z.any(),
  }),
});
