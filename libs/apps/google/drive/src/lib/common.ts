import { newOAuthSetting } from '@worksheets/apps/framework';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { TypeOf, z } from 'zod';

export const fileSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  thumbnailLink: z.string().optional().nullable(),
  createdTime: z.string().optional().nullable(),
  modifiedTime: z.string().optional().nullable(),
  shared: z.boolean().optional().nullable(),
  trashed: z.boolean().optional().nullable(),
});

export type File = TypeOf<typeof fileSchema>;

export function newGoogleDriveClient(accessToken: string) {
  if (!accessToken) {
    throw new Error('invalid accessToken');
  }
  const client = new OAuth2Client();
  client.setCredentials({ access_token: accessToken });
  return google.drive({ version: 'v3', auth: client });
}
export const auth = newOAuthSetting({
  required: true,
  schema: z.any(),
  options: {
    clientId: process.env['GOOGLE_APP_CLIENT_KEY'],
    clientSecret: process.env['GOOGLE_APP_SECRET_KEY'],
    accessTokenUri: 'https://oauth2.googleapis.com/token',
    authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
    scopes: [
      'openid',
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
    ],
    query: {
      access_type: 'offline',
      include_granted_scopes: 'true',
      prompt: 'consent',
    },
  },
});
