import { newOAuthSetting, newSettings } from '@worksheets/apps/framework';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { z } from 'zod';

export const settings = newSettings({
  tokens: newOAuthSetting({
    options: {
      clientId: process.env['GOOGLE_APP_CLIENT_KEY'],
      clientSecret: process.env['GOOGLE_APP_SECRET_KEY'],
      accessTokenUri: 'https://oauth2.googleapis.com/token',
      authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
      scopes: [
        'openid',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
      query: {
        access_type: 'offline',
        include_granted_scopes: 'true',
        prompt: 'consent',
      },
    },
    required: true,
    schema: z.any(),
  }),
});

export function newCalendarClient(accessToken: string) {
  if (!accessToken) {
    throw new Error('invalid accessToken');
  }
  const client = new OAuth2Client();
  client.setCredentials({ access_token: accessToken });
  return google.calendar({ version: 'v3', auth: client });
}
