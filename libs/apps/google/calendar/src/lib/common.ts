import { newOAuthSetting } from '@worksheets/apps/framework';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { z } from 'zod';

export const newOAuth = (...scopes: string[]) =>
  newOAuthSetting({
    options: {
      clientId: process.env['GOOGLE_APP_CLIENT_KEY'],
      clientSecret: process.env['GOOGLE_APP_SECRET_KEY'],
      accessTokenUri: 'https://oauth2.googleapis.com/token',
      authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
      scopes: ['openid', ...scopes],
      query: {
        access_type: 'offline',
        include_granted_scopes: 'true',
        prompt: 'consent',
      },
    },
    required: true,
    schema: z.any(),
  });

export function newCalendarClient(accessToken: string) {
  if (!accessToken) {
    throw new Error('invalid accessToken');
  }
  const client = new OAuth2Client();
  client.setCredentials({ access_token: accessToken });
  return google.calendar({ version: 'v3', auth: client });
}
